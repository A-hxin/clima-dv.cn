<template>
  <!-- 仪表盘 instrument Panel.vue-->
  <div style="height: 24vh;" ref="instrumentPanelDOM"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import * as echarts from "echarts";

const instrumentPanelDOM = ref();

async function initMap() {
  const myChart = echarts.init(instrumentPanelDOM.value);

  const dataValue1 = '28°C';
  const dataValue2 = '70%';
  const dataValue3 = '15 km/h';
  const dataColor = {
    pieMini: "#ffca1c", //小圆形颜色
    pieMiniMini: "#fff", //小小圆形颜色
    piePlus: "#5DD1FA", //大圆形颜色
    value: "#687284", //底部数值颜色
  };

  const commonDetail = (value) => ({
    formatter: () => value,
    offsetCenter: [0, "70%"],
    textStyle: {
      padding: [0, 0, 80, 0],
      fontSize: 28,
      fontWeight: "700",
      color: dataColor.value,
    },
  });

  const commonSeries = (center, color, value) => ({
    type: "gauge",
    center,
    radius: "70%",
    splitNumber: 10,
    axisLine: {
      lineStyle: {
        color: [[1, color], [1, "#111F42"]],
        width: 8,
      },
    },
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    itemStyle: { show: false },
    detail: commonDetail(value),
    title: {
      color: "#fff",
      fontSize: 15,
      offsetCenter: [0, "-25%"],
    },
    data: [{
      value: 0, // Placeholder value since it's replaced by `commonDetail` text
    }],
    pointer: {
      show: false,
      length: "75%",
      width: 20, //指针粗细
    },
  });

  const option = {
    title: [
      {
        text: "温度",
        top: "45%",
        left: "16%",
        padding: [0, 0],
        textStyle: {
          color: "#fff",
          fontSize: 25,
          align: "center",
        },
      },
      {
        text: "湿度",
        left: "center",
        top: "45%",
        padding: [0, 0],
        textStyle: {
          color: "#fff",
          fontSize: 25,
          align: "center",
        },
      },
      {
        text: "风速",
        top: "45%",
        left: "76%",
        padding: [0, 0],
        textStyle: {
          color: "#fff",
          fontSize: 25,
          align: "center",
        },
      },
    ],
    series: [
      {
        name: "刻度1",
        type: "gauge",
        radius: "70%",
        min: 0,
        max: 100,
        splitNumber: 10,
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: [[1, "rgba(0,0,0,0)"]],
          },
        },
        axisLabel: {
          show: true,
          color: "#4d5bd1",
          distance: 25,
          formatter: (v) => `${v}`,
        },
        axisTick: {
          show: true,
          splitNumber: 7,
          lineStyle: {
            color: "#5c53de",
            width: 1,
          },
          length: -8,
        },
        splitLine: {
          show: true,
          length: -20,
          lineStyle: {
            color: "#5c53de",
          },
        },
        detail: { show: false },
        pointer: { show: false },
      },
      {
        name: "仪表盘1",
        ...commonSeries(["50%", "50%"], "#BF18FE", dataValue1),
      },
      {
        name: "刻度2",
        type: "gauge",
        center: ["20%", "50%"],
        radius: "70%",
        min: 0,
        max: 100,
        splitNumber: 10,
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: [[1, "rgba(0,0,0,0)"]],
          },
        },
        axisLabel: {
          show: true,
          color: "#2baecb90",
          distance: 25,
          formatter: (v) => `${v}`,
        },
        axisTick: {
          show: true,
          splitNumber: 7,
          lineStyle: {
            color: "#2baecb90",
            width: 1,
          },
          length: -8,
        },
        splitLine: {
          show: true,
          length: -20,
          lineStyle: {
            color: "#2baecb90",
          },
        },
        detail: { show: false },
        pointer: { show: false },
      },
      {
        name: "仪表盘2",
        ...commonSeries(["20%", "50%"], "#279EBC", dataValue2),
      },
      {
        name: "刻度3",
        type: "gauge",
        center: ["80%", "50%"],
        radius: "70%",
        min: 0,
        max: 100,
        splitNumber: 10,
        startAngle: 225,
        endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: [[1, "rgba(0,0,0,0)"]],
          },
        },
        axisLabel: {
          show: true,
          color: "#33ba8684",
          distance: 25,
          formatter: (v) => `${v}`,
        },
        axisTick: {
          show: true,
          splitNumber: 7,
          lineStyle: {
            color: "#33ba8684",
            width: 1,
          },
          length: -8,
        },
        splitLine: {
          show: true,
          length: -20,
          lineStyle: {
            color: "#33ba8684",
          },
        },
        detail: { show: false },
        pointer: { show: false },
      },
      {
        name: "仪表盘3",
        ...commonSeries(["80%", "50%"], "#33BA86", dataValue3),
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>
