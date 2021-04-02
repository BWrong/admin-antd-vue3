<template>
  <div class="basic-table">
    <a-table bordered size="small" :rowKey="rowKey" :columns="computedColumns" :pagination="pagination" v-bind="$attrs">
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
import { computed, defineComponent, PropType } from 'vue';
function ganerTableIndex(pageNow = 1, pageSize = 10, index = 0) {
  return (pageNow - 1) * pageSize + index + 1;
}
interface IPage {
  current: number;
  pageSize: number;
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
    },
    pagination: {
      type: [Object, Boolean] as PropType<IPage>,
      default: false
    }
  },
  setup(props) {
    return {
      computedColumns: computed(() => {
        // 判断是否需要显示序号
        if (!props.showIndex) return props.columns;
        let pagination: IPage = props.pagination || { current: 1, pageSize: 0 };
        let { current = 1, pageSize = 10 } = pagination;
        return [{ title: '序号', width: 80, customRender: ({ index }: { index: number }) => ganerTableIndex(current, pageSize, index), align: 'center' }, ...props.columns];
      })
    };
  }
});
</script>
