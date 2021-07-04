<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space>
        <a-button type="primary" ghost @click="handleAdd"> <icon-font type="icon-plus" /> 新建 </a-button>
      </a-space>
      <search-button class="fr" v-model="searchWord" @search="handleSearch" @reset="getData(1)" placeholder="请输入部门名称" />
    </a-card>
    <a-card>
      <basis-table :columns="columns" :data-source="tableData" :pagination="pagination" @change="handleTableChange" :loading="tableLoading">
        <template #action="{ record }">
          <a-space>
            <a-button @click="handleEdit(record)" type="primary" size="small">编辑</a-button>
            <delete-button @confirm="handleDel(record)" :title="record.title" />
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <!-- 新增和编辑 -->
    <a-modal v-model:visible="isShowEdit" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => formRef.resetFields()">
      <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="部门名称" name="title">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item has-feedback label="部门编码" name="code">
          <a-input v-model:value="form.code" />
        </a-form-item>
        <a-form-item has-feedback label="描述" name="describe">
          <a-textarea :rows="3" v-model:value="form.describe"></a-textarea>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import departmentApi from '@/api/system/department';
import { inject, reactive, ref } from 'vue';
import { message } from 'ant-design-vue';
import type { IDepartment } from 'types/interface/system';
import type { IPagination } from 'types/interface/common';
const columns = [
  { title: '部门名称', dataIndex: 'title', ellipsis: true },
  { title: '部门编码', dataIndex: 'code' },
  { title: '部门描述', dataIndex: 'describe', ellipsis: true },
  { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 300 }
];
let tableData = ref<IDepartment[]>([]);
let tableLoading = ref(false);
let pagination = reactive({ ...inject<IPagination>('$pagination') });
let searchWord = ref('');
function getData(pageNow = 1) {
  tableLoading.value = true;
  departmentApi
    .list({
      pageSize: pagination.pageSize,
      pageNow,
      searchWord: searchWord.value
    })
    .then((res) => {
      pagination.current = res.current;
      pagination.total = res.total;
      tableData.value = res.list;
      tableLoading.value = false;
    });
}
getData(1);
// 编辑
const initForm: IDepartment = {
  title: '',
  code: '',
  describe: ''
};
const formRef = ref();
let isShowEdit = ref(false);
let isAdd = ref(true);
let form = reactive<IDepartment>({ ...initForm });

let rules = {
  title: [{ required: true, trigger: 'blur', message: '请输入部门名称' }],
  code: [{ required: true, trigger: 'blur', message: '请输入部门编码' }]
};
function handleAdd() {
  isAdd.value = true;
  isShowEdit.value = true;
  Object.assign(form, { ...initForm });
}
function handleEdit(row) {
  console.log(row);
  isAdd.value = false;
  isShowEdit.value = true;
  Object.assign(form, { ...row });
}
function handleDel(row) {
  console.log(row);
  message.success('操作成功');
}
function handleSearch(val) {
  console.log(val);
  getData(1);
}
function handleTableChange(paginationConfig) {
  pagination = paginationConfig;
  getData(pagination.current);
}
function handleOk() {
  formRef.value.validate().then(() => {
    message.success('操作成功');
    isShowEdit.value = false;
  });
}
</script>

<style lang="less" scoped></style>
