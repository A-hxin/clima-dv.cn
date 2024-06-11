<template>
  <!-- 锥形柱图 ConicalBarChart-->

  <dv-conical-column-chart :config="ConicalBarChartConfig" style="width:700px;height:200px; padding: 30px" />
</template>
  
  
<script setup lang="ts">
import { ref } from "vue";
const ConicalBarChartConfig = ref();

ConicalBarChartConfig.value = {
  columnColor:'rgba(43,174,201, 0.4) rgba(135,176,77, 0.4)',
  textColor: '#fff',
  showValue: true,
  imgSideLength:30,
  fontSize: 17,
  data: [
    {
      name: '湄潭',
      value: 55
    },
    {
      name: '凤冈',
      value: 120
    },
    {
      name: '余庆',
      value: 71
    },
    {
      name: '正安',
      value: 66
    },
    {
      name: '道真',
      value: 80
    },
    {
      name: '务川',
      value: 35
    },
    {
      name: '桐梓',
      value: 15
    }
  ],
};
</script>