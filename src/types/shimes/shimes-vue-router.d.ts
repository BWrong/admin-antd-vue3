import { RouteRecordRaw } from 'vue-router';
declare module 'vue-router' {
  interface RouteMeta {
    permission?: string;
    name?: string;
  }
  interface RouteRecordRaw extends RouteRecordRaw {
    meta: RouteMeta;
  }
}
