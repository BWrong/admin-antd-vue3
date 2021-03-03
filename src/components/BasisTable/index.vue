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
<script lang="ts">
import { computed, defineComponent } from 'vue';
function ganerTableIndex(pageNow = 1, pageSize = 10, index = 0) {
  return (pageNow - 1) * pageSize + index + 1;
}
export default defineComponent({
  name: 'BasisTable',
  inheritAttrs: false,
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
  setup(props, { attrs }) {
    return {
      computedColumns: computed(() => {
        // 判断是否需要显示序号
        if (!props.showIndex) return props.columns;
        let { current = 1, pageSize = 10 } = attrs.pagination as any;
        return [{ title: '序号', width: 80, customRender: ({ index }: { index: number }) => ganerTableIndex(current, pageSize, index), align: 'center' }, ...props.columns];
      })
    };
  }
});
</script>
