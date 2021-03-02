<template>
  <a-modal :visible="show" title="授权" @cancel="handleCancel" @ok="handleOk" :keyboard="false" :maskClosable="false">
    <div class="auth-menu-wrap">
      <a-tree v-model:value="checkedKeys" checkable :tree-data="menus" :default-checked-keys="value" :replaceFields="{ children: 'children', title: 'name', key: 'id' }" />
    </div>
  </a-modal>
</template>

<script>
import { getStorage } from '@/utils/storage';
import { convertToTree } from '@/utils';
const menu = getStorage('menus');
const menuTree = convertToTree({ data: menu, pid: 0 });
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      menus: menuTree,
      checkedKeys: []
    };
  },
  methods: {
    handleCancel() {
      this.$emit('update:show', false);
    },
    handleOk() {
      this.$emit('input', this.checkedKeys);
      this.handleCancel();
    }
  }
};
</script>

<style lang="less" scoped>
.auth-menu-wrap {
  max-height: 500px;
  overflow-y: auto;
}
</style>
