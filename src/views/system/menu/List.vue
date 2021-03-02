<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space>
        <a-button type="primary" icon="plus" ghost @click="handleAdd">新建 </a-button>
      </a-space>
    </a-card>
    <a-card>
      <a-table :columns="columns" :data-source="tableData" size="small" rowKey="id" :pagination="pagination" @change="handlePageChange">
        <template #type="type">
          <a-tag :color="type === '0' ? '' : 'orange'">{{ type === '0' ? '菜单' : '按钮' }}</a-tag>
        </template>
        <template #icon="icon">
          <a-icon :type="icon" />
        </template>
        <template #action="row">
          <div>
            <a-button @click="handleEdit(row)" type="link" size="small">编辑</a-button>
            <a-divider type="vertical" class="divider-primary" />
            <a-button @click="handleAddChild(row)" type="link" size="small">添加子项</a-button>
            <a-divider type="vertical" class="divider-primary" />
            <a-button @click="handleHide(row, true)" type="link" v-if="!row.hide" size="small">隐藏</a-button>
            <a-button @click="handleHide(row, false)" type="link" v-else size="small">显示</a-button>
            <a-divider type="vertical" class="divider-primary" />
            <a-button @click="handleDel(row)" type="link" size="small">删除</a-button>
          </div>
        </template>
      </a-table>
    </a-card>
    <!-- 新增编辑 -->
    <a-modal
      v-model:visible="showEditModal"
      :title="isAdd ? '新建' : '编辑'"
      :keyboard="false"
      :maskClosable="false"
      @ok="handleOk"
      :afterClose="() => $refs.ruleForm.resetFields()"
    >
      <a-form ref="ruleForm" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
        <a-form-item has-feedback label="类型" name="type">
          <a-radio-group v-model:value="form.type">
            <a-radio :value="key" v-for="(item, key) in menuType" :key="key">
              {{ item }}
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item has-feedback label="父级目录" name="parentId">
          <a-input v-model:value="form.parentId" />
        </a-form-item>
        <a-form-item has-feedback :label="`${menuType[form.type]}名称`" name="name">
          <a-input v-model:value="form.name" />
        </a-form-item>
        <a-form-item has-feedback label="权限标识" name="code">
          <a-input v-model:value="form.code" />
        </a-form-item>
        <template v-if="form.type === '0'">
          <a-form-item has-feedback label="图标" name="icon">
            <a-input v-model:value="form.icon" readonly>
              <template #addonAfter>
                <a-popover placement="right" :autoAdjustOverflow="false" title="选择图标">
                  <template #content>
                    <div class="menu-icon">
                      <icon-picker v-model:value="form.icon" />
                    </div>
                    <a-icon :type="form.icon" v-if="form.icon" />
                    <span v-else>选择</span>
                  </template>
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
import { RESOURCE_TYPE } from '@/config/dictionary';
import IconPicker from '@/components/IconPicker';
import { pagination } from '@/config';
const initForm = {
  name: '',
  parentId: 0,
  code: '',
  icon: '',
  type: '0',
  priority: 0
};
export default {
  data() {
    const columns = [
      { title: '菜单名字', dataIndex: 'name', ellipsis: true },
      { title: '权限标识', dataIndex: 'code', ellipsis: true },
      { title: '图标', dataIndex: 'icon', scopedSlots: { customRender: 'icon' } },
      { title: '类型', dataIndex: 'type', scopedSlots: { customRender: 'type' } },
      { title: '操作', scopedSlots: { customRender: 'action' }, align: 'center', width: 360 }
    ];
    const menu = getStorage('menus');
    const menuTree = convertToTree({ data: menu, pid: 0 });
    return {
      tableData: menuTree,
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...pagination,
        pageSize: 20
      },
      showEditModal: false,
      isAdd: true,
      menuType: RESOURCE_TYPE,
      form: {},
      rules: {
        name: [{ required: true, trigger: 'blur', message: '请输入菜单名称' }],
        code: [{ required: true, trigger: 'blur', message: '请输入菜单权限标识' }]
      }
    };
  },
  components: {
    IconPicker
  },
  methods: {
    handleAdd() {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm };
    },
    handleAddChild(row) {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm, parentId: row.id };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.showEditModal = true;
      this.form = { ...row };
    },
    handleHide(row, status) {
      console.log(row, status);
      row.hide = status;
      this.$message.success('操作成功');
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
    handlePageChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    },
    handleOk() {
      this.showEditModal = false;
      this.$message.success('操作成功');
    }
  }
};
</script>

<style lang="less" scoped>
.menu-icon {
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
</style>
