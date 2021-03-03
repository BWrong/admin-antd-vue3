<template>
  <div class="page-wrap">
    <a-card class="page-control text-right">
      <a-select placeholder="请选择日志类型" style="width: 200px" allowClear>
        <a-select-option :value="key" v-for="(item, key) in logType" :key="key"> {{ item }} </a-select-option>
      </a-select>
      <a-range-picker class="space text-left" allowClear style="width: 280px" />
      <a-input-search class="space" placeholder="请输入关键字" style="width: 300px" enter-button="搜索" allow-clear></a-input-search>
    </a-card>
    <a-card>
      <a-table
        :columns="columns"
        :data-source="tableData"
        size="small"
        rowKey="id"
        :pagination="pagination"
        @change="handleTableChange"
        :row-selection="{ selectedRowKeys: select, onChange: onSelectChange }"
      >
        <template #type="type">
          <span>
            {{ logType[type] }}
          </span>
        </template>
        <template #action="row">
          <a-space>
            <a-button @click="handleDetail(row)" size="small">详情</a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <a-modal v-model:visible="showDetailModal" title="详情" :width="700" :footer="null" :keyboard="false" :maskClosable="false">
      <a-descriptions bordered size="small" :column="2" layout="vertical" style="width: 100%">
        <a-descriptions-item label="动作"> {{ detail.name }} </a-descriptions-item>
        <a-descriptions-item label="类型">{{ detail.type }} </a-descriptions-item>
        <a-descriptions-item label="用户名"> {{ detail.userName }} </a-descriptions-item>
        <a-descriptions-item label="时间"> {{ detail.createTime }} </a-descriptions-item>
        <a-descriptions-item label="接口地址" :span="2"> {{ detail.path }} </a-descriptions-item>
        <a-descriptions-item label="参数" :span="2">{{ detail.parameters }} </a-descriptions-item>
        <a-descriptions-item label="返回结果" :span="2"> {{ detail.result }} </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script>
import { pagination } from '@/config';
import { LOG_TYPE } from '@/config/dictionary';
import { ganerTableIndex } from '@/utils';

export default {
  data() {
    const columns = [
      { title: '序号', customRender: (value, row, index) => `${ganerTableIndex(this.pagination.current, this.pagination.pageSize, index)}`, width: 50 },
      { title: '动作', dataIndex: 'name', ellipsis: true },
      { title: '类型', dataIndex: 'type', slots: { customRender: 'type' } },
      { title: '用户名', dataIndex: 'userName', ellipsis: true },
      { title: '地址', dataIndex: 'path', ellipsis: true },
      { title: '时间', dataIndex: 'createTime', ellipsis: true },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 130 }
    ];
    return {
      logType: LOG_TYPE,
      tableData: [],
      tableLoading: false,
      columns: Object.freeze(columns),
      pagination: {
        ...pagination,
        pageSize: 20
      },
      searchWord: '',
      showDetailModal: false,
      detail: {}
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    getData(pageNow) {
      this.tableLoading = true;
      import('./mockData.json').then((res) => {
        this.pagination.current = res.current;
        this.pagination.pageSize = res.size;
        this.pagination.total = res.total;
        this.tableData = res.records;
        this.tableLoading = false;
      });
    },
    handleDetail(row) {
      console.log(row);
      this.detail = row;
      this.showDetailModal = true;
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    }
  }
};
</script>

<style lang="less" scoped>
.menu-icon {
  width: 400px;
  height: 400px;
  overflow-y: auto;
}
</style>
