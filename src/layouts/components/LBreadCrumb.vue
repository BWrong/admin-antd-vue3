<template>
  <div class="breadcrumb-bar">
    <component class="trigger" :is="collapse ? 'MenuUnfoldOutlined' : 'MenuFoldOutlined'" @click="handleCollapse" />
    <a-breadcrumb separator=">" class="breadcrumb">
      <a-breadcrumb-item><router-link to="/">首页</router-link></a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in data" :key="item.id"
        ><router-link :to="item.url">{{ item.title }}</router-link></a-breadcrumb-item
      >
    </a-breadcrumb>
  </div>
</template>
<script>
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
export default {
  components: {
    MenuFoldOutlined,
    MenuUnfoldOutlined
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCollapse() {
      this.$emit('update:collapse', !this.collapse);
    }
  }
};
</script>
<style lang="less" scoped>
.breadcrumb-bar {
  display: flex;
  width: 100%;
  background-color: #fff;
  align-items: center;
}
.trigger {
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
  color: #666;
  padding: 0 10px;
  &:hover {
    color: #333;
  }
}
.breadcrumb {
  padding: 0 10px;
  line-height: 48px;
  .home-ico {
    color: #d1e9ff;
    margin-right: 8px;
  }
}
</style>
