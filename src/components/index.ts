import { App } from 'vue';
import IconFont from './IconFont/index.vue';
import DeleteButton from './DeleteButton/index.vue';
import SearchButton from './SearchButton/index.vue';
import BasisTable from './BasisTable/index.vue';
export default (app: App) => {
  app.component('IconFont', IconFont);
  app.component('DeleteButton', DeleteButton);
  app.component('BasisTable', BasisTable);
  app.component('SearchButton', SearchButton);
};
