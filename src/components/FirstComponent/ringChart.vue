<template>
  <!-- 动态环图 -->
  <div style="display: flex; font-size: 10px">
    <dv-active-ring-chart
      :config="ringConfig"
      style="width: 190px; height: 190px"
    />
    <dv-active-ring-chart
      :config="ringConfig"
      style="width: 190px; height: 190px"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const ringConfig = ref();

ringConfig.value = {
  digitalFlopStyle: {
    fontSize: 20,
    fill: "rgb(125,247,251)",
  },
  radius: "50%",
  activeRadius: "58%",
  lineWidth: 14,
  activeTimeGap: 2000,
  colors: [
    "linear-gradient(to right, rgba(130,102,228, 0.8), rgba(17,213,177, 0.8))",
    "linear-gradient(to right, rgba(17,213,177, 0.8), rgba(4,102,253, 0.8))",
    "linear-gradient(to right, rgba(4,102,253, 0.8), rgba(243,106,247, 0.8))",
    "linear-gradient(to right, rgba(243,106,247, 0.8), rgba(24,223,253, 0.8))",
    "linear-gradient(to right, rgba(24,223,253, 0.8), rgba(130,102,228, 0.8))",
  ],
  animationCurve: "easeInOutSine",
  data: [
    {
      name: "周口",
      value: 55,
    },
    {
      name: "南阳",
      value: 120,
    },
    {
      name: "西峡",
      value: 78,
    },
    {
      name: "驻马店",
      value: 66,
    },
    {
      name: "新乡",
      value: 80,
    },
  ],
};
</script>