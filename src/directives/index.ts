import { App } from 'vue';
import debounce from './debounce';
export default (app: App) => {
  app.directive('debounce', debounce);
};
