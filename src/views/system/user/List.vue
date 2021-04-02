<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-button type="primary" ghost @click="handleAdd"> <icon-font type="icon-plus" /> 新建 </a-button>
      <span class="fr">
        <search-button class="fr" v-model="searchWord" @search="handleSearch" @reset="handleReset" placeholder="请输入用户名">
          <template #suffix>
            <a-input v-model:value="searchEmail" placeholder="电子邮箱" allowClear />
          </template>
        </search-button>
      </span>
    </a-card>
    <a-card>
      <basis-table :columns="columns" show-index :data-source="tableData" :pagination="pagination" @change="handleTableChange" :loading="tableLoading">
        <template #action="{ record }">
          <a-space>
            <a-button @click="handleEdit(record)" type="primary" size="small">编辑</a-button>
            <delete-button @confirm="handleDel(record)" :title="record.title" />
            <a-dropdown placement="bottomRight">
              <a-button size="small" @click.prevent>
                更多
                <icon-font type="icon-down" />
              </a-button>
              <template #overlay>
                <a-menu>
                  <a-menu-item v-for="item in moreAction" :key="item.text" @click="item.click(record)"> <component :is="item.icon"></component>{{ item.text }} </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <!-- 新增编辑 -->
    <a-modal
      v-model:visible="isShowEdit"
      :title="isAdd ? '新建' : '编辑'"
      :width="720"
      :keyboard="false"
      :maskClosable="false"
      @ok="handleOk"
      :afterClose="() => $refs.form.resetFields()"
    >
      <a-form ref="form" :model="form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item has-feedback label="用户名" name="username">
              <a-input v-model:value="form.username" :disabled="!isAdd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="姓名" name="name">
              <a-input v-model:value="form.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="昵称" name="nickname">
              <a-input v-model:value="form.nickname"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item has-feedback label="身份证号码" name="idCard">
              <a-input v-model:value="form.idCard"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="联系电话" name="tel"> <a-input v-model:value="form.tel"></a-input> </a-form-item
          ></a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="电子邮箱" name="email"> <a-input v-model:value="form.email"></a-input> </a-form-item
          ></a-col>
          <a-col :span="24">
            <a-form-item has-feedback :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" label="所属部门" name="deptId">
              <a-cascader
                :options="deptList"
                :defaultValue="[form.deptCode]"
                :fieldNames="{ label: 'title', value: 'code', children: 'children' }"
                v-model:value="selectDept"
                placeholder="请选择所属部门"
              ></a-cascader>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item has-feedback :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" label="描述" name="describe">
              <a-textarea :rows="3" v-model:value="form.describe" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 设置角色 -->
    <a-modal v-model:visible="showRoleModal" title="设置角色" @ok="showRoleModal = false" :keyboard="false" :maskClosable="false">
      <a-select v-model:value="selectRole" mode="multiple" placeholder="请选择角色" @change="handleRoleChange" style="width: 100%">
        <a-select-option v-for="item in roleList" :key="item.id" :value="item.id">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script>
import { createVNode } from 'vue';
import { USER_STATUS } from '@/enums/user';
import userApi from '@/api/system/user';
import departmentApi from '@/api/system/department';
import roleApi from '@/api/system/role';
import { message } from 'ant-design-vue';
const initForm = {
  username: '',
  name: '',
  nickname: '',
  email: '',
  idCard: '',
  deptId: '',
  tel: '',
  describe: ''
};
export default {
  inject: ['$pagination'],
  data() {
    const columns = [
      { title: '用户名', dataIndex: 'username', ellipsis: true },
      { title: '姓名', dataIndex: 'name' },
      { title: '昵称', dataIndex: 'nickname' },
      { title: '电子邮箱', dataIndex: 'email', ellipsis: true },
      {
        title: '状态',
        dataIndex: 'status',
        width: 100,
        customRender: ({ record }) => {
          if (record.delFlag == '1') {
            return <a-badge status="error" text="已删除" />;
          } else {
            return <a-badge status={record.status == '0' ? 'processing' : 'warning'} text={USER_STATUS[record.status]} />;
          }
        },
        filters: Object.keys(USER_STATUS).map((value) => ({ text: USER_STATUS[value], value })),
        align: 'center'
      },
      { title: '创建时间', dataIndex: 'createTime', width: 200, align: 'center' },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 200 }
    ];
    return {
      searchWord: '',
      searchEmail: '',
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...this.$pagination
      },
      moreAction: [
        {
          text: '锁定账号',
          icon: <icon-font type="icon-lock" />,
          click: this.handleLock
        },
        {
          text: '解锁账号',
          icon: <icon-font type="icon-unlock" />,
          click: this.handleLock
        },
        {
          text: '重置密码',
          icon: <icon-font type="icon-reload1" />,
          click: this.handleResetPwd
        },
        {
          text: '设置角色',
          icon: <icon-font type="icon-user" />,
          click: this.handleSetRole
        }
      ],
      userStatus: USER_STATUS,
      deptList: [],
      selectDept: [],
      isShowEdit: false,
      isAdd: true,
      form: {},
      rules: {
        username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
        name: [{ required: true, trigger: 'blur', message: '请输入姓名' }]
      },
      showRoleModal: false,
      roleList: [],
      selectRole: []
    };
  },
  created() {
    this.getData(1);
    this.getDeptList();
    this.getRoleList();
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      userApi
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
          console.log(res);
          this.deptList = res.list;
        });
    },
    getRoleList() {
      roleApi
        .list({
          pageSize: 10000,
          pageNow: 1
        })
        .then((res) => {
          console.log(res);
          this.roleList = res.list;
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
    handleLock(row) {
      console.log(row);
      this.$modal.confirm({
        title: '提示',
        content: createVNode(<span>您确定要锁定【{<span class="text-primary">{row.username}</span>}】用户吗？</span>),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          message.success('操作成功');
        }
      });
    },
    handleResetPwd(row) {
      this.$modal.confirm({
        title: '提示',
        content: createVNode(<span>您确定要重置【{<span class="text-primary">{row.username}</span>}】用户的密码吗？</span>),
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          message.success('操作成功');
        }
      });
    },
    handleSetRole(row) {
      console.log(row);
      this.showRoleModal = true;
      // message.success('操作成功');
    },
    handleDel(row) {
      console.log(row);
      message.success('操作成功');
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
      this.getData(pagination.current);
    },
    handleSearch(val) {
      console.log(val);
      this.getData(1);
    },
    handleReset() {
      this.searchEmail = '';
      this.getData(1);
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        message.success('操作成功');
        this.isShowEdit = false;
      });
    },
    handleRoleChange() {}
  }
};
</script>
