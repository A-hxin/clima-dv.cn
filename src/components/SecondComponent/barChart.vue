<template>
  <!-- 折线图 -->
  <div style="height: 24vh; top:-20px" ref="barChartsDOM"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const barChartsDOM = ref();

async function initMap() {
  const myChart = echarts.init(barChartsDOM.value);

  const dataAxis = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
  const data = [23, 25, 24, 26, 27, 22, 28, 30, 29, 31, 32, 30, 27, 25, 28, 29, 31, 33, 32, 30, 28, 27, 26, 25, 24, 23, 22, 27, 29, 31];
  const yMax = 500;
  const dataShadow = Array(data.length).fill(yMax);

  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "rgba(53,112,210,1)",
        },
      },
      formatter: "{b}:<br/> 气温：{c} °C",
    },
    legend: {
      data: [{
        // name: "",
        icon: "circle",
        textStyle: {
          color: "white",
        },
      }],
      bottom: 0,
    },
    xAxis: {
      data: dataAxis,
      axisLabel: {
        color: "rgba(255,255,255,0.8)",
      },
    },
    yAxis: {
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: "rgba(255,255,255,0.8)",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      top: "20%",
      bottom: "0%",
      containLabel: true,
    },
    dataZoom: [
      {
        type: "inside",
      },
    ],
    series: [
      {
        name: "label1",
        type: "bar",
        showBackground: true,
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgb(0, 221, 255)" },
            { offset: 1, color: "rgb(77, 119, 255)" },
          ]),
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "#2378f7" },
              { offset: 0.7, color: "#2378f7" },
              { offset: 1, color: "#83bff6" },
            ]),
          },
        },
        data: data,
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
