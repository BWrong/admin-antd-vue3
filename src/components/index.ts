import { App } from 'vue';
import DeleteButton from './DeleteButton/index.vue';
import SearchButton from './SearchButton/index.vue';
import BasisTable from './BasisTable/index.vue';
export default (app: App) => {
  app.component('DeleteButton', DeleteButton);
  app.component('BasisTable', BasisTable);
  app.component('SearchButton', SearchButton);
};
