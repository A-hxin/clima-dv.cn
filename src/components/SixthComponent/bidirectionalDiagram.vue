<template>
<!--   双向图 bidirectionalDiagram -->
  <div style="height: 24vh; margin-left: 20px;" ref="bidirectionalDiagramDOM"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as echarts from "echarts";

const bidirectionalDiagramDOM = ref();

// 初始化图表
async function initMap() {
  const myChart = echarts.init(bidirectionalDiagramDOM.value);

  const spNum = 5;
  const _max = 100;
  // const legendData = ["10月前", "11月", "12月"];
  const y_data = ["肇庆", "湛江", "韶关", "佛山", "汕头", "珠海", "深圳", "广州"];
  const _datamax = [100, 100, 100, 100, 100, 100, 100, 100];
  const _data1 = [10, 15, 10, 43, 15, 11, 29, 17];
  const _data2 = [19, 25, 40, 33, 15, 51, 27, 40];
  const _data3 = [21, 35, 30, 13, 35, 11, 19, 23];

  // 格式化函数
  const formatterFn = (v) => ((v.value / _max) * 100).toFixed(0) + "%";

  // 公共标签样式
  const labelStyle = {
    show: true,
    position: "inside",
    formatter: formatterFn,
    textStyle: {
      color: "#fff",
      fontSize: 10, // 柱状图里面的文字大小
    },
  };

  // 生成渐变色
  const createGradient = (colorStops) => ({
    type: 'linear',
    x: 0,
    y: 0,
    x2: 1,
    y2: 1,
    colorStops,
    global: false,
  });

  const option = {
    grid: {
      containLabel: true,
      top: 0,
      left: 0,
      right: 0,
      bottom: 10,
    },
    tooltip: {
      show: true,
      backgroundColor: "#fff",
      borderColor: "#ddd",
      borderWidth: 1,
      textStyle: {
        color: "#3c3c3c",
        fontSize: 10,
      },
      formatter: (p) => `
        名称：${p.seriesName}<br>
        完成：${p.value}<br>
        占比：${((p.value / _max) * 100).toFixed(0)}%
      `,
      extraCssText: "box-shadow: 0 0 5px rgba(0, 0, 0, 0.1)",
    },
    xAxis: {
      splitNumber: spNum,
      interval: _max / spNum,
      max: _max,
      axisLabel: {
        show: false,
        formatter: (v) => (v === 0 ? v : `${((v / _max) * 100).toFixed(0)}%`),
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { show: false },
    },
    yAxis: [
      {
        data: y_data,
        axisLabel: {
          fontSize: 10, // 字体大小
          color: "#fff",
        },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
      {
        show: false,
        data: y_data,
        axisLine: { show: false },
      },
    ],
    series: [
      {
        type: "bar",
        silent: true,
        yAxisIndex: 1,
        barGap: 10,
        itemStyle: {
          normal: {
            color: "rgba(255,255,255,0.1)",
          },
          emphasis: {
            color: "rgba(255,255,255,0.3)",
          },
        },
        data: _datamax,
      },
      {
        type: "bar",
        name: "10月前",
        stack: "2",
        label: { normal: labelStyle },
        legendHoverLink: false,
        barWidth: 10,
        barGap: 20,
        itemStyle: {
          normal: {
            color: createGradient([
              { offset: 0, color: '#9C58F6' },
              { offset: 1, color: '#6866F0' },
            ]),
          },
          emphasis: { color: "#9C58F6" },
        },
        data: _data1,
      },
      {
        type: "bar",
        name: "11月",
        stack: "2",
        legendHoverLink: false,
        barWidth: 20,
        barGap: 20,
        label: { normal: labelStyle },
        itemStyle: {
          normal: {
            color: createGradient([
              { offset: 0, color: '#3AB9F8' },
              { offset: 1, color: '#606EF2' },
            ]),
          },
          emphasis: { color: "#3BB6F8" },
        },
        data: _data2,
      },
      {
        type: "bar",
        name: "12月",
        stack: "2",
        legendHoverLink: false,
        barWidth: 20,
        barGap: 50,
        label: { normal: labelStyle },
        itemStyle: {
          normal: {
            color: createGradient([
              { offset: 0, color: '#65FDF0' },
              { offset: 1, color: '#2986AF' },
            ]),
          },
          emphasis: { color: "#61F5EC" },
        },
        data: _data3,
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>

<style scoped lang="scss">
/* 你可以在这里添加自定义样式 */
</style>
