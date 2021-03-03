import ConfigInput from './ConfigInput.vue';
import ConfigSwitch from './ConfigSwitch.vue';
export default [
  {
    value: 0,
    title: '文本类型',
    component: ConfigInput
  },
  {
    value: 1,
    title: '开关类型',
    component: ConfigSwitch
  }
];
