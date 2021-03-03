<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space class="fl">
        <a-button type="primary" ghost @click="handleAllRead"><CheckOutlined />全部已读</a-button>
        <a-button type="primary" ghost @click="handleBatchRead"><CheckSquareOutlined />批量已读</a-button>
      </a-space>
      <a-space class="fr text-right">
        <a-select placeholder="消息类型(可选)" style="width: 200px" v-model:value="searchType">
          <a-select-option v-for="(item, key) in messageType" :key="key" :value="item">{{ item }}</a-select-option>
        </a-select>
        <a-select placeholder="消息状态(可选)" style="width: 200px" v-model:value="searchStatus">
          <a-select-option v-for="(item, key) in messageStatus" :key="key" :value="item">{{ item }}</a-select-option>
        </a-select>
        <a-range-picker show-time format="YYYY-MM-DD HH:mm:ss" @change="selectTimes" v-model:value="searchTimes"></a-range-picker>
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
      <p>{{ row.content }}</p>
      <template #footer>
        <a-button class="block-center" type="primary" @click="handleOk">已读</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { CheckOutlined, CheckSquareOutlined } from '@ant-design/icons-vue';
import { Modal } from 'ant-design-vue';
import messageApi from '@/api/system/message';
import { messageStatus } from '@/utils';
import { MESSAGE_TYPE, MESSAGE_STATUS } from '@/config/dictionary';
export default {
  data() {
    const columns = [
      {
        title: '发送者',
        width: '100px',
        dataIndex: 'sender',
        ellipsis: true
      },
      {
        title: '类型',
        dataIndex: 'type',
        ellipsis: true
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
        ellipsis: true,
        align: 'center',
        customRender: ({ text, record }) => {
          const status = messageStatus(record.state);
          return <a-badge status={status == '未读' ? 'warning' : status == '已读' ? 'processing' : 'warning'} text={status} />;
        }
      },
      {
        title: '发送时间',
        dataIndex: 'createTime',
        align: 'center',
        ellipsis: true
      },
      {
        title: '操作',
        width: '100px',
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
      searchType: '',
      searchStatus: '',
      searchTimes: [],
      selectedRowKeys: [],
      isShowDetail: false,
      row: {}
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    CheckOutlined,
    CheckSquareOutlined
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
    // 选择时间
    selectTimes(data, values) {
      this.searchTimes = data;
      this.form.startTime = values[0];
      this.form.endTime = values[1];
    },

    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
      this.getData(pagination.current);
    },
    // 详情
    handleView(row) {
      this.row = { ...row };
      this.isShowDetail = true;
    },
    // 选择表格数据
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 全部已读
    handleAllRead() {
      // eslint-disable-next-line @typescript-eslint/no-this-alias
      let that = this;
      Modal.confirm({
        title: '提示',
        content: '确定把所有未读消息标记为已读吗?',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          // let params = {
          //   messageIds: this.rowKeys,
          //   receiver: getStorage('userinfo').username
          // };
          // console.log('params', params);
          that.$message.success('操作成功');
          that.selectedRowKeys = [];
        }
      });
    },
    // 批量已读
    handleBatchRead() {
      if (this.selectedRowKeys.length === 0) {
        this.$message.error('未选择消息');
      } else {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let that = this;
        Modal.confirm({
          title: '提示',
          content: '确定把选择项标记为已读吗?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            that.$message.success('操作成功');
            that.selectedRowKeys = [];
          }
        });
      }
    },
    // 已读
    handleOk() {
      this.$message.success('该消息状态变更为已读');
      this.handleCancel();
    },
    // 取消
    handleCancel() {
      this.isShowDetail = false;
      this.row = {};
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
