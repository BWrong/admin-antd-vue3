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
    <a-modal v-model:visible="isShowEdit" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.form.resetFields()">
      <a-form ref="form" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
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

<script>
import departmentApi from '@/api/system/department';
import { message } from 'ant-design-vue';
const initForm = {
  title: '',
  code: '',
  describe: ''
};
export default {
  inject: ['$pagination'],
  data() {
    const columns = [
      { title: '部门名称', dataIndex: 'title', ellipsis: true },
      { title: '部门编码', dataIndex: 'code' },
      { title: '部门描述', dataIndex: 'describe', ellipsis: true },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 300 }
    ];
    return {
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...this.$pagination
      },
      searchWord: '',
      isShowEdit: false,
      isAdd: true,
      form: {},
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入部门名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入部门编码' }]
      }
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      departmentApi
        .list({
          pageSize: this.pagination.pageSize,
          pageNow
        })
        .then((res) => {
          this.pagination.current = res.current;
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableLoading = false;
        });
    },
    handleAdd() {
      this.isAdd = true;
      this.isShowEdit = true;
      this.form = { ...initForm };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.isShowEdit = true;
      this.form = { ...row };
    },
    handleDel(row) {
      console.log(row);
      message.success('操作成功');
    },
    handleSearch(val) {
      console.log(val);
      this.getData(1);
    },
    handleTableChange(pagination) {
      this.pagination = pagination;
      this.getData(pagination.current);
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        message.success('操作成功');
        this.isShowEdit = false;
      });
    }
  }
};
</script>

<style lang="less" scoped></style>
