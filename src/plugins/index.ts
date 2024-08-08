import type { App } from 'vue';
import { useRequestDevToolsPlugin } from 'vue-hooks-plus';

export default (app: App) => {
  // console.log(app);
  app.use(useRequestDevToolsPlugin);
};
