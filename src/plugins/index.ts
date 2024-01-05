import vueRequest from './vueRequest';

import type { App } from 'vue';

export default (app: App) => {
  // console.log(app);
  app.use(vueRequest);
};
