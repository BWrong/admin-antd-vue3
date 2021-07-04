<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-button type="primary" ghost @click="handleAdd"> <icon-font type="icon-plus" /> 新建 </a-button>
      <span class="fr">
        <search-button class="fr" v-model="state.searchWord" @search="handleSearch" @reset="handleReset" placeholder="请输入用户名">
          <template #suffix>
            <a-input v-model:value="state.searchEmail" placeholder="电子邮箱" allowClear />
          </template>
        </search-button>
      </span>
    </a-card>
    <a-card>
      <basis-table :columns="columns" show-index :data-source="state.tableData" :pagination="pagination" @change="handleTableChange" :loading="state.tableLoading">
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
      v-model:visible="editState.isShowEdit"
      :title="editState.isAdd ? '新建' : '编辑'"
      :width="720"
      :keyboard="false"
      :maskClosable="false"
      @ok="handleOk"
      :afterClose="() => formRef.resetFields()"
    >
      <a-form ref="formRef" :model="editState.form" :rules="rules" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }">
        <a-row :gutter="20">
          <a-col :span="12">
            <a-form-item has-feedback label="用户名" name="username">
              <a-input v-model:value="editState.form.username" :disabled="!editState.isAdd"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="姓名" name="name">
              <a-input v-model:value="editState.form.name"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="昵称" name="nickname">
              <a-input v-model:value="editState.form.nickname"></a-input>
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item has-feedback label="身份证号码" name="idCard">
              <a-input v-model:value="editState.form.idCard"></a-input>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="联系电话" name="tel"> <a-input v-model:value="editState.form.tel"></a-input> </a-form-item
          ></a-col>
          <a-col :span="12">
            <a-form-item has-feedback label="电子邮箱" name="email"> <a-input v-model:value="editState.form.email"></a-input> </a-form-item
          ></a-col>
          <a-col :span="24">
            <a-form-item has-feedback :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" label="所属部门" name="deptId">
              <a-cascader
                :options="editState.deptList"
                :defaultValue="[editState.form.deptCode]"
                :fieldNames="{ label: 'title', value: 'code', children: 'children' }"
                v-model:value="editState.selectDept"
                placeholder="请选择所属部门"
              ></a-cascader>
            </a-form-item>
          </a-col>
          <a-col :span="24">
            <a-form-item has-feedback :label-col="{ span: 3 }" :wrapper-col="{ span: 21 }" label="描述" name="describe">
              <a-textarea :rows="3" v-model:value="editState.form.describe" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>
    <!-- 设置角色 -->
    <a-modal v-model:visible="editState.showRoleModal" title="设置角色" @ok="editState.showRoleModal = false" :keyboard="false" :maskClosable="false">
      <a-select v-model:value="editState.selectRole" mode="multiple" placeholder="请选择角色" @change="handleRoleChange" style="width: 100%">
        <a-select-option v-for="item in editState.roleList" :key="item.id" :value="item.id">
          {{ item.title }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script lang="tsx" setup>
import { createVNode, inject, reactive, ref } from 'vue';
import { USER_STATUS } from '@/enums/user';
import userApi from '@/api/system/user';
import departmentApi from '@/api/system/department';
import roleApi from '@/api/system/role';
import { message, Modal } from 'ant-design-vue';
import type { IDepartment, IRole, IUser } from 'types/interface/system';
import type { IPagination } from 'types/interface/common';

let pagination = reactive({ ...inject<IPagination>('$pagination'), pageSize: 10 });
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
const moreAction = [
  {
    text: '锁定账号',
    icon: <icon-font type="icon-lock" />,
    click: handleLock
  },
  {
    text: '解锁账号',
    icon: <icon-font type="icon-unlock" />,
    click: handleLock
  },
  {
    text: '重置密码',
    icon: <icon-font type="icon-reload1" />,
    click: handleResetPwd
  },
  {
    text: '设置角色',
    icon: <icon-font type="icon-user" />,
    click: handleSetRole
  }
];
const state = reactive({
  searchWord: '',
  searchEmail: '',
  tableData: [] as IUser[],
  tableLoading: false
});
function getData(pageNow = 1) {
  state.tableLoading = true;
  userApi
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
function handleDel(row) {
  console.log(row);
  message.success('操作成功');
}
function handleTableChange(page, filters, sorter) {
  pagination = page;
  console.log(pagination, filters, sorter);
  getData(pagination.current);
}
function handleSearch(val) {
  console.log(val);
  getData(1);
}
function handleReset() {
  state.searchEmail = '';
  getData(1);
}

function handleLock(row) {
  console.log(row);
  Modal.confirm({
    title: '提示',
    content: createVNode(<span>您确定要锁定【{<span class="text-primary">{row.username}</span>}】用户吗？</span>),
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      message.success('操作成功');
    }
  });
}
function handleResetPwd(row) {
  Modal.confirm({
    title: '提示',
    content: createVNode(<span>您确定要重置【{<span class="text-primary">{row.username}</span>}】用户的密码吗？</span>),
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      message.success('操作成功');
    }
  });
}

const initForm: IUser = {
  username: '',
  name: '',
  nickname: '',
  email: '',
  idCard: '',
  deptId: '',
  tel: '',
  describe: ''
};
const formRef = ref();
const rules = {
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  name: [{ required: true, trigger: 'blur', message: '请输入姓名' }]
};
const editState = reactive({
  deptList: [] as IDepartment[],
  selectDept: [],
  isShowEdit: false,
  isAdd: true,
  form: {} as IUser,
  showRoleModal: false,
  roleList: [] as IRole[],
  selectRole: []
});

getDeptList();
getRoleList();
function getDeptList() {
  departmentApi
    .list({
      pageSize: 10000,
      pageNow: 1
    })
    .then((res) => {
      console.log(res);
      editState.deptList = res.list;
    });
}
function getRoleList() {
  roleApi
    .list({
      pageSize: 10000,
      pageNow: 1
    })
    .then((res) => {
      console.log(res);
      editState.roleList = res.list;
    });
}
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
function handleOk() {
  formRef.value?.validate().then(() => {
    message.success('操作成功');
    editState.isShowEdit = false;
  });
}
// 授权
function handleSetRole(row) {
  console.log(row);
  editState.showRoleModal = true;
  // message.success('操作成功');
}
function handleRoleChange() {}
</script>
