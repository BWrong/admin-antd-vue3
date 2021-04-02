<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-button type="primary" ghost @click="handleAdd"> <icon-font type="icon-plus" /> 新建 </a-button>
      <search-button class="fr" v-model="searchWord" @search="handleSearch" @reset="getData(1)" placeholder="请输入角色名称" />
    </a-card>
    <a-card>
      <basis-table :columns="columns" show-index :data-source="tableData" :pagination="pagination" @change="handleTableChange" :loading="tableLoading">
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
    <a-modal v-model:visible="isShowEdit" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.form.resetFields()">
      <a-form ref="form" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="角色名称" name="title">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item has-feedback label="角色编码" name="code">
          <a-input v-model:value="form.code" />
        </a-form-item>
        <a-form-item has-feedback label="所属部门" name="selectDept">
          <a-cascader
            :options="deptList"
            :default-value="[form.deptCode]"
            :field-names="{ label: 'title', value: 'code', children: 'children' }"
            v-model:value="selectDept"
            placeholder="请选择所属部门"
          ></a-cascader>
        </a-form-item>
        <a-form-item has-feedback label="角色描述" name="describe">
          <a-input type="textarea" v-model:value="form.describe" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 授权  -->
    <auth-menu-modal v-model:show="isShowAuth" v-model:value="selectAuth"></auth-menu-modal>
  </div>
</template>

<script>
import AuthMenuModal from './components/AuthMenuModal.vue';
import roleApi from '@/api/system/role';
import departmentApi from '@/api/system/department';
import { message } from 'ant-design-vue';
const initForm = {
  title: '',
  code: '',
  deptName: '',
  deptId: 0,
  deptCode: 0,
  describe: ''
};
export default {
  inject: ['$pagination'],
  components: { AuthMenuModal },
  data() {
    const columns = [
      { title: '名称', dataIndex: 'title', ellipsis: true },
      { title: '编码', dataIndex: 'code', ellipsis: true },
      { title: '部门', dataIndex: 'deptName' },
      { title: '描述', dataIndex: 'describe', ellipsis: true },
      { title: '创建时间', dataIndex: 'createTime', width: 200 },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 300 }
    ];
    return {
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...this.$pagination,
        pageSize: 10
      },
      searchWord: '',
      deptList: [],
      selectDept: [],
      isShowEdit: false,
      isAdd: true,
      form: {},
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入角色名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入角色编码' }],
        deptId: [{ required: true, trigger: 'blur', message: '请选择所属部门' }]
      },
      isShowAuth: false,
      editRow: {},
      selectAuth: []
    };
  },
  created() {
    this.getData(1);
    this.getDeptList();
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      roleApi
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
    getDeptList() {
      departmentApi
        .list({
          pageSize: 10000,
          pageNow: 1
        })
        .then((res) => {
          this.deptList = res.list;
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
    handleAuth(row) {
      console.log(row);
      this.isShowAuth = true;
      this.editRow = { ...row };
    },
    handleSetAuth(keys) {
      console.log(keys);
      message.success('操作成功');
    },
    handleDel(row) {
      console.log(row);
      message.success('操作成功');
    },
    handleSearch(key) {
      console.log(key);
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
