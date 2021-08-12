<template>
  <div class="personnel_circulation wrapper">
    <!-- 行政树 -->
    <LoadTree @initTree="initTree" @selectNode="selectNode" blockNode />

    <!-- table -->
    <div class="tree_table">
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="china" tab="中国">
          <!-- <SearchTable @handleTableChange="handleTableChange" @searchList="getList" :tableState="tableState" /> -->
        </a-tab-pane>
        <a-tab-pane key="foreign" tab="外籍"></a-tab-pane>
      </a-tabs>
      <!-- <basis-table :data-source="tableState.tableData"></basis-table> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, inject } from 'vue';
import LoadTree from './loadTree.vue';
import type { IPagination } from 'types/interface/common';
// import SearchTable from './searchTable.vue';
// import PersonelApi from '@/api/personnelCirculation/personnelCirculation';

const tableColumn = [
  {
    title: '采集点',
    dataIndex: 'collectName',
    align: 'center'
  }
];

export default defineComponent({
  inheritAttrs: false,
  components: {
    LoadTree
    // SearchTable
  },
  setup() {
    const state = reactive({
      activeKey: 'china',
      tableState: {
        tableData: [] as any,
        tableLoading: false
      },
      treeData: [],
      selectNode: [],
      currentTreeKey: '',
      pagination: {
        ...inject<IPagination>('$pagination'),
        showSizeChanger: true
      }
    });
    const selectedKeys = (val) => {
      state.currentTreeKey = val[0];
    };

    const initTree = (val) => {
      state.treeData = val;
      console.log(222, state.treeData);
    };

    // 获取tableList
    const getList = (datas?: any) => {
      console.log(111, state.treeData);
      let params: any = {
        pageNo: state.pagination.current,
        pageSize: state.pagination.pageSize,
        condition: {
          areaCode: state.currentTreeKey
        }
      };
      if (datas) {
        params.condition.userName = datas.userName;
        params.condition.claimName = datas.claimName;
        if (datas.searchTimes && datas.searchTimes.length) {
          params.condition.startTime = datas.searchTimes[0];
          params.condition.endTime = datas.searchTimes[1];
        }
      }

      console.log(11, params);
      // PersonelApi.getList(params).then((res) => {});
    };
    getList();

    return {
      ...toRefs(state),
      getList,
      initTree
    };
  }
});
</script>

<style lang="less" scoped>
.wrapper {
  padding: 30px;
}
.personnel_circulation {
  .tree_table {
    float: left;
    margin-left: 10px;
    width: calc(100% - 260px - 10px);
  }
}
</style>
