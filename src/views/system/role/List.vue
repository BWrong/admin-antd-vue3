<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-button type="primary" ghost @click="handleAdd"> <icon-font type="icon-plus" /> 新建 </a-button>
      <search-button class="fr" v-model="state.searchWord" @search="handleSearch" @reset="getData(1)" placeholder="请输入角色名称" />
    </a-card>
    <a-card>
      <basis-table :columns="columns" show-index :data-source="state.tableData" :pagination="pagination" @change="handleTableChange" :loading="state.tableLoading">
        <template #action="{ record }">
          <a-space>
            <a-button @click="handleEdit(record)" type="primary" size="small">编辑</a-button>
            <a-button @click="handleAuth(record)" size="small">授权</a-button>
            <delete-button @confirm="handleDel(record)" :title="record.title" />
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <!-- 新增和编辑 -->
    <a-modal
      v-model:visible="editState.isShowEdit"
      :title="editState.isAdd ? '新建' : '编辑'"
      :keyboard="false"
      :maskClosable="false"
      @ok="handleOk"
      :afterClose="() => formRef.resetFields()"
    >
      <a-form ref="formRef" :model="editState.form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="角色名称" name="title">
          <a-input v-model:value="editState.form.title" />
        </a-form-item>
        <a-form-item has-feedback label="角色编码" name="code">
          <a-input v-model:value="editState.form.code" />
        </a-form-item>
        <a-form-item has-feedback label="所属部门" name="selectDept">
          <a-cascader
            :options="editState.deptList"
            :default-value="[editState.form.deptCode]"
            :field-names="{ label: 'title', value: 'code', children: 'children' }"
            v-model:value="editState.selectDept"
            placeholder="请选择所属部门"
          ></a-cascader>
        </a-form-item>
        <a-form-item has-feedback label="角色描述" name="describe">
          <a-input type="textarea" v-model:value="editState.form.describe" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 授权  -->
    <auth-menu-modal v-model:show="editState.isShowAuth" v-model:value="editState.selectAuth"></auth-menu-modal>
  </div>
</template>

<script lang="ts" setup>
import AuthMenuModal from './components/AuthMenuModal.vue';
import roleApi from '@/api/system/role';
import departmentApi from '@/api/system/department';
import { message } from 'ant-design-vue';
import type { IPagination } from 'types/interface/common';
import { inject, reactive, ref } from 'vue';
import type { IDepartment, IRole } from 'types/interface/system';

let pagination = reactive({ ...inject<IPagination>('$pagination'), pageSize: 10 });
const columns = [
  { title: '名称', dataIndex: 'title', ellipsis: true },
  { title: '编码', dataIndex: 'code', ellipsis: true },
  { title: '部门', dataIndex: 'deptName' },
  { title: '描述', dataIndex: 'describe', ellipsis: true },
  { title: '创建时间', dataIndex: 'createTime', width: 200 },
  { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 300 }
];
const state = reactive({
  tableData: [] as IRole[],
  tableLoading: false,
  searchWord: ''
});
function getData(pageNow = 1) {
  state.tableLoading = true;
  roleApi
    .list({
      pageSize: pagination.pageSize,
      pageNow
    })
    .then((res) => {
      pagination.current = res.current;
      pagination.total = res.total;
      state.tableData = res.list;
      state.tableLoading = false;
    });
}

getData(1);
// 新增编辑
const initForm: IRole = {
  title: '',
  code: '',
  deptName: '',
  deptId: 0,
  deptCode: 0,
  describe: ''
};

const rules = {
  title: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
  code: [{ required: true, trigger: 'blur', message: '请输入角色编码' }],
  deptId: [{ required: true, trigger: 'blur', message: '请选择所属部门' }]
};
const formRef = ref();
const editState = reactive({
  isShowEdit: false,
  isAdd: true,
  form: {} as IRole,
  isShowAuth: false,
  editRow: {},
  selectAuth: [],
  deptList: [] as IDepartment[],
  selectDept: []
});
function getDeptList() {
  departmentApi
    .list({
      pageSize: 10000,
      pageNow: 1
    })
    .then((res) => {
      editState.deptList = res.list;
    });
}
getDeptList();
function handleAdd() {
  editState.isAdd = true;
  editState.isShowEdit = true;
  editState.form = { ...initForm };
}
function handleEdit(row) {
  console.log(row);
  editState.isAdd = false;
  editState.isShowEdit = true;
  editState.form = { ...row };
}
function handleAuth(row) {
  console.log(row);
  editState.isShowAuth = true;
  editState.editRow = { ...row };
}
function handleSetAuth(keys) {
  console.log(keys);
  message.success('操作成功');
}
function handleDel(row) {
  console.log(row);
  message.success('操作成功');
}
function handleSearch(key) {
  console.log(key);
  getData(1);
}
function handleTableChange(page) {
  pagination = page;
  getData(pagination.current);
}
function handleOk() {
  formRef.value?.validate().then(() => {
    message.success('操作成功');
    editState.isShowEdit = false;
  });
}
</script>

<style lang="less" scoped></style>
