<template>
  <a-modal :visible="show" title="授权" @cancel="handleCancel" @ok="handleOk" :keyboard="false" :maskClosable="false">
    <div class="auth-menu-wrap">
      <div style="padding-bottom: 10px">
        <a-checkbox @change="handleCheckAll" v-model:checked="checkAll">全选</a-checkbox>
      </div>
      <a-tree v-model:checkedKeys="checkedKeys" @check="onCheck" checkable :tree-data="menus" :replace-fields="{ children: 'children', title: 'title', key: 'id' }" />
    </div>
  </a-modal>
</template>

<script lang="ts">
import { getStorage } from '@/utils/storage';
import { convertToTree } from '@/utils';
import { IMenu } from '@/types/interface/common';
import { defineComponent } from '@vue/runtime-core';
const menu = getStorage('menus');
const menuTree = convertToTree({ data: menu, pid: 0 });
export default defineComponent({
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
      checkedKeys: this.value,
      checkAll: false
    };
  },
  emits: ['update:show', 'update:value', 'cancel', 'confirm'],
  methods: {
    handleCancel() {
      this.$emit('update:show', false);
      this.$emit('cancel');
    },
    handleOk() {
      this.$emit('update:value', this.checkedKeys);
      this.$emit('update:show', false);
      this.$emit('confirm', this.checkedKeys);
    },
    // 全选操作
    handleCheckAll() {
      if (this.checkAll) {
        this.checkedKeys = this.getAllIds(this.menus);
      } else {
        this.checkedKeys = [];
      }
    },
    onCheck(checkedKeys: string[], e: { checked: boolean }) {
      e.checked || (this.checkAll = false);
    },
    getAllIds(data: IMenu[], ids: string[] = []) {
      data.forEach((item: IMenu) => {
        ids.push((item.id as unknown) as string);
        item.children && this.getAllIds(item.children, ids);
      });
      return ids;
    }
  }
});
</script>

<style lang="less" scoped>
.auth-menu-wrap {
  max-height: 500px;
  overflow-y: auto;
}
</style>
