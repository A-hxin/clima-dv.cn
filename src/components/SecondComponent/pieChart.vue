<template>
  <!-- 饼图 -->
  <div style="height: 24vh; top: -20px; left: 5px;" ref="pieChartDOM"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const pieChartDOM = ref();

async function initMap() {
  const myChart = echarts.init(pieChartDOM.value);

  const data = [
    { value: 434, name: "第四周", colors: ["rgb(89,253,193)", "rgb(48,214,231)"] },
    { value: 1548, name: "第三周", colors: ["rgb(37,210,234)", "rgb(8,209,255)"] },
    { value: 735, name: "第二周", colors: ["rgb(148,107,244)", "rgb(151,162,247)"] },
    { value: 510, name: "第一周", colors: ["rgb(61,185,249)", "rgb(98,106,241)"] },
  ];

  const seriesData = data.map(item => ({
    value: item.value,
    name: item.name,
    itemStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 0, color: item.colors[0] },
        { offset: 1, color: item.colors[1] },
      ]),
    },
    label: {
      color: item.colors[0],
      fontSize: 10, // 旁边小字
    },
  }));

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{b}:<br/> 降水量：{c} mm",

    },
    legend: {
      bottom: 10,
      left: "center",
      data: data.map(item => item.name),
      textStyle: {
        color: "white",
        fontSize: 6, // 底下标签修改
      },
    },
    series: [
      {
        type: "pie",
        radius: "55%",
        center: ["50%", "53%"],
        selectedMode: "single",
        data: seriesData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.02)",
          },
          label: {
            color: "white",
          },
        },
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
