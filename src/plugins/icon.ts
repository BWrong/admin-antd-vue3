import { App } from 'vue';
import { PlusOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CheckOutlined, SettingOutlined, DownOutlined } from '@ant-design/icons-vue';
const icons = [PlusOutlined, MenuFoldOutlined, MenuUnfoldOutlined, CheckOutlined, SettingOutlined, DownOutlined];
export default (app: App) => {
  icons.map((item) => app.component(item.name, item));
};
