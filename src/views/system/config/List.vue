<template>
  <div class="page-wrap">
    <a-card class="page-control">
      <a-space class="fr">
        <a-input v-model:value="searchWord" placeholder="请输入系统配置项名称" allowClear class="vertical-top" style="width: 400px"></a-input>
        <a-button class="space" type="primary">搜索</a-button>
        <a-button class="space" type="primary" ghost>重置</a-button>
      </a-space>
      <a-button class="" type="primary" ghost @click="handleAdd"> <PlusOutlined /> 新建 </a-button>
    </a-card>
    <a-card>
      <basis-table
        :columns="columns"
        show-index
        :data-source="tableData"
        :pagination="pagination"
        @change="handleTableChange"
        :loading="tableLoading"
        :row-selection="{ selectedRowKeys: select, onChange: onSelectChange }"
      >
        <template #action="{ record }">
          <a-space>
            <a-button @click="handleEdit(record)" type="primary" size="small">编辑</a-button>
            <delete-button @confirm="handleDel(record)" :title="record.title" />
          </a-space>
        </template>
      </basis-table>
    </a-card>
    <!-- 新增编辑 -->
    <a-modal v-model:visible="showEditModal" :title="isAdd ? '新建' : '编辑'" :keyboard="false" :maskClosable="false" @ok="handleOk" :afterClose="() => $refs.form.resetFields()">
      <a-form ref="form" :model="form" :rules="rules" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
        <a-form-item label="配置项代码" name="code">
          <a-input v-model:value="form.code" :disabled="!isAdd" />
        </a-form-item>
        <a-form-item label="配置项名称" name="title">
          <a-input v-model:value="form.title" />
        </a-form-item>
        <a-form-item label="配置值" name="value">
          <a-input v-model:value="form.value" />
        </a-form-item>
        <a-form-item label="配置类型" name="type">
          <a-select v-model:value="form.type">
            <a-select-option :value="String(item.value)" v-for="item in types" :key="item.value"> {{ item.title }} </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="说明" name="describe">
          <a-textarea :rows="3" v-model:value="form.discription" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { PlusOutlined } from '@ant-design/icons-vue';
import configComponent from './components';
import configApi from '@/api/system/config';
const initForm = {
  code: '',
  title: '',
  value: '',
  type: '',
  describe: ''
};
export default {
  inject: ['$pagination'],
  data() {
    const columns = [
      {
        title: '配置项代码',
        dataIndex: 'code',
        width: 150,
        align: 'center'
      },
      { title: '配置项名称', dataIndex: 'title' },
      {
        title: '配置项类型',
        dataIndex: 'type',
        align: 'center',
        width: 150,
        customRender: ({ text }) => {
          const type = configComponent.find((item) => item.value === Number(text));
          return type.title;
        }
      },
      {
        title: '配置值',
        dataIndex: 'value',
        ellipsis: true,
        align: 'center',
        width: 150,
        customRender: ({ text }) => {
          const type = configComponent.find((item) => item.value === Number(text));
          return type?.component ? <type.component value={String(text)} is-edit={false} title={text}></type.component> : '';
        }
      },
      {
        title: '说明',
        dataIndex: 'describe',
        ellipsis: true,
        customRender: ({ text }) => (
          <a-tooltip>
            <template slot="title">{text}</template>
            <div class="text-nowrap">{text}</div>
          </a-tooltip>
        )
      },
      { title: '操作', slots: { customRender: 'action' }, align: 'center', width: 200 }
    ];
    return {
      searchWord: '',
      tableData: [],
      tableLoading: false,
      select: [],
      types: configComponent,
      columns: Object.freeze(columns),
      pagination: {
        ...this.$pagination,
        pageSize: 20
      },
      showEditModal: false,
      isAdd: true,
      form: {},
      rules: {
        code: [{ required: true, trigger: 'blur', message: '请输入配置项代码' }],
        title: [{ required: true, trigger: 'blur', message: '请输入配置项名称' }],
        value: [{ required: true, trigger: 'blur', message: '请输入配置项值' }],
        type: [{ required: true, trigger: 'blur', message: '请选择配置类型' }]
      }
    };
  },
  components: {
    PlusOutlined
  },
  created() {
    this.getData(1);
  },
  methods: {
    getData(pageNow = 1) {
      this.tableLoading = true;
      configApi
        .list({
          pageSize: this.pagination.pageSize,
          pageNow
        })
        .then((res) => {
          this.pagination.current = res.current;
          this.pagination.pageSize = res.size;
          this.pagination.total = res.total;
          this.tableData = res.list;
          this.tableLoading = false;
        });
    },
    handleAdd() {
      this.isAdd = true;
      this.showEditModal = true;
      this.form = { ...initForm };
    },
    handleEdit(row) {
      console.log(row);
      this.isAdd = false;
      this.showEditModal = true;
      this.form = { ...row };
    },
    handleDel(row) {
      this.$message.success('操作成功');
    },
    handleTableChange(pagination, filters, sorter) {
      this.pagination = pagination;
      console.log(pagination, filters, sorter);
    },
    handleOk() {
      this.$refs.form.validate().then(() => {
        this.$message.success('操作成功');
        this.showEditModal = false;
      });
    },
    onSelectChange(selectedRowKeys) {
      this.select = selectedRowKeys;
      console.log(selectedRowKeys);
    }
  }
};
</script>
