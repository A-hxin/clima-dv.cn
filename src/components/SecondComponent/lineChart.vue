<template>
  <!-- 折线图 -->
  <div style="height: 24vh" ref="chartsDOM"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";

const chartsDOM = ref();

async function initMap() {
  var myChart = echarts.init(chartsDOM.value);
  // 显示 loading 动画
  myChart.showLoading();
  // 再得到数据的基础上，进行地图绘制
  myChart.hideLoading();
  var option = {
    color: ["#00DDFF", "#80FFA5"],
    title: {
      // text: "  🚀 车流量折线图 ",
      // left: 'center'
      // subtext: '每分钟数据'
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "10%",
      bottom: "10%",
      containLabel: true,
    },

    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#0C93B4",
        },
      },
      formatter: "{b}:<br/> 温度：{c0} °C<br/> 降水：{c1} mm",
    },
    legend: {
      data: [
        {
          name: "温度",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "whilt",
          },
        },
        {
          name: "降水",
          // 强制设置图形为圆。
          icon: "circle",
          // 设置文本为红色
          textStyle: {
            color: "whilt",
          },
        },
      ],
      bottom: -5,
    },
    xAxis: [
      {
        boundaryGap: false,
        type: "category",
        data: ["第一天", "第二天", "第三天", "第四天", "第五天", "第六天", "第七天"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        // name: "温度",
        type: "line",
        stack: "总量",
        type: "line",
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [28, 27, 26, 28, 29, 30, 31],
      },
      {
        // name: "降水",
        type: "line",
        stack: "总量",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [5, 10, 0, 7, 12, 9, 15],
      },
      {
        polyline: true,
        // showSymbol: false,
        name: "流动光线",
        type: "lines",
        smooth: true,
        coordinateSystem: "cartesian2d",
        effect: {
          delay: 100, // 延迟100ms开始流动
          trailLength: 0.5,
          show: true,
          period: 5,
          symbolSize: 4,
          loop: true,
        },
        lineStyle: {
          color: "#20db9df0",
          width: 0,
          opacity: 0,
          curveness: 0.5, // 设置曲率
          // type: "curve", // 设置为曲线
        },

        data: [
          {
            coords: [
              [0, 28],
              [1, 27],
              [2, 26],
              [3, 28],
              [4, 29],
              [5, 30],
              [6, 31],
            ],
          },
          {
            coords: [
              [0, 5],
              [1, 10],
              [2, 0],
              [3, 7],
              [4, 12],
              [5, 9],
              [6, 15],
            ],
          },
        ],
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
