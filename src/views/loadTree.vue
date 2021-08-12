<template>
  <a-tree class="load_tree" v-bind="attrs" :load-data="onLoadData" :tree-data="treeData" v-model:selectedKeys="selectedKeys" :replace-fields="replaceFields" @select="selectNode">
  </a-tree>
</template>

<script lang="ts">
import { defineComponent, reactive, useAttrs, toRefs } from 'vue';
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree';
import configApi from '@/api/system/config';
export default defineComponent({
  name: 'LoadTree',
  inheritAttrs: false,
  emits: ['onLoad', 'selectNode', 'initTree'],
  setup(props, { emit }) {
    const state = reactive({
      treeData: [] as any,
      replaceFields: {
        children: 'children',
        title: 'orgName',
        key: 'id'
      },
      selectedKeys: []
    });
    const attrs = useAttrs();
    // tree加载数据
    const getTreeList = async (params) => {
      let res = await configApi.list(params);
      return res;
    };

    const init = async () => {
      let params = {
        ancestor: 1,
        distance: 0
      };
      let res: any = await getTreeList(params);
      state.treeData = [];
      state.treeData.forEach((item) => (item.children = []));
      state.selectedKeys = state.treeData && state.treeData.length && state.treeData[0]?.id;
      console.log(11111);

      emit('initTree', state.treeData);
    };
    // 初始化
    init();

    // 异步加载子节点
    const onLoadData = (treeNode: any) => {
      //eslint-disable-next-line
      return new Promise(async (resolve: (value?: unknown) => void) => {
        let dataRef: any = treeNode.dataRef;
        let params = {
          ancestor: dataRef?.id,
          distance: dataRef?.distance + 1
        };
        let res = await getTreeList(params);
        res.forEach((item) => (item.children = []));
        treeNode.dataRef.children = res;
        state.treeData = [...state.treeData];
        resolve();
      });
    };

    // 点击树节点
    const selectNode = (selectedKeys) => {
      state.selectedKeys = selectedKeys;
      emit('selectNode', selectedKeys);
    };

    return {
      ...toRefs(state),
      onLoadData,
      attrs,
      selectNode
    };
  }
});
</script>

<style scoped>
.load_tree {
  width: 260px;
  height: calc(100vh - 200px);
  float: left;
  overflow-y: scroll;
}
</style>
