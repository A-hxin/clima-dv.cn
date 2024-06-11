<template>
  <!-- 雷达图 -->
  <div style="height: 24vh;" ref="radarChartsDOM"></div>
  <!-- 雷达扫描射线 -->
  <div id="radar"></div>
</template>


<style lang="scss" scoped>
/* 雷达扫描射线 */
.right {
  width: 100%;
  height: 100%;
  position: relative;
}

#radar:after {
  content: "";
  display: block;
  background-image: linear-gradient(
          44deg,
          rgba(0, 255, 51, 0) 50%,
          #3efde3 100%
  );
  width: 35.5%;
  height: 35.5%;
  position: absolute;
  top: 12.5%;
  right: 50%;
  animation: radar-beam 15s infinite;
  animation-timing-function: linear;
  transform-origin: bottom right;
  border-radius: 100% 0 0 0;
}

@keyframes radar-beam {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import * as echarts from "echarts";

const radarChartsDOM = ref();

async function initMap() {
  var myChart = echarts.init(radarChartsDOM.value);

  var option = {
    shape: "circle", // 设置雷达图形状，值有circle、square,默认为方形
    tooltip: {
      trigger: "axis",
    },
    radar: {
      indicator: [
        {
          name: "冒险",
          max: 10,
          num: 102,
        },
        {
          name: "市场",
          max: 10,
          num: 10,
        },
        {
          name: "娱乐",
          max: 10,
          num: 10,
        },
        {
          name: "书籍",
          max: 10,
          num: 10,
        },
        {
          name: "考察",
          max: 10,
          num: 10,
        },
        {
          name: "其他",
          max: 10,
          num: 10,
        },
      ],

      splitNumber: 4,
      nameGap: 10,    // 调整轴线标签与雷达图的距离
      shape: "circle", // 设置雷达图形状，值有circle、square,默认为方形
      axisLine: {
        //指向外圈文本的分隔线样式
        lineStyle: {
          color: "#e0f2f5b2",
        },
      },
      splitLine: {
        lineStyle: {
          color: ["#e0f2f5b2"],
          width: 1,
        },
      },
      splitArea: {
        areaStyle: {
          color: ["transparent"],
        },
      },
      name: {
        margin: 0,
        color: "#0ed0ee",
        textStyle: {
          fontSize: 12, // 设置轴线标签文字大小为14像素
        },
      },
    },
    series: [
      {
        name: "日程平均耗时",
        type: "radar",
        tooltip: {
          trigger: "item",
        },
        symbol: "none",
        shape: "circle", // 设置雷达图形状，值有circle、square,默认为方形
        itemStyle: {
          normal: {
            color: "#4be8ddb2",
            borderColor: "#4be8ddb2",
          },
        },
        areaStyle: {
          color: ["#4be8ddb2"],
          opacity: 0.7,
        },

        data: [
          {
            value: [8, 6, 9, 8, 9, 7],
            symbol: "none",
            areaStyle: {color: "rgba(71,237,252,.3)"},
            lineStyle: {
              color: "#47EDFC",
              width: 1,
            },
            label: {
              show: true,
              formatter: function (params) {
                return params.value;
              },
            },
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
