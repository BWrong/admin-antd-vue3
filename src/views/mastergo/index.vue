<!-- 代码已包含 CSS：使用 TailwindCSS , 安装 TailwindCSS 后方可看到布局样式效果 -->

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航 -->
    <header class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 flex items-center h-16">
        <div class="flex items-center flex-shrink-0">
          <img src="https://ai-public.mastergo.com/ai/img_res/0510ac8e34ea27ecd63aa87c8a161303.jpg" alt="Logo" class="h-8 w-8 object-contain" />
          <span class="ml-2 text-lg font-medium">甘肃电信能力中台</span>
        </div>
        <nav class="hidden md:ml-8 md:flex space-x-8">
          <a href="#" class="text-blue-600 px-3 py-2 text-sm font-medium">首页</a>
          <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">统一项目管理</a>
          <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">统一资源管理</a>
          <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">学习课程</a>
          <a href="#" class="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">研发规范</a>
        </nav>
        <div class="ml-auto flex items-center">
          <a-avatar class="bg-blue-500">
            <template #icon><UserOutlined /></template>
          </a-avatar>
        </div>
      </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 py-6">
      <!-- 数据概览卡片 -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <ProjectOutlined class="text-blue-600 text-xl" />
            </div>
            <div class="ml-4">
              <div class="text-sm text-gray-500">参与项目数</div>
              <div class="text-2xl font-semibold">59 个</div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <CodeOutlined class="text-green-600 text-xl" />
            </div>
            <div class="ml-4">
              <div class="text-sm text-gray-500">近30天代码提交次数</div>
              <div class="text-2xl font-semibold">59 次</div>
            </div>
          </div>
        </div>
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <LoginOutlined class="text-purple-600 text-xl" />
            </div>
            <div class="ml-4">
              <div class="text-sm text-gray-500">登录次数</div>
              <div class="text-2xl font-semibold">12 次</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 代码提交趋势图 -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-medium">代码提交趋势</h3>
          <a-select v-model:value="selectedMonth" style="width: 120px">
            <a-select-option value="2025-01">2025-01</a-select-option>
          </a-select>
        </div>
        <div ref="chartRef" style="width: 100%; height: 400px"></div>
      </div>

      <!-- 统一项目管理 -->
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium">统一项目管理</h3>
          <a-select v-model:value="selectedProjectMonth" style="width: 120px">
            <a-select-option value="2025-01">2025-01</a-select-option>
          </a-select>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="flex items-center justify-center">
            <div ref="scoreChartRef" style="width: 200px; height: 200px"></div>
          </div>
          <div class="flex items-center justify-center">
            <div ref="devChartRef" style="width: 200px; height: 200px"></div>
          </div>
          <div class="flex items-center justify-center">
            <div ref="updateChartRef" style="width: 200px; height: 200px"></div>
          </div>
          <div class="flex flex-col justify-center">
            <div class="mb-4">
              <div class="text-sm text-gray-500">产品接入总数</div>
              <div class="text-2xl font-semibold">345 个</div>
            </div>
            <div>
              <div class="text-sm text-gray-500">产品接入率</div>
              <div class="text-2xl font-semibold">87%</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 我的反馈 -->
      <div class="bg-white rounded-lg shadow p-6">
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-lg font-medium">我的反馈</h3>
          <a-select v-model:value="selectedFeedbackMonth" style="width: 120px">
            <a-select-option value="2025-01">2025-01</a-select-option>
          </a-select>
        </div>
        <a-table :columns="columns" :data-source="feedbackData" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag :color="getStatusColor(record.status)">{{ record.status }}</a-tag>
            </template>
            <template v-if="column.key === 'action'">
              <a-space>
                <a-button type="link" class="!rounded-button whitespace-nowrap">编辑</a-button>
                <a-button type="link" class="text-red-500 !rounded-button whitespace-nowrap">删除</a-button>
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
    </main>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
import { UserOutlined, ProjectOutlined, CodeOutlined, LoginOutlined } from '@ant-design/icons-vue';

const selectedMonth = ref('2025-01');
const selectedProjectMonth = ref('2025-01');
const selectedFeedbackMonth = ref('2025-01');
const chartRef = ref<HTMLElement | null>(null);
const scoreChartRef = ref<HTMLElement | null>(null);
const devChartRef = ref<HTMLElement | null>(null);
const updateChartRef = ref<HTMLElement | null>(null);

const columns = [
  {
    title: '反馈主题',
    dataIndex: 'theme',
    key: 'theme',
  },
  {
    title: '反馈类型',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: '反馈内容',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '反馈时间',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: '操作',
    key: 'action',
  },
];

const feedbackData = [
  {
    key: '1',
    theme: '系统功能优化建议',
    type: '功能建议',
    content: '建议增加批量导入功能',
    status: '已完成',
    time: '2025-01-15',
  },
  {
    key: '2',
    theme: '界面交互问题',
    type: '问题反馈',
    content: '数据加载较慢',
    status: '处理中',
    time: '2025-01-14',
  },
  {
    key: '3',
    theme: '新功能需求',
    type: '需求建议',
    content: '希望增加数据导出功能',
    status: '待处理',
    time: '2025-01-13',
  },
];

const getStatusColor = (status: string) => {
  const colorMap: Record<string, string> = {
    '已完成': 'success',
    '处理中': 'processing',
    '待处理': 'warning',
  };
  return colorMap[status] || 'default';
};

onMounted(() => {
  // 代码提交趋势图
  if (chartRef.value) {
    const chart = echarts.init(chartRef.value);
    chart.setOption({
      animation: false,
      tooltip: {
        trigger: 'axis',
      },
      xAxis: {
        type: 'category',
        data: Array.from({ length: 31 }, (_, i) => `12-${String(i + 1).padStart(2, '0')}`),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: '提交行数',
          type: 'bar',
          data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 300)),
          itemStyle: {
            color: '#60A5FA',
          },
        },
        {
          name: '删除行数',
          type: 'bar',
          data: Array.from({ length: 31 }, () => -Math.floor(Math.random() * 200)),
          itemStyle: {
            color: '#34D399',
          },
        },
      ],
    });
  }

  // 得分情况图表
  if (scoreChartRef.value) {
    const scoreChart = echarts.init(scoreChartRef.value);
    scoreChart.setOption({
      animation: false,
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: '#34D399',
            },
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, 0],
            fontSize: 24,
            formatter: '93分',
          },
          data: [{ value: 93 }],
        },
      ],
    });
  }

  // 研发云效率图表
  if (devChartRef.value) {
    const devChart = echarts.init(devChartRef.value);
    devChart.setOption({
      animation: false,
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: '#60A5FA',
            },
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, 0],
            fontSize: 24,
            formatter: '70%',
          },
          data: [{ value: 70 }],
        },
      ],
    });
  }

  // 更新率图表
  if (updateChartRef.value) {
    const updateChart = echarts.init(updateChartRef.value);
    updateChart.setOption({
      animation: false,
      series: [
        {
          type: 'gauge',
          startAngle: 90,
          endAngle: -270,
          pointer: { show: false },
          progress: {
            show: true,
            overlap: false,
            roundCap: true,
            clip: false,
            itemStyle: {
              color: '#818CF8',
            },
          },
          axisLine: {
            lineStyle: {
              width: 18,
            },
          },
          splitLine: { show: false },
          axisTick: { show: false },
          axisLabel: { show: false },
          detail: {
            valueAnimation: true,
            offsetCenter: [0, 0],
            fontSize: 24,
            formatter: '60%',
          },
          data: [{ value: 60 }],
        },
      ],
    });
  }
});
</script>

<style scoped>
/* 移除number input的箭头 */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>

