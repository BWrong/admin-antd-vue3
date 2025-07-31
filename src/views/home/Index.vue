<template>
  <div class="page-wrap">
    <ACard title="首页">
      <h3>运行时配置</h3>
      <div>
        以VITE_GLOBAL开头的变量会注入到全局，方便在打包后进行修改，而不必重新打包，默认挂载到window.__APP_CONFIG__，打包后可在index.html中修改
      </div>
      <div>当前配置：</div>
      <div class="b-1 b-gray b-dashed p-2">{{ appConfig }}</div>
      <h3>权限测试</h3>
      <div class="my-2 block">
        选择权限：<ASelect v-model:value="selectAuthKeys" mode="multiple" class="w-100">
          <ASelectOption v-for="item in authKeys" :key="item" :value="item">
            {{ item }}
          </ASelectOption>
        </ASelect>
      </div>
      <div>{{ selectAuthKeys }}</div>
      <div class="m-2 flex items-center gap-2">
        <div>指令：</div>
        <AButton v-auth="'home'"> 指令：home </AButton>
        <AButton v-auth="selectAuthKeys"> 指令：every模式 </AButton>
        <AButton v-auth:some="selectAuthKeys"> 指令：some模式 </AButton>
      </div>
      <div class="m-2 flex items-center gap-2">
        <div>组件：</div>
        <Auth value="home">
          <a-button>组件：home</a-button>
        </Auth>
        <Auth :value="selectAuthKeys">
          <a-button>组件：every模式</a-button>
        </Auth>
        <Auth :value="selectAuthKeys" model="some">
          <a-button>组件：some模式</a-button>
        </Auth>
      </div>
      <h3>文件下载</h3>
      <div>
        <AButton @click="handleDownloadFile"> 文件下载 </AButton>
        <p>文件大小：{{ bytesToSize(progress.total) }}</p>
        <p>已下载：{{ bytesToSize(progress.loaded) }}</p>
        <p>
          进度：
          <AProgress style="width: 400px" :percent="progress.progress" />
        </p>
      </div>
      <h3>请求取消</h3>
      <div>
        <ASpace>
          <AButton @click="handleRun"> 自动取消重复请求（快速点击测试） </AButton>
          <AButton @click="handleCancelAllRequest"> 取消全部请求 </AButton>
        </ASpace>
      </div>
      <h3>VueUse - useAsyncState</h3>
      <p>
        <a href="https://vueuse.org/core/useAsyncState/" target="_blank" rel="noopener noreferrer">VueUse -
          useAsyncState</a>测试
      </p>
      <AButton :loading="isLoading" @click="handleRun"> 请求 </AButton>
      <p>测试结果</p>
      <p>data:{{ state }}</p>
      <p>err:{{ error }}</p>
      <h3>表格</h3>
      <p>组件位置：/src/components/BasisTable</p>
      <a-button @click="handleTestPagination"> 修改当前页为2 </a-button>
      <BasisTable show-index :columns="columns" :loading="isLoading" :data-source="state?.list || []"
        :pagination="pagination">
        <template #bodyCell="{ column, record }">
          <div v-if="column.dataIndex === 'image'">
            <img :src="record.image" class="h-10 w-10 rounded-full">
          </div>
          <ASpace v-if="column.dataIndex === 'action'" class="table-action">
            <span class="text-primary">
              <IconFont type="icon-edit-square" />
            </span>
            <DeleteButton :title="record.title" @confirm="handleDelete">
              <IconFont type="icon-delete" style="color: red" />
            </DeleteButton>
          </ASpace>
          <ASpace v-if="column.dataIndex === 'icon'">
            <IconFont :type="record.icon" />
          </ASpace>
          <ASpace v-if="column.dataIndex === 'type'">
            {{ record.type === 0 ? '菜单' : '操作' }}
          </ASpace>
        </template>
      </BasisTable>
      <h3>图标</h3>
      <p>组件位置：/src/components/IconFont</p>
      使用<a href="https://www.iconfont.cn/" class="text-link" target="_blank">iconfont</a>图标，<strong>请将<span
          class="text-primary">ENV</span>文件中的<span
          class="text-primary">VITE_ICONFONT_URL</span>变量设置为自己iconfont项目对应的地址</strong>。当然，如果你不喜欢这种使用方式，可以试试
      <a href="https://unocss.dev/presets/icons" target="_blank" rel="noopener noreferrer">unocss Icons</a>或者其他方式
      <p class="text-6 text-primary">
        <IconFont type="icon-pic-right" :style="{ color: 'blue' }" />
        <IconFont type="icon-CodeSandbox" />
      </p>
      <h3>图标选择器</h3>
      <p>组件位置：/src/components/IconPicker</p>
      <a-input v-model:value="iconSelect" readonly style="width: 200px">
        <template #addonAfter>
          <a-popover placement="right" :auto-adjust-overflow="false" title="选择图标">
            <template #content>
              <div class="icon-picker-wrap">
                <IconPicker v-model:value="iconSelect" />
              </div>
            </template>
            <icon-font v-if="iconSelect" :type="iconSelect" />
            <span v-else>选择</span>
          </a-popover>
        </template>
      </a-input>
      <h3>操作确认按钮</h3>
      <p>组件位置：/src/components/ConfirmButton</p>
      <ConfirmButton @confirm="handleDelete" />
      <h3>删除按钮</h3>
      <p>组件位置：/src/components/ConfirmButton/DeleteButton</p>
      <ASpace>
        <DeleteButton @confirm="handleDelete" />
        <DeleteButton @confirm="handleDelete" action-title="删除项一" />
      </ASpace>
      <h3>模态框函数式调用</h3>
      <p>组件位置：/src/composables/useDialog</p>
      <ASpace>
        <AButton @click="handleOpenModal"> 打开（默认） </AButton>
        <AButton @click="handleOpenModal1"> 打开（手动） </AButton>
        <AButton @click="handleOpenModal2"> 打开（带插槽） </AButton>
      </ASpace>
      <h3>UnoCss</h3>
      <p>
        默认可以使用<a href="https://tailwindcss.com/" target="_blank"
          rel="noopener noreferrer">tailwindcss</a>语法,建议安装对应编辑器插件<a
          href="https://marketplace.visualstudio.com/items?itemName=antfu.unocss" target="_blank"
          rel="noopener noreferrer">unocss</a>以获得更好的体验。
      </p>
      <p>
        默认所有单位使用rem，如果需要使用px，可以安装<a href="https://unocss.dev/presets/rem-to-px">rem-to-px插件</a>
      </p>
      <div
        class="m-1 inline-block h-30 max-w-lg bg-primary p-5 text-center text-white duration-1000 hover:(rounded-10 bg-green text-red)">
        这是使用unocss默认预设写出的样式，class如下：
        <div>
          m-1 inline-block h-30 max-w-lg bg-primary p-5 text-center text-white duration-1000 hover:(rounded-10 bg-green
          text-red)
        </div>
      </div>
      <h3>主题设置</h3>
      <a-popover trigger="hover">
        <template #content>
          <span v-for="item in colorList" :key="item" class="m-1 inline-block h-4 w-4 cursor-pointer"
            :style="{ backgroundColor: item as string }" @click="handleSetTheme(item)" />
        </template>
        <IconFont type="icon-bg-colors" font-size="20px" class="text-primary" />
      </a-popover>
      <h3>颜色</h3>
      <p class="text-primary">主色</p>
      <p class="text-success">成功</p>
      <p class="text-warning">警告</p>
      <p class="text-error">错误</p>
      <p class="text-link">链接</p>
      <h3>字体</h3>
      <p class="text-mini">辅助文本 12px</p>
      <p class="text-default">内容文本 14px</p>
      <p class="text-medium">标题文本 16px</p>
      <p class="text-large">大标题文本 18px</p>
      <p class="text-xlarge">大标题文本 20px</p>
    </ACard>
  </div>
</template>
<script lang="tsx" setup>
import { message } from 'ant-design-vue';
import type { ColumnProps } from 'ant-design-vue/es/table';
import type { AxiosProgressEvent } from 'axios';
import { reactive } from 'vue';

import { testApi } from '@/api/auth';
import { downloadRequest } from '@/api/file';
import { bytesToSize } from '@/utils';
import request from '@/utils/request';

import TestModalForm from './TestModalForm.vue';
const authKeys = ['home', 'system', 'system/menu', 'other'];
const selectAuthKeys = ref(['home', 'system']);
const appConfig = window.__APP_CONFIG__;

const columns: ColumnProps[] = [
  {
    title: '名称',
    dataIndex: 'name'
  },
  {
    title: '分类',
    dataIndex: 'category'
  },
  {
    title: '价格',
    dataIndex: 'price'
  },
  {
    title: '图片',
    dataIndex: 'image'
  },
  {
    title: '操作',
    align: 'center',
    dataIndex: 'action'
  }
];
const { isLoading, state, executeImmediate, error, pagination } = usePagination(testApi, {
  defaultParams: [{ pageSize: 10, current: 1 }]
});

function handleRun() {
  state.value && executeImmediate();
}
function handleTestPagination() {
  pagination.current = 2;
  // pagination.onChange(2)
}
function handleCancelAllRequest() {
  request.cancelAllRequest();
}
const progress = reactive<Partial<AxiosProgressEvent>>({
  total: 0,
  loaded: 0,
  progress: 0
});
function handleDownloadFile() {
  downloadRequest('文件下载测试', {}, progress);
}
function handleDelete() {
  message.success('删除成功');
}
const { createDialog } = useDialog();
// 默认打开弹窗，并传递参数给组件，支持vue3的props类型推断
function handleOpenModal() {
  // 这里需要手动添加一下泛型，就可推断onConfirm中参数的类型
  createDialog<typeof TestModalForm>(<TestModalForm title="测试模态窗" />, {
    title: '测试弹窗1',
    width: '500px',
    // ...支持AModal的所有配置
    onConfirm(data) {
      // 可以拿到内部数据，在表单类弹窗中很有用
      console.log('拿到组件内部数据：', data);
    }
  });
}
function handleOpenModal1() {
  // 默认不显示
  const { open, close } = createDialog<typeof TestModalForm>(<TestModalForm title="测试模态窗" />, {
    title: '测试弹窗2',
    width: '500px',
    defaultOpen: false,
    onConfirm(data) {
      console.log('拿到组件内部数据：', data);
    }
  });
  open();
  setTimeout(() => {
    close();
  }, 3000);
}
function handleOpenModal2() {
  // 带插槽
  createDialog<typeof TestModalForm>(<TestModalForm title="测试模态窗">
    {{
      default: () => <div>默认插槽</div>,
      test: () => <div>test插槽</div>
    }}
  </TestModalForm>, {
    title: '测试弹窗3',
    width: '500px',
    onConfirm(data) {
      console.log('拿到组件内部数据：', data);
      console.log('122');
    }
  });
}
const iconSelect = ref<Iconfont | undefined>();
const colorList = ['#1890ff', '#52c41a', '#faad14', '#ff4d4f'];
const { setTheme, themeOptions } = useTheme();
// 设置主题颜色
function handleSetTheme(color: string) {
  setTheme({
    themeToken: {
      ...themeOptions.themeToken,
      colorPrimary: color
    }
  });
}
</script>
<style scoped>
h3 {
  margin: 20px 0;
}
</style>
