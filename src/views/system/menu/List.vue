<template>
  <div class="page-wrap">
    <a-card>
      <template #title>
        <ASpace>
          <AButton type="primary" ghost @click="handleAdd">
            <icon-font type="icon-plus" />
            新建
          </AButton>

          <AButton type="primary" ghost @click="$router.push('/system/menu/edit')"> 嵌套路由测试 </AButton>
        </ASpace>
      </template>
      <basis-table :columns="columns" :data-source="state.tableData" :loading="state.tableLoading">
        <template #bodyCell="{ column, record }">
          <a-tag v-if="column.dataIndex === 'type'" :color="record.type === 0 ? '' : 'orange'">
            {{ record.type === 0 ? '菜单' : '按钮' }}
          </a-tag>
          <a-space v-else-if="column.dataIndex === 'action'">
            <a-button type="primary" size="small" @click="handleEdit(record)"> 编辑 </a-button>
            <a-button size="small" @click="handleAddChild(record)"> 添加子项 </a-button>
            <a-button v-if="!record.hide" ghost danger size="small" @click="handleHide(record, true)"> 隐藏 </a-button>
            <a-button v-else size="small" @click="handleHide(record, false)"> 显示 </a-button>
            <delete-button :title="record.name" @confirm="handleDel(record)" />
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <!-- 新增编辑 -->
    <a-modal
      v-model:open="isShowEdit"
      :title="isAdd ? '新建' : '编辑'"
      :keyboard="false"
      :mask-closable="false"
      :after-close="handleClose"
      @ok="handleOk"
    >
      <a-form ref="formRef" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="类型" name="type">
          <a-radio-group v-model:value="form.type">
            <a-radio v-for="(item, key) in RESOURCE_TYPE" :key="key" :value="Number(key)">
              {{ item }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item has-feedback label="父级目录" name="parentId">
          <a-input v-model:value="form.parentId" />
        </a-form-item>
        <a-form-item has-feedback :label="`${RESOURCE_TYPE[String(form.type)]}名称`" name="title">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item has-feedback label="权限标识" name="permission">
          <a-input v-model:value="form.permission" />
        </a-form-item>
        <template v-if="form.type === 0">
          <a-form-item has-feedback label="图标" name="icon">
            <a-input v-model:value="form.icon" readonly>
              <template #addonAfter>
                <a-popover title="选择图标">
                  <template #content>
                    <div class="icon-picker-wrap">
                      <IconPicker v-model:value="form.icon" width="100%" height="360px" />
                    </div>
                  </template>
                  <icon-font v-if="form.icon" :type="form.icon" />
                  <span v-else>选择</span>
                </a-popover>
              </template>
            </a-input>
          </a-form-item>
          <a-form-item has-feedback label="序号" name="priority">
            <a-input-number v-model:value="form.priority" class="width-full" />
          </a-form-item>
        </template>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="tsx" setup>
import { message, type FormProps } from 'ant-design-vue';
import { reactive, ref } from 'vue';

import type { ColumnProps } from 'ant-design-vue/es/table';

import IconPicker from '@/components/IconPicker/index.vue';
import { RESOURCE_TYPE } from '@/enums/menu';
import type { IMenu } from '@/api/auth';
import { getPermissionsTree } from '@bwrong/auth-tool';
// 列表
const columns: ColumnProps[] = [
  {
    title: '菜单名字',
    dataIndex: 'title',
    ellipsis: true
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    ellipsis: true
  },
  {
    title: '图标',
    dataIndex: 'icon',
    align: 'center',
    width: '200px',
    customRender: ({ text }) => (text ? <icon-font type={text} /> : '')
  },
  {
    title: '类型',
    dataIndex: 'type',
    align: 'center',
    width: '200px'
  },
  {
    title: '操作',
    dataIndex: 'action',
    align: 'center',
    width: 360
  }
];
const state = reactive({
  tableData: [] as IMenu[],
  tableLoading: false
});
function getData() {
  state.tableData = getPermissionsTree({ pid: 0 });
}
getData();
function handleDel(row) {
  console.log(row);
  message.success('操作成功');
}
function handleHide(row: IMenu, status) {
  console.log(row, status);
  row.hide = status;
  message.success('操作成功');
}
// 新增编辑
const formRef = ref();
const rules: FormProps['rules'] = {
  title: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入菜单名称'
    }
  ],
  permission: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入菜单权限标识'
    }
  ]
};
const initForm = {
  name: '',
  parentId: 0,
  permission: '',
  icon: '',
  title: '',
  type: 0,
  priority: 0
};
const isShowEdit = ref(false);
const isAdd = ref(true);
const form = reactive<IMenu>({} as IMenu);

function handleAdd() {
  isAdd.value = true;
  isShowEdit.value = true;
  Object.assign(form, { ...initForm });
}
function handleAddChild(row: IMenu) {
  isAdd.value = true;
  isShowEdit.value = true;
  Object.assign(form, {
    ...initForm,
    parentId: row.id
  });
}
function handleEdit(row: IMenu) {
  console.log(row);
  isAdd.value = false;
  isShowEdit.value = true;
  Object.assign(form, { ...row });
}
function handleClose() {
  formRef.value.resetFields();
}
function handleOk() {
  formRef.value?.validate().then(() => {
    message.success('操作成功');
    isShowEdit.value = false;
  });
}
</script>

<style scoped>
.icon-picker-wrap {
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
</style>
