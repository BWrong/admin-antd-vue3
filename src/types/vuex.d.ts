// vuex.d.ts
import store from '@/store';
import { Store } from 'vuex';

declare module '@vue/runtime-core' {
  // 为useStore提供类型推断
  export function useStore(): typeof store;
  //  为 `this.$store` 提供类型声明
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
// declare module 'vuex' {
//   // 为useStore提供类型推断
//   export function useStore(): typeof store;
//   //  为 `this.$store` 提供类型声明
//   interface ComponentCustomProperties {
//     $store: Store<State>;
//   }
// }
