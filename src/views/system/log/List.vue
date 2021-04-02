<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space class="fr">
        <search-button class="fr" v-model="searchWord" @search="handleSearch" @reset="handleReset">
          <a-select placeholder="请选择日志类型" style="width: 200px" v-model:value="searchType" allowClear>
            <a-select-option :value="key" v-for="(item, key) in logType" :key="key"> {{ item }} </a-select-option>
          </a-select>
          <a-range-picker class="space text-left" allowClear style="width: 280px" />
        </search-button>
      </a-space>
    </a-card>
    <a-card>
      <basis-table :columns="columns" show-index :data-source="tableData" :pagination="pagination" @change="handleTableChange" :loading="tableLoading">
        <template #type="type">
          {{ logType[type] }}
        </template>
        <template #action="{ record }">
          <a-button type="primary" @click="handleDetail(record)" size="small">详情</a-button>
        </template>
      </basis-table>
    </a-card>
    <a-modal v-model:visible="isShowDetail" title="详情" :width="700" :footer="null" :keyboard="false" :maskClosable="false">
      <a-descriptions bordered size="small" :column="2" layout="vertical" style="width: 100%">
        <a-descriptions-item label="动作"> {{ detail.name }} </a-descriptions-item>
        <a-descriptions-item label="类型">{{ detail.type }} </a-descriptions-item>
        <a-descriptions-item label="用户名"> {{ detail.username }} </a-descriptions-item>
        <a-descriptions-item label="时间"> {{ detail.createTime }} </a-descriptions-item>
        <a-descriptions-item label="接口地址" :span="2"> {{ detail.path }} </a-descriptions-item>
        <a-descriptions-item label="参数" :span="2">{{ detail.parameters }} </a-descriptions-item>
        <a-descriptions-item label="返回结果" :span="2"> {{ detail.result }} </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { LOG_TYPE } from '@/enums/system';
import logApi from '@/api/system/log';

export default {
  inject: ['$pagination'],
  data() {
    const columns = [
      { title: '动作', dataIndex: 'name', ellipsis: true },
      { title: '类型', dataIndex: 'type', customRender: ({ text }) => LOG_TYPE[text] },
      { title: '操作者', dataIndex: 'username', ellipsis: true },
      { title: '接口地址', dataIndex: 'path', ellipsis: true },
      { title: '时间', dataIndex: 'createTime', ellipsis: true },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 130 }
    ];
    return {
      logType: LOG_TYPE,
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...this.$pagination
      },
      searchWord: '',
      searchType: undefined,
      searchTimes: [],
      isShowDetail: false,
      detail: {}
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      logApi
        .list({
          pageSize: this.pagination.pageSize,
          pageNow
        })
        .then((res) => {
          this.pagination.current = res.current;
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableLoading = false;
        });
    },
    handleDetail(row) {
      console.log(row);
      this.detail = row;
      this.isShowDetail = true;
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    },
    // 查询
    handleSearch() {
      this.getData(1);
    },
    // 重置
    handleReset() {
      this.searchWord = '';
      this.searchType = '';
      this.searchTimes = [];
      this.getData(1);
    }
  }
};
</script>

<style lang="less" scoped></style>
