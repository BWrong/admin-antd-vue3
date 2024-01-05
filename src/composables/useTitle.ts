import { ref, type Ref, watch } from 'vue';

type TMaybeRef<T> = Ref<T> | T;
export default (newTitle?: TMaybeRef<string | null | undefined>) => {
  const title = ref(newTitle || document.title);
  watch(title, (t) => t && (document.title = t), { immediate: true });
  return title;
};
// 设置title：useTitle('newTitle') 或 useTitle().value= ’newTitle‘
// 获取title（响应式的）：useTitle().value
