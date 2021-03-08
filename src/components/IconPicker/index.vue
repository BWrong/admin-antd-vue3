<template>
  <div class="icon-picker">
    <div class="icon-item" :class="{ active: value === item }" @click="$emit('update:value', item)" v-for="item in data" :key="item">
      <icon-font :type="item" class="icon-picker-icon" font-size="22px" />
      <span class="icon-picker-title" :title="item">{{ item }}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import data from './data.json';
export default defineComponent({
  name: 'IconPicker',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  emits: ['update:value'],
  setup() {
    return {
      data
    };
  }
});
</script>
<style lang="less" scoped>
.icon-picker {
  margin: 20px auto;
  .icon-item {
    display: inline-block;
    text-align: center;
    width: calc(33.3333% - 22px);
    vertical-align: top;
    margin: 5px;
    color: #666666;
    border-radius: 5px;
    padding: 5px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px dashed transparent;
    transition: all 0.5s ease;
    &.active {
      color: #fff;
      background-color: #1b90ff;
      &:hover {
        color: #fff;
      }
    }
    &:hover {
      color: #1b90ff;
    }
  }
  // .icon-picker-icon {
  //   font-size: 20px;
  //   padding-top: 5px;
  //   position: relative;
  //   z-index: 1;
  // }
  .icon-picker-title {
    display: block;
    line-height: 2;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 6px;
    position: relative;
    z-index: 1;
  }
  .icon-item:after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.1);
    transition: all 0.5s ease;
    border-radius: 50%;
    transform: scale(0.5);
    opacity: 0;
  }
  .icon-item:hover:after {
    border-radius: 0;
    opacity: 1;
    transform: scale(1);
  }
}
</style>
