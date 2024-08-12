interface IMenu {
  id?: number;
  title: string;
  // path: string;
  url?: string;
  icon?: Iconfont;
  type?: number;
  hide?: boolean;
  children?: IMenu[];
  parentId?: number;
  permission?: string;
  priority?: number;
  isLink?: boolean;
  // [K: string]: any;
}
const menus: IMenu[] = [
  {
    id: 1,
    permission: 'home',
    title: '首页',
    type: 0,
    icon: 'icon-home',
    url: '/home',
    parentId: 0
  },
  {
    id: 2,
    permission: 'system',
    title: '系统管理',
    type: 0,
    icon: 'icon-setting',
    parentId: 0
  },
  {
    id: 3,
    permission: 'system/menu',
    title: '菜单管理',
    type: 0,
    icon: 'icon-menu',
    parentId: 2
  },
  {
    id: 4,
    title: '案例展示',
    type: 0,
    icon: 'icon-setting',
    parentId: 0
  },
  {
    id: 5,
    title: '外链页面',
    type: 0,
    icon: 'icon-menu',
    isLink: true,
    url: 'https://www.baidu.com',
    parentId: 4
  }
];
export default menus;
