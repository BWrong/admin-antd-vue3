<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space class="fl">
        <a-button type="primary" ghost @click="handleAllRead"><icon-font type="icon-check" />全部已读</a-button>
        <a-button type="primary" ghost @click="handleBatchRead"><icon-font type="icon-filter" />批量已读</a-button>
      </a-space>
      <a-space class="fr">
        <a-select placeholder="消息类型(可选)" style="width: 200px" v-model:value="searchType" allowClear>
          <a-select-option v-for="(item, key) in messageType" :key="key" :value="key">{{ item }}</a-select-option>
        </a-select>
        <a-select placeholder="消息状态(可选)" style="width: 200px" v-model:value="searchStatus" allowClear>
          <a-select-option v-for="(item, key) in messageStatus" :key="key" :value="key">{{ item }}</a-select-option>
        </a-select>
        <a-range-picker show-time format="YYYY-MM-DD HH:mm:ss" v-model:value="searchTimes" allowClear></a-range-picker>
        <a-button type="primary" @click="handleSearch">搜索</a-button>
        <a-button type="primary" ghost @click="handleReset">重置</a-button>
      </a-space>
    </a-card>
    <a-card>
      <basis-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        show-index
        :columns="columns"
        :data-source="tableData"
        :pagination="pagination"
        @change="handleTableChange"
        :loading="tableLoading"
      >
        <template #action="{ record }">
          <a-space>
            <a-button @click="handleView(record)" type="primary" size="small">详情</a-button>
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <a-modal title="消息详情" :visible="isShowDetail" @ok="handleOk" @cancel="handleCancel" :keyboard="false" :maskClosable="false">
      <p>{{ detail.content }}</p>
      <template #footer>
        <a-button class="block-center" type="primary" @click="handleOk"><icon-font type="icon-check" />已读</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { Modal } from 'ant-design-vue';
import messageApi from '@/api/system/message';
import { MESSAGE_TYPE, MESSAGE_STATUS } from '@/enums/message';
import { message } from 'ant-design-vue';
export default {
  data() {
    const columns = [
      {
        title: '发送者',
        dataIndex: 'sender',
        width: '180px'
      },
      {
        title: '类型',
        dataIndex: 'type',
        width: '180px',
        customRender: ({ text }) => MESSAGE_TYPE[text]
      },
      {
        title: '内容',
        dataIndex: 'content',
        ellipsis: true
      },
      {
        title: '状态',
        width: '100px',
        dataIndex: 'state',
        align: 'center',
        customRender: ({ text }) => <a-badge status={text == 1 ? 'warning' : 'processing'} text={MESSAGE_STATUS[text]} />
      },
      {
        title: '发送时间',
        dataIndex: 'createTime',
        align: 'center',
        width: '220px'
      },
      {
        title: '操作',
        width: '200px',
        ellipsis: true,
        align: 'center',
        slots: { customRender: 'action' }
      }
    ];
    return {
      messageType: MESSAGE_TYPE,
      messageStatus: MESSAGE_STATUS,
      columns,
      tableData: [],
      tableLoading: false,
      pagination: {
        ...this.$pagination
      },
      searchType: null,
      searchStatus: null,
      searchTimes: [],
      selectedRowKeys: [],
      isShowDetail: false,
      detail: {}
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    // 获取表格数据
    getData(pageNow = 1) {
      this.tableLoading = true;
      messageApi
        .list({
          pageSize: this.pagination.pageSize,
          pageNow
        })
        .then((res) => {
          this.pagination.currentPage = res.current;
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableLoading = false;
        });
    },
    // 查询
    handleSearch() {
      this.getData(1);
    },
    // 重置
    handleReset() {
      this.searchType = '';
      this.searchStatus = '';
      this.searchTimes = [];
      this.getData(1);
    },
    handleTableChange(pagination) {
      this.pagination = pagination;
      this.getData(pagination.current);
    },
    // 详情
    handleView(row) {
      this.detail = { ...row };
      this.isShowDetail = true;
    },
    // 选择表格数据
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 全部已读
    handleAllRead() {
      Modal.confirm({
        title: '提示',
        content: '确定把所有未读消息标记为已读吗?',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          message.success('操作成功');
          this.selectedRowKeys = [];
        }
      });
    },
    // 批量已读
    handleBatchRead() {
      if (this.selectedRowKeys.length === 0) {
        message.error('未选择消息');
      } else {
        Modal.confirm({
          title: '提示',
          content: '确定把选择项标记为已读吗?',
          okText: '确认',
          cancelText: '取消',
          onOk: () => {
            message.success('操作成功');
            this.selectedRowKeys = [];
          }
        });
      }
    },
    // 已读
    handleOk() {
      message.success('该消息状态变更为已读');
      this.handleCancel();
    },
    // 取消
    handleCancel() {
      this.isShowDetail = false;
      this.detail = {};
    }
  }
};
</script>

<style lang="less" scoped>
.footer {
  margin: 0 auto;
  width: 100px;
  height: 35px;
  border-radius: 2px;
  line-height: 35px;
  letter-spacing: 4px;
  color: #fff;
  background: #1890ff;
  cursor: pointer;
}
</style>
