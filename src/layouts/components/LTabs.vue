<template>
  <div class="layout-tabs">
    <a-tabs :type="tabType" :active-key="curTabKey" @edit="removeTab" @change="clickTab" size="small" hide-add>
      <a-tab-pane v-for="item in tabs" :key="item.tabKey">
        <template #tab>
          <div>
            {{ item.title }}
          </div>
        </template>
      </a-tab-pane>
      <template #rightExtra>
        <a-dropdown>
          <IconFont type="icon-gengduo" :size="18" class="cursor-pointer"></IconFont>
          <template #overlay>
            <a-menu>
              <!-- TODO: 刷新会丢失其他tab -->
              <a-menu-item @click="updataRouteKey">
                <template #icon> <IconFont type="icon-shuaxin" /> </template>
                刷新页面
              </a-menu-item>
              <a-menu-item @click="closeOtherTabs">
                <template #icon> <IconFont type="icon-close-circle" /> </template>
                关闭其他</a-menu-item
              >
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  useRoute,
  useRouter,
  type LocationQuery,
  type RouteParams,
  type RouteLocationNormalizedLoaded,
  type RouteLocationMatched
} from 'vue-router';
import useRouteCache from '@/composables/useRouteCache';
import type { Key } from 'ant-design-vue/es/_util/type';
// import EventBus from '@/utils/event-bus';

const props = defineProps({
  // 【根据项目修改】tab页面在路由的第几层，或者说第几层的 router-view 组件（当前项目为第二层）
  tabRouteViewDepth: {
    type: Number,
    default: 2
  },
  // tab页面的key值，从route对象中取，一个key值对应一个tab页面
  // 默认为route.name值（不要设为route.path，因为route.path为'/detail/:id'时会造成一个路由对应多个tab页），可以自己设置 route.meta.tabKey
  getTabKey: {
    type: Function,
    default: (routeMatch: RouteLocationMatched) => {
      return routeMatch.path;
    }
  },
  // tab页签的标题，默认从路由meta.title中获取
  tabTitleKey: {
    type: String,
    default: 'title'
  }
});

interface Tab {
  tabKey?: string;
  title?: string;
  path?: string;
  hash?: string;
  query?: LocationQuery;
  params?: RouteParams;
  componentName?: string;
}

const route = useRoute();
const router = useRouter();
const tabs = ref<Tab[]>([]);
const curTabKey = ref('');
const { removeCacheEntry, removeCache, updataRouteKey, registerChange } = useRouteCache();
const tabType = computed(() => {
  return tabs.value.length < 2 ? 'card' : 'editable-card';
});
// 切换tab页签
function changeCurTab() {
  // 当前路由信息
  const { path, query, params, hash, matched } = route;

  // tab标签页路由信息：meta、componentName
  const routeMatch = matched[props.tabRouteViewDepth - 1];
  if (!routeMatch) return;
  const meta = routeMatch?.meta;
  const componentDef: any = routeMatch.components?.default;
  const componentName = componentDef?.name || componentDef?.__name;
  // 获取tab标签页信息：tabKey标签页key值；title-标签页标题；tab-存在的标签页
  const tabKey = props.getTabKey(routeMatch, route);
  const title = String(meta[props.tabTitleKey] || '');
  const tab = tabs.value.find((tab) => tab.tabKey === tabKey);

  if (['/login', '/err', '/redirect'].includes(path)) return; // 登录页、错误页、重定向页不添加tab标签页
  if (!tabKey) {
    // tabKey默认为路由的name值
    console.warn(`LayoutTabs组件：${path} 路由没有匹配的tab标签页，如有需要请配置tab标签页的key值`);
    return;
  }

  // 同一个路由，但是新旧路径不同时，需要清除路由缓存。例如route.path配置为 '/detail/:id'时路径会不同
  // 这里判断 props.tabRouteViewDepth === matched.length 必须是跟tab同级路由，否则会影响多级路由缓存
  if (tab && tab.path !== path && props.tabRouteViewDepth === matched.length) {
    removeCacheEntry(componentName || '');
    tab.title = '';
  }

  const newTab = {
    tabKey,
    title: tab?.title || title,
    path,
    params,
    query,
    hash,
    componentName
  };
  tab ? Object.assign(tab, newTab) : tabs.value.push(newTab);
  curTabKey.value = tabKey;
}
registerChange(changeCurTab);
// 点击tab
function clickTab(key: Key) {
  const tab = tabs.value.find((tab) => tab.tabKey === key);
  if (tab?.tabKey && tab.tabKey !== curTabKey.value) {
    curTabKey.value = tab.tabKey;
    gotoTab(tab);
  }
}

// 移除tab
async function removeTab(name: Key | MouseEvent | KeyboardEvent, action: 'add' | 'remove') {
  if (action === 'remove') {
    // 剩下一个时不能删
    if (tabs.value.length === 1) return;

    const index = tabs.value.findIndex((tab) => tab.tabKey === name);
    if (index < -1) return;

    const tab = tabs.value[index];
    tabs.value.splice(index, 1);

    // 当移除的是当前tab，则自动切换到最后一个tab（根据项目设置）
    if (tab.tabKey === curTabKey.value) {
      const lastTab = tabs.value[tabs.value.length - 1];
      lastTab && gotoTab(lastTab);
    }
    // 同时移除tab缓存
    removeCache(tab.componentName || '');
  }
}

// 跳转tab页面
async function gotoTab(tab: Tab) {
  await router.push({
    path: tab.path,
    query: tab.query,
    hash: tab.hash
  });
}

// 关闭非当前页的所有tab页签
function closeOtherTabs() {
  tabs.value
    .filter((tab) => tab.tabKey !== curTabKey.value)
    .forEach((tab) => {
      removeCache(tab.componentName || '');
    });
  tabs.value = tabs.value.filter((tab) => tab.tabKey === curTabKey.value);
}

// 默认执行一次切换tab
changeCurTab();
// 默认关闭当前tab
// async function closeLayoutTab(tabKey: string = curTabKey.value) {
//   const index = tabs.value.findIndex((tab) => tab.tabKey === tabKey);
//   if (index > -1) {
//     removeCache(tabs.value[index].componentName || '');
//     tabs.value.splice(index, 1);
//   }
// }

// function setCurTabTitle(title: string) {
//   const curTab = tabs.value.find((tab) => tab.tabKey === curTabKey.value);
//   if (curTab) {
//     curTab.title = title;
//   }
// }

// 对外提供的事件：关闭弹窗；设置tab标题
// EventBus.on('LayoutTabs:closeTab', (tabKey) => {
//   closeLayoutTab(tabKey);
// });
// EventBus.on('LayoutTabs:setTabTitle', (title) => {
//   setCurTabTitle(title);
// });
</script>

<style lang="less" scoped>
.layout-tabs :deep(.ant-tabs-content-holder) {
  display: none;
}

.layout-tabs :deep(.ant-tabs-nav) {
  margin-bottom: 0;
}

.layout-tabs {
  position: relative;
  // padding: 0 16px;
}

.close-tabs {
  position: absolute;
  top: 0;
  right: 0;
  padding: 12px;
  cursor: pointer;
  color: #999;
}
</style>
