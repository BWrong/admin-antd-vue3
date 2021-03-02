import { App } from 'vue';
// 对首屏性能有要求的话，可以在使用的页面引入
import {
  ConfigProvider,
  Layout,
  Row,
  Col,
  List,
  Menu,
  Breadcrumb,
  Table,
  Button,
  Icon,
  Tabs,
  Steps,
  Tooltip,
  Modal,
  Form,
  Input,
  Spin,
  Card,
  Tag,
  message,
  Popconfirm,
  Checkbox,
  Switch,
  Radio,
  Carousel,
  Timeline,
  Badge,
  Avatar,
  Dropdown,
  Divider,
  Cascader,
  Tree,
  Select,
  Space,
  Popover,
  InputNumber,
  DatePicker,
  Descriptions
} from 'ant-design-vue';
import '@/assets/styles/rewrite.less';
export default (app: App): void => {
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$modal = Modal;
  app.use(ConfigProvider);
  app.use(Layout);
  app.use(Row);
  app.use(Col);
  app.use(List);
  app.use(Menu);
  app.use(Breadcrumb);
  app.use(Button);
  app.use(Table);
  app.use(Icon);
  app.use(Tabs);
  app.use(Steps);
  app.use(Tooltip);
  app.use(Modal);
  app.use(Form);
  app.use(Input);
  app.use(Spin);
  app.use(Card);
  app.use(Tag);
  app.use(Popconfirm);
  app.use(Checkbox);
  app.use(Switch);
  app.use(Radio);
  app.use(Carousel);
  app.use(Timeline);
  app.use(Badge);
  app.use(Avatar);
  app.use(Dropdown);
  app.use(Divider);
  app.use(Cascader);
  app.use(Tree);
  app.use(Select);
  app.use(Space);
  app.use(Popover);
  app.use(InputNumber);
  app.use(DatePicker);
  app.use(Descriptions);
};
