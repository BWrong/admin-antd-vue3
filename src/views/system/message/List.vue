<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <span class="fl">
        <a-button type="primary" ghost icon="check-circle" style="margin-right: 10px" @click="allRead">全部已读</a-button>
        <a-button type="primary" ghost icon="check-circle" @click="batchRead">批量已读</a-button>
      </span>
      <span class="flex" style="justify-content: flex-end">
        <a-select placeholder="消息类型(可选)" style="width: 15%" v-model:value="form.type">
          <a-select-option v-for="item in types" :key="item.key" :value="item.value">{{ item.value }}</a-select-option>
        </a-select>
        <a-select placeholder="消息状态(可选)" style="width: 15%; margin: 0 10px" v-model:value="form.state">
          <a-select-option value="0">未读</a-select-option>
          <a-select-option value="1">已读</a-select-option>
        </a-select>
        <a-range-picker show-time format="YYYY-MM-DD HH:mm:ss" style="width: 28%; margin-right: 10px" @change="selectTimes" v-model:value="times"></a-range-picker>
        <div class="r-nw-fe-c" style="float: right">
          <a-button type="primary" icon="search" style="margin-right: 10px" @click="search">搜索</a-button>
          <a-button type="primary" icon="reload" style="margin-right: 10px" ghost @click="reset">重置</a-button>
        </div>
      </span>
    </a-card>
    <a-card>
      <basis-table
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        :dataSource="dataList"
        :pagination="pagination"
        :action="action"
      ></basis-table>
    </a-card>
    <a-modal title="消息详情" :visible="visible" @ok="handleOk" @cancel="handleCancel" :keyboard="false" :maskClosable="false">
      <p>{{ row.content }}</p>
      <template #footer>
        <span>
          <div class="footer" @click="handleOk">已读</div>
        </span>
      </template>
    </a-modal>
  </div>
</template>

<script>
import messageApi from '@/api/system/message';
import BasisTable from '@/components/BasisTable';
import { Modal } from 'ant-design-vue';
import { pagination } from '@/config';
import { messageStatus } from '@/utils';
export default {
  data() {
    const columns = [
      {
        title: 'ID',
        width: '100px',
        dataIndex: 'id',
        ellipsis: true
      },
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
        customRender: (text, record) => {
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
        scopedSlots: { customRender: 'action' }
      }
    ];
    return {
      types: [],
      columns,
      form: {
        page: 1,
        size: 10,
        asc: false,
        orderBy: 'createTime',
        type: undefined,
        state: undefined,
        startTime: '',
        endTime: ''
      },
      pagination: {
        ...pagination,
        showTotal: (total) => `共 ${total} 条`,
        onShowSizeChange: (current, pageSize) => {
          this.form.size = pageSize;
          this.getData();
        },
        onChange: (val) => {
          this.form.page = val;
          this.getData();
        }
      },
      dataList: [],
      selectedRowKeys: [],
      times: ['', ''],
      action: [
        {
          text: '详情',
          click: this.goToDetail
        }
      ],
      visible: false,
      row: {}
    };
  },
  mounted() {
    this.getData();
  },
  components: {
    BasisTable
  },
  methods: {
    // 获取表格数据
    getData() {
      messageApi.list(this.form).then((res) => {
        this.pagination.total = res.total;
        this.dataList = res.records;
      });
    },
    // 查询
    search() {
      this.form.page = 1;
      this.form.size = 10;
      this.getData();
    },
    // 选择时间
    selectTimes(data, values) {
      this.times = data;
      this.form.startTime = values[0];
      this.form.endTime = values[1];
    },
    // 详情
    goToDetail(row) {
      this.row = { ...row };
      this.visible = true;
    },
    // 重置
    reset() {
      this.form.page = 1;
      this.form.size = 10;
      this.form.type = '';
      this.form.state = '';
      this.times = [];
    },
    // 选择表格数据
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys;
    },
    // 全部已读
    allRead() {
      if (this.selectedRowKeys.length === 0) {
        Modal.confirm({
          title: ' 批量标记为已读消息',
          content: '未选中任何未读消息!'
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let that = this;
        Modal.confirm({
          title: '全部标记为已读消息',
          content: '确定把所有未读消息标记为已读吗?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            // let params = {
            //   messageIds: this.rowKeys,
            //   receiver: getStorage('userinfo').username
            // };
            // console.log('params', params);
            that.$message.success('全部已读成功');
            that.selectedRowKeys = [];
          }
        });
      }
    },
    // 批量已读
    batchRead() {
      if (this.selectedRowKeys.length === 0) {
        Modal.confirm({
          title: ' 批量标记为已读消息',
          content: '未选中任何未读消息!'
        });
      } else {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        let that = this;
        Modal.confirm({
          title: '全部标记为已读消息',
          content: '确定把所有未读消息标记为已读吗?',
          okText: '确认',
          cancelText: '取消',
          onOk() {
            // let params = {
            //   messageIds: this.rowKeys,
            //   receiver: getStorage('userinfo').username
            // };
            // console.log('params', params);
            that.$message.success('全部已读成功');
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
      this.visible = false;
      this.row = {};
    }
  },
  created() {
    // this.rowSelection.selectedRowKeys = this.selectedRowKeys;
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
