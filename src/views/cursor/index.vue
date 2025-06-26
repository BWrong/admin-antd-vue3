<template>
  <div class="page-container">
    <!-- 顶部数据卡片 -->
    <div class="data-cards">
      <div class="data-card">
        <div class="card-icon">
          <ProjectOutlined />
        </div>
        <div class="card-content">
          <div class="card-title">参与项目数</div>
          <div class="card-value">{{ projectCount }}<span>个</span></div>
        </div>
      </div>
      <div class="data-card">
        <div class="card-icon">
          <CodeOutlined />
        </div>
        <div class="card-content">
          <div class="card-title">近30天代码交换数</div>
          <div class="card-value">{{ codeExchangeCount }}<span>次</span></div>
        </div>
      </div>
      <div class="data-card">
        <div class="card-icon">
          <UserOutlined />
        </div>
        <div class="card-content">
          <div class="card-title">登录次数</div>
          <div class="card-value">{{ loginCount }}<span>次</span></div>
        </div>
      </div>
    </div>

    <!-- 代码提交趋势图 -->
    <div class="trend-chart">
      <div class="chart-header">
        <h3>代码提交趋势</h3>
        <div class="date-select">
          <a-date-picker v-model:value="selectedMonth" picker="month" placeholder="选择月份" format="YYYY-MM"
            @change="handleMonthChange" />
        </div>
      </div>
      <div ref="chartRef" class="chart-container"></div>
    </div>

    <!-- 统计卡片 -->
    <div class="stat-cards">
      <div class="stat-card">
        <div class="stat-title">得分情况</div>
        <div class="stat-value">
          <div class="gauge-chart" ref="scoreGaugeRef"></div>
          <div class="stat-text">合格</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-title">研发云关联率</div>
        <div class="stat-value">
          <div class="liquid-chart" ref="devLiquidRef"></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-title">里程碑及时更新率</div>
        <div class="stat-value">
          <div class="liquid-chart" ref="updateLiquidRef"></div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-title">产品接入总数</div>
        <div class="stat-value">
          <div class="number">345<span>个</span></div>
          <div class="progress-bar">
            <a-progress :percent="87" :show-info="false" :stroke-color="'#A88AEF'" />
          </div>
          <div class="stat-text">产品接入率</div>
          <div class="percent">87%</div>
        </div>
      </div>
    </div>

    <!-- 反馈表格 -->
    <div class="feedback-table">
      <div class="table-header">
        <h3>我的反馈</h3>
        <div class="table-filters">
          <a-input v-model:value="searchKeyword" placeholder="请输入反馈主题" class="filter-item">
            <template #prefix>
              <SearchOutlined />
            </template>
          </a-input>
          <a-select v-model:value="feedbackType" placeholder="反馈类型" class="filter-item">
            <a-select-option value="">全部类型</a-select-option>
            <a-select-option value="1">类型一</a-select-option>
            <a-select-option value="2">类型二</a-select-option>
          </a-select>
          <a-select v-model:value="status" placeholder="状态" class="filter-item">
            <a-select-option value="">全部</a-select-option>
            <a-select-option value="1">已处理</a-select-option>
            <a-select-option value="2">处理中</a-select-option>
          </a-select>
          <a-date-picker v-model:value="selectedDate" picker="month" placeholder="选择月份" format="YYYY-MM"
            class="filter-item" />
        </div>
      </div>
      <a-table :data-source="tableData" :columns="columns" />
    </div>
  </div>
</template>

<script setup lang="tsx">
import {
  CodeOutlined,
  ProjectOutlined,
  SearchOutlined,
  UserOutlined
} from '@ant-design/icons-vue'
import type { EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

import 'echarts-liquidfill'

// 顶部卡片数据
const projectCount = ref(59)
const codeExchangeCount = ref(59)
const loginCount = ref(12)

// 图表相关
const chartRef = ref<HTMLElement>()
const scoreGaugeRef = ref<HTMLElement>()
const devLiquidRef = ref<HTMLElement>()
const updateLiquidRef = ref<HTMLElement>()
const selectedMonth = ref('')

// 表格相关
const searchKeyword = ref('')
const feedbackType = ref('')
const status = ref('')
const selectedDate = ref('')

// 表格列定义
const columns = [
  {
    title: '反馈主题',
    dataIndex: 'theme',
    key: 'theme'
  },
  {
    title: '反馈类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '反馈类别',
    dataIndex: 'category',
    key: 'category'
  },
  {
    title: '反馈内容',
    dataIndex: 'content',
    key: 'content'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    customRender: ({ text }: { text: string }) => (
      <a-tag color={text === '已处理' ? 'success' : 'warning'
      } >
        {text}
      </a-tag>
    )
  },
  {
    title: '反馈时间',
    dataIndex: 'time',
    key: 'time'
  },
  {
    title: '操作',
    key: 'action',
    customRender: () => (
      <>
        <a-button type="link" > 编辑 </a-button>
        <a-button type="link" danger > 删除 </a-button>
      </>
    )
  }
]

// 模拟表格数据
const tableData = ref([
  {
    key: '1',
    theme: '这是一段反馈主题字段',
    type: '这是一段反馈类型字段',
    category: '类型一',
    content: '这是一段反馈内容',
    status: '已处理',
    time: '这是一段反馈时间'
  },
  {
    key: '2',
    theme: '这是一段反馈主题字段',
    type: '这是一段反馈类型字段',
    category: '类型二',
    content: '这是一段反馈内容',
    status: '处理中',
    time: '这是一段反馈时间'
  }
])

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return

  const chart = echarts.init(chartRef.value)
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['提交订单', '退单订单']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: Array.from({ length: 31 }, (_, i) => `12-${String(i + 1).padStart(2, '0')}`)
    },
    yAxis: [
      {
        type: 'value',
        name: '数量',
        min: -400,
        max: 400,
        interval: 100
      }
    ],
    series: [
      {
        name: '提交订单',
        type: 'bar',
        data: Array.from({ length: 31 }, () => Math.floor(Math.random() * 300 + 100)),
        itemStyle: {
          color: '#1890ff'
        }
      },
      {
        name: '退单订单',
        type: 'bar',
        data: Array.from({ length: 31 }, () => -Math.floor(Math.random() * 300 + 100)),
        itemStyle: {
          color: '#52c41a'
        }
      }
    ]
  }

  chart.setOption(option)

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    chart.resize()
  })
}

// 月份变化处理
const handleMonthChange = () => {
  // 这里可以根据选择的月份重新获取数据
  initChart()
}

onMounted(() => {
  initChart()
  initStatCharts()
})

// 初始化统计卡片图表
const initStatCharts = () => {
  // 初始化得分情况仪表盘
  if (scoreGaugeRef.value) {
    const scoreGauge = echarts.init(scoreGaugeRef.value)
    const scoreOption: EChartsOption = {
      series: [{
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        radius: '100%',
        center: ['50%', '60%'],
        progress: {
          show: true,
          width: 18,
          itemStyle: {
            color: '#4DD88F'
          }
        },
        axisLine: {
          lineStyle: {
            width: 18,
            color: [
              [1, '#E6EBF8']
            ]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        anchor: {
          show: false
        },
        pointer: {
          show: false
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, 0],
          fontSize: 36,
          fontWeight: 'bold',
          formatter: '93',
          color: '#4DD88F'
        },
        data: [{
          value: 93
        }]
      }]
    }
    scoreGauge.setOption(scoreOption)
    window.addEventListener('resize', () => {
      scoreGauge.resize()
    })
  }

  // 初始化研发云关联率水球图
  if (devLiquidRef.value) {
    const devLiquid = echarts.init(devLiquidRef.value)
    const devOption = {
      series: [{
        type: 'liquidFill',
        radius: '80%',
        center: ['50%', '50%'],
        data: [0.7],
        itemStyle: {
          color: '#699EF5',
          opacity: 0.8
        },
        outline: {
          show: true,
          borderDistance: 3,
          itemStyle: {
            color: 'none',
            borderColor: '#699EF5',
            borderWidth: 2
          }
        },
        label: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#699EF5',
          insideColor: '#fff',
          formatter: '70%'
        },
        backgroundStyle: {
          color: '#E6EBF8'
        }
      }]
    }
    devLiquid.setOption(devOption as any)
    window.addEventListener('resize', () => {
      devLiquid.resize()
    })
  }

  // 初始化里程碑及时更新率水球图
  if (updateLiquidRef.value) {
    const updateLiquid = echarts.init(updateLiquidRef.value)
    const updateOption = {
      series: [{
        type: 'liquidFill',
        radius: '80%',
        center: ['50%', '50%'],
        data: [0.6],
        itemStyle: {
          color: '#699EF5',
          opacity: 0.8
        },
        outline: {
          show: true,
          borderDistance: 3,
          itemStyle: {
            color: 'none',
            borderColor: '#699EF5',
            borderWidth: 2
          }
        },
        label: {
          fontSize: 36,
          fontWeight: 'bold',
          color: '#699EF5',
          insideColor: '#fff',
          formatter: '60%'
        },
        backgroundStyle: {
          color: '#E6EBF8'
        }
      }]
    }
    updateLiquid.setOption(updateOption as any)
    window.addEventListener('resize', () => {
      updateLiquid.resize()
    })
  }
}
</script>

<style scoped lang="less">
.page-container {
  padding: 20px;
  background-color: #f0f2f5;
  min-height: 100vh;

  .data-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 20px;

    .data-card {
      background: #fff;
      padding: 20px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16);

      .card-icon {
        width: 48px;
        height: 48px;
        border-radius: 2px;
        background: #e6f7ff;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 16px;

        :deep(svg) {
          font-size: 24px;
          color: #1890ff;
        }
      }

      .card-content {
        .card-title {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-bottom: 8px;
        }

        .card-value {
          font-size: 24px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);

          span {
            font-size: 14px;
            margin-left: 4px;
          }
        }
      }
    }
  }

  .trend-chart {
    background: #fff;
    padding: 24px;
    border-radius: 2px;
    margin-bottom: 20px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16);

    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h3 {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }
    }

    .chart-container {
      height: 400px;
    }
  }

  .stat-cards {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;

    .stat-card {
      background: #fff;
      padding: 24px;
      border-radius: 2px;
      text-align: center;
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16);

      .stat-title {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
        margin-bottom: 16px;
        font-weight: 500;
      }

      .stat-value {
        display: flex;
        flex-direction: column;
        align-items: center;

        .gauge-chart,
        .liquid-chart {
          width: 140px;
          height: 140px;
          margin-bottom: 12px;
        }

        .number {
          font-size: 32px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.85);
          margin-bottom: 12px;

          span {
            font-size: 16px;
            margin-left: 4px;
          }
        }

        .progress-bar {
          width: 100%;
          margin: 12px 0;
        }

        .stat-text {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 8px;
        }

        .percent {
          font-size: 20px;
          font-weight: bold;
          color: #A88AEF;
          margin-top: 8px;
        }
      }
    }
  }

  .feedback-table {
    background: #fff;
    padding: 24px;
    border-radius: 2px;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16);

    .table-header {
      margin-bottom: 20px;

      h3 {
        margin: 0 0 16px;
        font-size: 16px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.85);
      }

      .table-filters {
        display: flex;
        gap: 16px;

        .filter-item {
          width: 200px;
        }
      }
    }
  }
}
</style>
