<template>
  <div class="w-full flex flex-col items-center bg-gray-100">
    <!-- Statistics Cards -->
    <div class="w-full flex justify-around py-4">
      <a-card id="card-1" class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <a-image class="aspect-[1/1] w-12" src="https://picsum.photos/48/48" />
        <div class="text-xl font-semibold">参与项目数</div>
        <div class="text-2xl">59 ↑</div>
      </a-card>
      <a-card id="card-2" class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <a-image class="aspect-[1/1] w-12" src="https://picsum.photos/48/48" />
        <div class="text-xl font-semibold">近30天代码提交次数</div>
        <div class="text-2xl">59 ↑</div>
      </a-card>
      <a-card id="card-3" class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <a-image class="aspect-[1/1] w-12" src="https://picsum.photos/48/48" />
        <div class="text-xl font-semibold">登录次数</div>
        <div class="text-2xl">12 次</div>
      </a-card>
    </div>

    <!-- Code Commit Trend -->
    <div class="mt-4 w-full">
      <div id="chart-commit-trend" class="aspect-[2/1] min-h-[50px] w-full"></div>
    </div>

    <!-- Unified Project Management -->
    <div class="mt-4 w-full flex justify-around">
      <a-card id="progress-card-1"
        class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <div class="text-xl font-semibold">得分情况</div>
        <div id="chart-score" class="w-full h-32"></div>
      </a-card>
      <a-card id="progress-card-2"
        class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <div class="text-xl font-semibold">研发交付效率</div>
        <div id="chart-efficiency" class="w-full h-32"></div>
      </a-card>
      <a-card id="progress-card-3"
        class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <div class="text-xl font-semibold">里程碑及时更新率</div>
        <div id="chart-update-rate" class="w-full h-32"></div>
      </a-card>
      <a-card id="progress-card-4"
        class="aspect-[4/1] w-1/4 flex flex-col items-center justify-center bg-white shadow-md">
        <div class="text-xl font-semibold">产品投入总数</div>
        <div class="text-2xl">345 ↑</div>
        <a-progress percent="87" show-info />
      </a-card>
    </div>

    <!-- Feedback Table -->
    <a-table id="feedback-table" class="mt-4 w-full bg-white shadow-md" :data-source="feedbackData" :columns="columns">
      <template #bodyCell="{ text, record, index }">
        <span class="text-sm">{{ text }}</span>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

interface Feedback {
  topic: string;
  type: string;
  content: string;
  status: string;
  time: string;
  action: string;
}

const feedbackData: Feedback[] = [
  { topic: '这是一个反馈主题1', type: '类型1', content: '这是一个反馈内容', status: '已解决', time: '2025-01-01', action: '编辑 删除' },
  { topic: '这是一个反馈主题2', type: '类型2', content: '这是一个反馈内容', status: '未解决', time: '2025-01-02', action: '编辑 删除' },
  { topic: '这是一个反馈主题3', type: '类型3', content: '这是一个反馈内容', status: '处理中', time: '2025-01-03', action: '编辑 删除' },
];

const columns = [
  { title: '反馈主题', dataIndex: 'topic', key: 'topic' },
  { title: '反馈类型', dataIndex: 'type', key: 'type' },
  { title: '反馈内容', dataIndex: 'content', key: 'content' },
  { title: '状态', dataIndex: 'status', key: 'status' },
  { title: '反馈时间', dataIndex: 'time', key: 'time' },
  { title: '操作', dataIndex: 'action', key: 'action' },
];

onMounted(() => {
  const chartDom = document.getElementById('chart-commit-trend') as HTMLElement;
  const myChart = echarts.init(chartDom);
  const option = {
    tooltip: {},
    legend: {
      data: ['代码提交数', '项目数'],
    },
    xAxis: {
      type: 'category',
      data: ['12-01', '12-02', '12-03', '12-04', '12-05', '12-06', '12-07', '12-08', '12-09', '12-10', '12-11', '12-12', '12-13', '12-14', '12-15'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '代码提交数',
        type: 'bar',
        data: [120, 200, 150, 80, 70, 110, 130, 150, 160, 170, 180, 190, 200, 210, 220],
      },
      {
        name: '项目数',
        type: 'bar',
        data: [60, 80, 70, 50, 60, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
      },
    ],
  };
  myChart.setOption(option);

  const scoreChartDom = document.getElementById('chart-score') as HTMLElement;
  const scoreChart = echarts.init(scoreChartDom);
  const scoreOption = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 10
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 15,
          color: '#999',
          fontSize: 12
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 93
          }
        ]
      }
    ]
  };
  scoreChart.setOption(scoreOption);

  const efficiencyChartDom = document.getElementById('chart-efficiency') as HTMLElement;
  const efficiencyChart = echarts.init(efficiencyChartDom);
  const efficiencyOption = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 10
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 15,
          color: '#999',
          fontSize: 12
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 70
          }
        ]
      }
    ]
  };
  efficiencyChart.setOption(efficiencyOption);

  const updateRateChartDom = document.getElementById('chart-update-rate') as HTMLElement;
  const updateRateChart = echarts.init(updateRateChartDom);
  const updateRateOption = {
    series: [
      {
        type: 'gauge',
        progress: {
          show: true,
          width: 10
        },
        axisLine: {
          lineStyle: {
            width: 10
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          length: 10,
          lineStyle: {
            width: 2,
            color: '#999'
          }
        },
        axisLabel: {
          distance: 15,
          color: '#999',
          fontSize: 12
        },
        anchor: {
          show: true,
          showAbove: true,
          size: 25,
          itemStyle: {
            borderWidth: 10
          }
        },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, '70%']
        },
        data: [
          {
            value: 60
          }
        ]
      }
    ]
  };
  updateRateChart.setOption(updateRateOption);
});
</script>

<style></style>