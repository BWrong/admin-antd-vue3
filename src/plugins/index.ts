import { App } from 'vue';
import antd from './antd';
import auth from './auth';

export default (app: App) => {
  app.use(antd);
  app.use(auth);
};
