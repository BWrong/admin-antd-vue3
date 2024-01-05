<template>
  <div class="basic-table">
    <a-table v-bind="props" :columns="computedColumns">
      <template v-for="(item, key) in slots" #[key]="data">
        <slot :name="key" v-bind="data"></slot>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { tableProps } from 'ant-design-vue/es/table/Table';
import type { ColumnGroupType, ColumnProps, ColumnType, TableProps } from 'ant-design-vue/es/table';
import { getDefaultFromProps } from '@/utils';
defineOptions({
  name: 'BasisTable',
  inheritAttrs: false
});
interface IPage {
  current?: number;
  pageSize?: number;
}

interface IProps extends TableProps {
  // eslint-disable-next-line vue/require-default-prop
  rowKey?: string;
  showIndex?: boolean;
  columns: ColumnProps[];
  // pagination?: IPage | false;
  // bordered?: boolean;
  // defaultExpandAllRows?: boolean;
  // expandFixed?: boolean;
  // expandRowByClick?: boolean;
  // loading?: boolean;
  // showExpandColumn?: boolean;
  // showHeader?: boolean;
  // showSorterTooltip?: boolean;
  // sticky?: boolean;
}
const slots = useSlots();
const props = withDefaults(defineProps<IProps>(), {
  ...getDefaultFromProps(tableProps(), {
    rowKey: 'id',
    showIndex: false
    // pagination: false,
    // bordered: true,
    // defaultExpandAllRows: false,
    // expandFixed: false,
    // expandRowByClick: false,
    // loading: false,
    // showExpandColumn: true,
    // showHeader: true,
    // showSorterTooltip: true,
    // sticky: false
  })
});
function ganerTableIndex(current = 1, pageSize = 10, index = 0) {
  return (current - 1) * pageSize + index + 1;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const computedColumns = computed<(ColumnGroupType<any> | ColumnType<any>)[]>(() => {
  // 判断是否需要显示序号
  if (!props.showIndex) return props.columns;
  const pagination = props.pagination || {
    current: 1,
    pageSize: 0
  };
  const { current = 1, pageSize = 10 } = pagination as IPage;
  return [
    {
      title: '序号',
      width: 80,
      customRender: ({ index }: { index: number }) => ganerTableIndex(current, pageSize, index),
      align: 'center'
    },
    ...props.columns
  ];
});
</script>
