<template>
  <div class="logo" @click="$router.push('/')">
    <img class="logo-pic" src="../../assets/images/logo.png" />
    <span class="logo-txt" v-if="!mini">{{ appTitle }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/config';
export default defineComponent({
  props: {
    mini: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {
      appTitle: config.appTitle
    };
  }
});
</script>

<style lang="less" scoped>
.logo {
  line-height: 32px;
  font-size: 24px;
  // width: 200px;
  // margin: 16px 10px;
  padding: 16px 0;
  font-weight: bold;
  color: #fff;
  white-space: nowrap;
  cursor: pointer;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
  .logo-pic {
    width: 32px;
  }
  .logo-txt {
    margin-left: 10px;
  }
}
</style>
