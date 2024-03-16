import { useRequestDevToolsPlugin } from 'vue-hooks-plus';

import type { App } from 'vue';

export default (app: App) => {
  // console.log(app);
  app.use(useRequestDevToolsPlugin);
};
