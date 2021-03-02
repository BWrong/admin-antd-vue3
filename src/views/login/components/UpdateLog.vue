<template>
  <div class="update-log">
    <a-timeline>
      <a-timeline-item v-for="(item, index) in log" :key="index">
        <a-card>
          <h4>{{ item.title }}</h4>
          <ul>
            <li class="detail" v-for="(i, k) in item.detail" :key="k">{{ i }}</li>
          </ul>
        </a-card>
      </a-timeline-item>
    </a-timeline>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  setup() {
    return {
      log: [
        {
          title: 'V0.0.2',
          detail: [
            '修复 Textarea 组件高度不正确问题',
            '回滚 Menu 组件到 1.6.5 版本一致',
            '修复 Menu 组件，错误展示 Tooltip 提示的问题',
            '修复 Textarea 组件高度不正确问题',
            '回滚 Menu 组件到 1.6.5 版本一致',
            '修复 Menu 组件，错误展示 Tooltip 提示的问题',
            '修复 Textarea 组件高度不正确问题',
            '回滚 Menu 组件到 1.6.5 版本一致',
            '修复 Menu 组件，错误展示 Tooltip 提示的问题'
          ]
        },
        {
          title: 'V0.0.1',
          detail: [
            '修复 Textarea 组件高度不正确问题',
            '回滚 Menu 组件到 1.6.5 版本一致',
            '修复 Menu 组件，错误展示 Tooltip 提示的问题',
            '修复 Textarea 组件高度不正确问题',
            '回滚 Menu 组件到 1.6.5 版本一致',
            '修复 Menu 组件，错误展示 Tooltip 提示的问题',
            '修复 Textarea 组件高度不正确问题',
            '回滚 Menu 组件到 1.6.5 版本一致',
            '修复 Menu 组件，错误展示 Tooltip 提示的问题'
          ]
        }
      ]
    };
  }
});
</script>

<style lang="less" scoped>
.update-log {
  padding: 10px;
  max-height: 50vh;
  overflow-y: auto;
}
.detail {
  text-indent: 0;
  margin-top: 10px;
}
</style>
