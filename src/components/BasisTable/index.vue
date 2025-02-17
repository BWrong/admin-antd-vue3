<template>
  <div class="basic-table">
    <ATable v-bind="props" :columns="computedColumns">
      <template v-for="key in slotsKeys" #[key]="data">
        <slot :name="key" v-bind="data" />
      </template>
    </ATable>
  </div>
</template>

<script lang="ts" setup>
import type { ColumnGroupType, ColumnProps, ColumnType, TableProps } from 'ant-design-vue/es/table';
import { tableProps } from 'ant-design-vue/es/table/Table';
import { computed, type SetupContext, useSlots } from 'vue';

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
  columns: ColumnProps<any>[];
  // eslint-disable-next-line
  'onUpdate:expandedRowKeys'?: (keys: (number | string)[]) => void;
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
type SlotKey =
  | 'bodyCell'
  | 'customFilterDropdown'
  | 'customFilterIcon'
  | 'emptyText'
  | 'expandedRowRender'
  | 'expandColumnTitle'
  | 'expandIcon'
  | 'footer'
  | 'headerCell'
  | 'summary'
  | 'title';
const slots: SetupContext['slots'] = useSlots();
const slotsKeys = computed(() => Object.keys(slots) as SlotKey[]);
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
