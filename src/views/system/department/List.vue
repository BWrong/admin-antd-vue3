<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <!-- <a-input v-model:value="searchValue" placeholder="请输入部门名称..." allowClear class="vertical-top" style="width: 200px" />
      <a-button class="space" icon="search">搜索</a-button>
      <a-button class="space" icon="reload">重置</a-button> -->
      <a-button type="primary" icon="plus" ghost @click="handleAdd">新建 </a-button>
      <a-button class="space" type="primary" icon="medicine-box" ghost>数据修复 </a-button>
      <a-input-search class="space fr" placeholder="请输入部门名称" style="width: 300px" enter-button="搜索" allow-clear @search="handleSearch"></a-input-search>
    </a-card>
    <a-card>
      <a-table :columns="columns" :data-source="tableData" size="small" rowKey="id" :expandIconColumnIndex="1" :pagination="pagination" @change="handlePageChange">
        <template #index="text, row, index">
          <span>{{ index + 1 }}</span>
        </template>
        <template #action="row">
          <div>
            <a-button @click="handleEdit(row)" type="link" size="small">编辑</a-button>
            <a-divider type="vertical" class="divider-primary" />
            <a-button @click="handleDel(row)" type="link" size="small">删除</a-button>
          </div>
        </template>
      </a-table>
    </a-card>
    <!-- 新增和编辑 -->
    <a-modal
      v-model:visible="showEditModal"
      :title="isAdd ? '新建' : '编辑'"
      :keyboard="false"
      :maskClosable="false"
      @ok="handleOk"
      :afterClose="() => $refs.ruleForm.resetFields()"
    >
      <a-form ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="部门名称" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item has-feedback label="部门编码" name="code">
          <a-input v-model:value="form.code" />
        </a-form-item>
        <a-form-item has-feedback label="部门主管" name="createUser">
          <a-select v-model:value="form.createUser">
            <a-select-option :value="item.id" v-for="item in userList" :key="item.id">{{ item.username }} </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item has-feedback label="描述" name="deptDesc">
          <a-input type="textarea" v-model:value="form.deptDesc"></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { pagination } from '@/config';
import { ganerTableIndex } from '@/utils';

const initForm = {
  name: '',
  code: '',
  createUser: '',
  deptDesc: ''
};
export default {
  data() {
    const columns = [
      { title: '序号', customRender: (value, row, index) => `${ganerTableIndex(this.pagination.current, this.pagination.pageSize, index)}`, width: 50 },
      { title: '部门名称', dataIndex: 'name', ellipsis: true },
      { title: '部门编码', dataIndex: 'code' },
      { title: '部门主管', dataIndex: 'createUser' },
      { title: '部门描述', dataIndex: 'deptDesc', ellipsis: true },
      { title: '操作', scopedSlots: { customRender: 'action' }, align: 'center', width: 300 }
    ];
    return {
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...pagination,
        pageSize: 20
      },
      searchValue: '',
      deptList: [],
      selectDept: [],
      showEditModal: false,
      isAdd: true,
      form: {},
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入部门名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入部门编码' }]
      },
      showAuthModal: false,
      selectAuth: [],
      userList: []
    };
  },
  created() {
    this.getData(1);
    this.getUserList();
  },
  methods: {
    getData(pageNow) {
      this.tableLoading = true;
      import('./mockData.json').then((res) => {
        // this.pagination.current = res.current;
        // this.pagination.pageSize = res.size;
        // this.pagination.total = res.total;
        this.tableData = res.default;
        this.tableLoading = false;
      });
    },
    getUserList() {
      import('../user/mockData.json').then((res) => {
        this.userList = res.default.records;
      });
    },
    handleAdd() {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.showEditModal = true;
      this.form = { ...row };
    },
    handleAuth(row) {
      console.log(row);
      this.showAuthModal = true;
    },
    handleDel(row) {
      this.$modal.confirm({
        title: '提示',
        content: () => <span>您确定要删除【{<span class="text-primary">{row.name}</span>}】吗？</span>,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          this.$message.success('操作成功');
        }
      });
    },
    handleSearch(key) {
      console.log(key);
    },
    handlePageChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    },
    handleOk() {}
  }
};
</script>

<style lang="less" scoped></style>
