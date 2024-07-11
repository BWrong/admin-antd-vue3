import { onActivated, type App } from 'vue';
import { onBeforeRouteLeave } from 'vue-router';

let gobalScrollBox = 'html'; // 全局滚动盒子
/**
 * 配置滚动盒子
 * @param scrollBox
 */
export function configKeepScroll(scrollBox: string) {
  gobalScrollBox = scrollBox;
}
/**
 * 保持滚动位置（组件内使用）
 * @param scrollBox
 */
export function useKeepScroll(scrollBox?: string) {
  let pos = [0, 0];
  let scroller: HTMLElement | null;

  onActivated(() => {
    scroller = document.querySelector(scrollBox || gobalScrollBox);
    if (!scroller) {
      console.warn(`useKeepScroll: 未找到 ${scrollBox || gobalScrollBox} Dom滚动容器`);
      return;
    }
    scroller.scrollTop = pos[0];
    scroller.scrollLeft = pos[1];
  });

  onBeforeRouteLeave(() => {
    if (scroller) {
      pos = [scroller.scrollTop, scroller.scrollLeft];
    }
  });
}
/**
 * 保持滚动位置（全局使用）
 * @example 1.app.use(keepScroll, 'html') // 'html' 为滚动容器的css选择器，
 * @example 2. <component :is="Component" keep-scroll /> // 在需要的组件上添加keep-scroll属性
 * @param app
 * @param scrollBox
 */
export function installKeepScroll(app: App, scrollBox = 'html') {
  app.mixin({
    created() {
      if ('keep-scroll' in this.$attrs) {
        onBeforeRouteLeave(() => {
          const scroller = document.querySelector(scrollBox);
          if (scroller) {
            this.$_top = scroller.scrollTop;
            this.$_left = scroller.scrollLeft;
          }
        });
      }
    },
    activated() {
      if ('keep-scroll' in this.$attrs) {
        const scroller = document.querySelector(scrollBox);
        if (scroller) {
          scroller.scrollTop = this.$_top;
          scroller.scrollLeft = this.$_left;
        }
      }
    }
  });
}
