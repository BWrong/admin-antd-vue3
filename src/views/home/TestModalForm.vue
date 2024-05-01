<template>
  <div>{{ title }}</div>
  <slot />
  <slot name="test" />
  <AForm :rules="rules" :model="formData" ref="formRef">
    <AFormItem name="name" label="名称">
      <AInput v-model:value="formData.name" />
    </AFormItem>
  </AForm>
</template>

<script setup lang="ts">
import type { FormInstance, FormProps } from 'ant-design-vue';

const { title = '' } = defineProps<{
  title?: string;
}>();
const formData = reactive({ name: '' });
const rules: FormProps['rules'] = {
  name: [
    {
      required: true,
      message: '请输入名称'
    }
  ]
};
const emits = defineEmits(['cancel', 'confirm', 'loading']);
const formRef = ref<FormInstance>();
defineExpose({
  async submit() {
    emits('loading', true);
    return formRef.value?.validate().then(async () => {
      await sleep(1000);
      emits('loading', false);
      return Promise.resolve(formData);
    });
  }
});
// 模拟异步
function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
// 测试获取应用的上下文
const router = useRouter();
const routes = useRoute();
const store = useRootStore();
console.log('childInstance:', getCurrentInstance());
console.log(router);
console.log(routes);
console.log(store);
</script>

<style scoped></style>
