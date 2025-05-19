<template>
  <a-modal title="主题设置" :open="props.open" :keyboard="false" :mask-closable="false" @cancel="handleCancel"
    :footer="false">
    <a-form ref="formRef" class="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
      <a-form-item label="配色方案">
        <a-radio-group :value="themeOptions.colorScheme" size="small">
          <a-radio-button :value="item.name" :key="item.name" v-for="item in themes"
            @click="e => handleColorScheme(e, item.name as ColorScheme)">
            <a-tooltip :title="item.title">
              <IconFont :type="item.icon" />
            </a-tooltip>
          </a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item label="主题色调">
        <div class="flex items-center">
          <span v-for="item in colorList" :key="item" class="m-1 inline-block h-4 w-4 cursor-pointer rounded-full"
            :class="{ '!rounded-[3px]': themeOptions.themeToken?.colorPrimary === item }"
            :style="{ backgroundColor: item as string }" @click="handleSetColor(item)" />
        </div>
      </a-form-item>
      <a-form-item label="紧凑模式">
        <a-switch v-model:checked="themeOptions.isCompact" @change="handleSetCompact" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import type { RadioChangeEvent, SwitchProps } from 'ant-design-vue';

interface IProps {
  open?: boolean;
}
const props = withDefaults(defineProps<IProps>(), { open: false });
const emit = defineEmits(['update:open']);
function handleCancel() {
  emit('update:open', false);
}
const themes = ref([
  {
    name: 'auto',
    title: '跟随系统',
    icon: 'icon-system'
  },
  {
    name: 'light',
    title: '浅色模式',
    icon: 'icon-taiyangtianqi'
  },
  {
    name: 'dark',
    title: '深色模式',
    icon: 'icon-moonyueliang'
  }
]);
const { setTheme, themeOptions } = useTheme();
function handleColorScheme(e: MouseEvent, colorScheme: ColorScheme) {
  // 获取到 transition API 实例
  const transition = document.startViewTransition(() => {
    document.documentElement.classList.toggle('dark')
  })
  // 在 transition.ready 的 Promise 完成后，执行自定义动画
  transition.ready.then(() => {
    // 由于我们要从鼠标点击的位置开始做动画，所以我们需要先获取到鼠标的位置
    const { clientX, clientY } = e
    // 计算半径，以鼠标点击的位置为圆心，到四个角的距离中最大的那个作为半径
    const radius = Math.hypot(
      Math.max(clientX, innerWidth - clientX),
      Math.max(clientY, innerHeight - clientY)
    )
    const clipPath = [
      `circle(0% at ${clientX}px ${clientY}px)`,
      `circle(${radius}px at ${clientX}px ${clientY}px)`
    ]
    const isDark = document.documentElement.classList.contains('dark')
    // 自定义动画
    document.documentElement.animate(
      {
        // 如果要切换到暗色主题，我们在过渡的时候从半径 100% 的圆开始，到 0% 的圆结束
        clipPath: isDark ? clipPath.reverse() : clipPath
      },
      {
        duration: 500,
        // 如果要切换到暗色主题，我们应该裁剪 view-transition-old(root) 的内容
        pseudoElement: isDark
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)'
      }
    )
    setTheme({ colorScheme });
  })
}
const colorList = ['#1890ff', '#52c41a', '#faad14', '#ff4d4f'];
function handleSetColor(color: string) {
  setTheme({
    themeToken: {
      ...themeOptions.themeToken,
      colorPrimary: color
    }
  });
}
function handleSetCompact(isCompact: SwitchProps['checked']) {
  setTheme({ isCompact: !!isCompact });
}
</script>
