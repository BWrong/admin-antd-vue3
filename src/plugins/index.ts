import { App } from 'vue';
import antd from './antd';
import icon from './icon';
import auth from './auth';

export default (app: App) => {
  app.use(antd);
  app.use(icon);
  app.use(auth);
};
