<template>
  <div class="x-sider">
    <a-menu class="menu-box" :theme="theme" mode="inline" :inline-collapsed="collapse" :selected-keys="selectedKeys" v-model:open-keys="localOpeneds">
      <template v-for="item in menus">
        <template v-if="!item.hide">
          <a-sub-menu :key="item.url" v-if="item.children && item.children.length >= 1">
            <template v-slot:title>
              <SettingOutlined />
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children">
              <a-menu-item :key="subItem.url" v-if="!subItem.hide">
                <router-link :to="subItem.url">
                  <!-- <a-icon :type="subItem.icon" class="menu-ico" v-if="subItem.icon" /> -->
                  <span>{{ subItem.name }}</span>
                </router-link>
              </a-menu-item>
            </template>
          </a-sub-menu>
          <a-menu-item :key="item.url" v-else>
            <router-link :to="item.url">
              <SettingOutlined />
              <span>{{ item.name }}</span>
            </router-link>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
  <!-- <div class="sider-trigger" @click="handleCollapse"><a-icon :type="collapse ? 'right' : 'left'" /></div> -->
</template>
<script>
import { SettingOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    SettingOutlined
  },
  data() {
    return {
      localOpeneds: []
    };
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    menus: {
      type: Array,
      required: true
    },
    openKeys: {
      type: Array,
      default: () => []
    },
    selectedKeys: {
      type: Array,
      default: () => []
    },
    theme: {
      type: String,
      default: 'dark'
    }
  },
  created() {
    this.$watch(
      'openKeys',
      (newVal) => {
        this.localOpeneds = newVal;
      },
      {
        immediate: true
      }
    );
  },
  methods: {
    handleCollapse() {
      this.$emit('update:collapse', !this.collapse);
    }
  }
};
</script>

<style lang="less" scoped>
.x-sider {
  width: 100%;
  /* height: 100vh; */
  overflow: hidden;
}

.menu-box {
  overflow-x: hidden;
  overflow-y: scroll;
  height: calc(100vh - 64px);
  width: calc(100% + 17px);
  // transition: width 0.5s ease;
}
// .menu-ico:not(:empty) {
//   color: $primary-color;
//   border: 1px solid $primary-color;
//   padding: 2px;
//   border-radius: 0 4px 4px 4px;
// }
.sider-trigger {
  position: absolute;
  width: 16px;
  height: 68px;
  line-height: 68px;
  right: -16px;
  top: 50%;
  color: @primary-color;
  background: #e6f7ff;
  cursor: pointer;
  z-index: 1;
}
</style>
<style>
.ant-menu-sub .ant-menu-item:before {
  content: '';
  display: block;
  width: 4px;
  height: 4px;
  background: #00479d;
  position: absolute;
  top: 50%;
  margin-left: -16px;
  margin-top: -2px;
}
.ant-menu-submenu-popup .ant-menu-item:before {
  display: none;
}
</style>
