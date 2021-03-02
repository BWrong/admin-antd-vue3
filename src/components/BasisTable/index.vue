<template>
  <div class="basic-table">
    <a-table bordered size="small" :rowKey="rowKey" :columns="computedColumns" v-bind="$attrs">
      <template #index="{ index }">
        {{ index }}
      </template>
      <template v-for="(item, key) in $slots" v-slot:[key]="data">
        <slot :name="key" v-bind="data"></slot>
      </template>
    </a-table>
  </div>
</template>
<script>
function ganerTableIndex(pageNow = 1, pageSize = 10, index = 0) {
  return (pageNow - 1) * pageSize + index + 1;
}
export default {
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    }
  },
  computed: {
    computedColumns() {
      // 判断是否需要显示序号
      if (!this.showIndex) {
        return this.columns;
      } else {
        let { current = 1, pageSize = 10 } = this.$attrs.pagination;
        return [{ title: '序号', width: 80, customRender: ({ index }) => ganerTableIndex(current, pageSize, index) }, ...this.columns];
      }
    }
  }
};
</script>
