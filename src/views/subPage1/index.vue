<template>
  <div class="bg-gray-100 p-4">
    <div class="space-x-4 mb-4 flex">
      <a-card id="card-1" class="flex flex-1 items-center justify-between rounded bg-white p-4 shadow">
        <div>
          <a-image src="https://picsum.photos/50/50" width="50" height="50" />
        </div>
        <div class="text-center">
          <div>参与项目数</div>
          <div class="text-2xl font-bold">59 ↑</div>
        </div>
      </a-card>
      <a-card id="card-2" class="flex flex-1 items-center justify-between rounded bg-white p-4 shadow">
        <div>
          <a-image src="https://picsum.photos/50/50" width="50" height="50" />
        </div>
        <div class="text-center">
          <div>近30天代码提交次数</div>
          <div class="text-2xl font-bold">59 ↑</div>
        </div>
      </a-card>
      <a-card id="card-3" class="flex flex-1 items-center justify-between rounded bg-white p-4 shadow">
        <div>
          <a-image src="https://picsum.photos/50/50" width="50" height="50" />
        </div>
        <div class="text-center">
          <div>登录次数</div>
          <div class="text-2xl font-bold">12 次</div>
        </div>
      </a-card>
    </div>

    <div class="mb-4 rounded bg-white p-4 shadow">
      <div class="mb-2 flex items-center justify-between">
        <div>代码提交趋势</div>
        <a-select id="select-1" class="w-32">
          <a-select-option value="2025-01">2025-01</a-select-option>
        </a-select>
      </div>
      <div id="chart-1" class="aspect-[16/9] min-h-[50px] w-full"></div>
    </div>

    <div class="mb-4 rounded bg-white p-4 shadow">
      <div class="mb-2 text-lg">统一项目管理</div>
      <div class="space-x-4 flex">
        <a-progress id="progress-1" type="dashboard" percent="93" />
        <a-progress id="progress-2" type="circle" percent="70" />
        <a-progress id="progress-3" type="circle" percent="60" />
        <div class="flex-1 rounded bg-white p-4 shadow">
          <div class="flex items-center justify-between">
            <div>产品投入总数</div>
            <a-select id="select-2" class="w-32">
              <a-select-option value="2025-01">2025-01</a-select-option>
            </a-select>
          </div>
          <div class="text-2xl font-bold">345 ↑</div>
          <div class="text-sm">产品投入率</div>
          <a-progress id="progress-4" percent="87" show-info="false" />
        </div>
      </div>
    </div>

    <div class="rounded bg-white p-4 shadow">
      <div class="mb-4 flex items-center justify-between">
        <div class="text-lg">我的反馈</div>
        <div class="space-x-4 flex">
          <a-input id="input-1" placeholder="反馈主题" />
          <a-select id="select-3" placeholder="反馈类型">
            <a-select-option value="类型1">类型1</a-select-option>
          </a-select>
          <a-select id="select-4" placeholder="状态">
            <a-select-option value="状态1">状态1</a-select-option>
          </a-select>
        </div>
      </div>
      <a-table :data-source="feedbackData" :columns="columns" row-key="id" />
    </div>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';

const feedbackData = ref([
  { id: 1, title: '这是一个反馈主题1', type: '类型1', content: '这是反馈内容', status: '已解决', time: '2023-01-01' },
  { id: 2, title: '这是一个反馈主题2', type: '类型2', content: '这是反馈内容', status: '未解决', time: '2023-01-02' },
  { id: 3, title: '这是一个反馈主题3', type: '类型3', content: '这是反馈内容', status: '处理中', time: '2023-01-03' },
]);

const columns = [
  { title: '反馈主题', dataIndex: 'title', key: 'title' },
  { title: '反馈类型', dataIndex: 'type', key: 'type' },
  { title: '反馈内容', dataIndex: 'content', key: 'content' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '反馈时间', dataIndex: 'time', key: 'time' },
  {
    title: '操作', key: 'action', slots: { customRender: 'action' },
  },
];

onMounted(() => {
  const chartDom = document.getElementById('chart-1');
  const myChart = echarts.init(chartDom);
  const option = {
    xAxis: { type: 'category', data: ['12-01', '12-02', '12-03', '12-04', '12-05'] },
    yAxis: { type: 'value' },
    series: [
      { data: [120, 200, 150, 80, 70], type: 'bar' },
      { data: [90, 150, 110, 60, 50], type: 'bar' }
    ],
  };
  myChart.setOption(option);
});
</script>

<style scoped></style>
