<template>
  <div class="logo" @click="$router.push('/')">
    <img class="logo-pic" src="../../assets/images/logo.png" :alt="appTitle" />
    <span v-if="!mini" class="logo-txt">{{ appTitle }}</span>
  </div>
</template>

<script lang="ts" setup>
import config from '@/config';

interface IProps {
  mini?: boolean;
}
withDefaults(defineProps<IProps>(), { mini: false });
const appTitle = config.appTitle;
</script>

<style scoped>
.logo {
  line-height: 32px;
  font-size: 24px;
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
}
.logo-txt {
  margin-left: 10px;
}
.logo-pic {
  width: 32px;
}
</style>
