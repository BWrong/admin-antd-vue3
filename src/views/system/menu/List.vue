<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-button type="primary" ghost @click="handleAdd"> <icon-font type="icon-plus" /> 新建 </a-button>
    </a-card>
    <a-card>
      <basis-table :columns="columns" :data-source="tableData" :pagination="pagination" @change="handleTableChange" :loading="tableLoading">
        <template #type="{ text: type }">
          <a-tag :color="type === 0 ? '' : 'orange'">{{ type === 0 ? '菜单' : '按钮' }}</a-tag>
        </template>
        <template #icon="{ text: icon }">
          {{ icon }}
        </template>
        <template #action="{ record }">
          <a-space>
            <a-button @click="handleEdit(record)" type="primary" size="small">编辑</a-button>
            <a-button @click="handleAddChild(record)" size="small">添加子项</a-button>
            <a-button @click="handleHide(record, true)" type="danger" ghost v-if="!record.hide" size="small">隐藏</a-button>
            <a-button @click="handleHide(record, false)" v-else size="small">显示</a-button>
            <delete-button @confirm="handleDel(record)" :title="record.name" />
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <!-- 新增编辑 -->
    <a-modal v-model:visible="isShowEdit" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.form.resetFields()">
      <a-form ref="form" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="类型" name="type">
          <a-radio-group v-model:value="form.type">
            <a-radio :value="Number(key)" v-for="(item, key) in menuType" :key="key">
              {{ item }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item has-feedback label="父级目录" name="parentId">
          <a-input v-model:value="form.parentId" />
        </a-form-item>
        <a-form-item has-feedback :label="`${menuType[form.type]}名称`" name="title">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item has-feedback label="权限标识" name="code">
          <a-input v-model:value="form.code" />
        </a-form-item>
        <template v-if="form.type === 0">
          <a-form-item has-feedback label="图标" name="icon">
            <a-input v-model:value="form.icon" readonly>
              <template #addonAfter>
                <a-popover placement="right" :autoAdjustOverflow="false" title="选择图标">
                  <template #content>
                    <div class="icon-picker-wrap">
                      <icon-picker v-model:value="form.icon" />
                    </div>
                  </template>
                  <icon-font :type="form.icon" v-if="form.icon" />
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

<script>
import { getStorage } from '@/utils/storage';
import { convertToTree } from '@/utils';
import { RESOURCE_TYPE } from '@/enums/system';
import IconPicker from '@/components/IconPicker';
import { message } from 'ant-design-vue';
const initForm = {
  name: '',
  parentId: 0,
  permission: '',
  icon: '',
  type: 0,
  priority: 0
};
export default {
  inject: ['$pagination'],
  data() {
    const columns = [
      { title: '菜单名字', dataIndex: 'title', ellipsis: true },
      { title: '权限标识', dataIndex: 'permission', ellipsis: true },
      { title: '图标', dataIndex: 'icon', align: 'center', width: '200px', customRender: ({ text }) => (text ? <icon-font type={text} /> : '') },
      { title: '类型', dataIndex: 'type', align: 'center', width: '200px', slots: { customRender: 'type' } },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 360 }
    ];
    const menu = getStorage('menus');
    const menuTree = convertToTree({ data: menu, pid: 0 });
    return {
      tableData: menuTree,
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...this.$pagination
      },
      isShowEdit: false,
      isAdd: true,
      menuType: RESOURCE_TYPE,
      form: {},
      rules: {
        title: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }],
        permission: [{ required: true, trigger: 'blur', message: '请输入菜单权限标识' }]
      }
    };
  },
  components: {
    IconPicker
  },
  methods: {
    handleAdd() {
      this.isAdd = true;
      this.isShowEdit = true;
      this.form = { ...initForm };
    },
    handleAddChild(row) {
      this.isAdd = true;
      this.isShowEdit = true;
      this.form = { ...initForm, parentId: row.id };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.isShowEdit = true;
      this.form = { ...row };
    },
    handleHide(row, status) {
      console.log(row, status);
      row.hide = status;
      message.success('操作成功');
    },
    handleDel(row) {
      console.log(row);
      message.success('操作成功');
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

<style lang="less" scoped>
.icon-picker-wrap {
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
</style>
