import * as echarts from 'echarts';

declare module 'echarts/types/dist/shared' {
  interface SeriesOption {
    type?: 'liquidFill' | SeriesOption['type'];
  }
}

declare module 'echarts-liquidfill';

export = echarts;
