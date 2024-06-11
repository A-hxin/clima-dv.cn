<template>
  <!-- 散点图 scatterPlotDOM-->
  <div
    style="width: 365px; height: 330px; top: -20px"
    ref="scatterPlotDOM"
  ></div>
</template>


<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";
import * as echarts from "echarts";

const scatterPlotDOM = ref();

async function initMap() {
  var myChart = echarts.init(scatterPlotDOM.value);

  var plantCap = [
    {
      name: "发明",
      value: "78",
    },
    {
      name: "外观",
      value: "35",
    },
    {
      name: "商标",
      value: "31",
    },
    {
      name: "实用",
      value: "41",
    },
    {
      name: "超市",
      value: "30",
    },
    {
      name: "软件",
      value: "27",
    },
  ];
  var datalist = [
    {
      offset: [56, 48],
      symbolSize: 120,
      // opacity: .95,
      color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: '#37CCE2' // 渐变起始颜色
                },
                {
                    offset: 1,
                    color: '#14AAE5' // 渐变结束颜色
                }
            ],
            global: false // 缺省为 false
        }
    },
    {
      offset: [20, 80],
      symbolSize: 80,
      color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: '#F8C315' // 渐变起始颜色
                },
                {
                    offset: 1,
                    color: '#FB7C17' // 渐变结束颜色
                }
            ],
            global: false // 缺省为 false
        }
    },
    {
      offset: [10, 43],
      symbolSize: 60,
      color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: '#45DA86' // 渐变起始颜色
                },
                {
                    offset: 1,
                    color: '#16B8C1' // 渐变结束颜色
                }
            ],
            global: false // 缺省为 false
        }
    },
    {
      offset: [93, 25],
      symbolSize: 80,
      color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: '#3DB9F9' // 渐变起始颜色
                },
                {
                    offset: 1,
                    color: '#616DF2' // 渐变结束颜色
                }
            ],
            global: false // 缺省为 false
        }
    },
    {
      offset: [33, 16],
      symbolSize: 65,
      color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: '#F68740' // 渐变起始颜色
                },
                {
                    offset: 1,
                    color: '#DC2F70' // 渐变结束颜色
                }
            ],
            global: false // 缺省为 false
        }
    },
    {
      offset: [85, 80],
      symbolSize: 55,
      color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 1,
            colorStops: [{
                    offset: 0,
                    color: '#E171E7' // 渐变起始颜色
                },
                {
                    offset: 1,
                    color: '#742FC8' // 渐变结束颜色
                }
            ],
            global: false // 缺省为 false
        }
    },
  ];

  var datas = [];
  for (var i = 0; i < plantCap.length; i++) {
    var item = plantCap[i];
    var itemToStyle = datalist[i];
    datas.push({
      name: item.value + "\n" + item.name,
      value: itemToStyle.offset,
      symbolSize: itemToStyle.symbolSize,

      itemStyle: {
        normal: {
          color: itemToStyle.color,
          opacity: itemToStyle.opacity,
        },
      },
    });
  }
  var option = {
    grid: {
      show: false,
      top: 10,
      bottom: 10,
    },

    xAxis: [
      {
        gridIndex: 0,
        type: "value",
        show: false,
        min: 0,
        max: 100,
        nameLocation: "middle",
        nameGap: 5,
      },
    ],

    yAxis: [
      {
        gridIndex: 0,
        min: 0,
        show: false,
        max: 100,
        nameLocation: "middle",
        nameGap: 30,
      },
    ],
    series: [
      {
        type: "scatter",
        symbol: "circle",
        symbolSize: 400,
        label: {
          normal: {
            show: true,
            formatter: "{b}",
            color: "#FFF",
            textStyle: {
              fontSize: "18",
            },
          },
        },
        data: datas,
      },
    ],
  };

  myChart.setOption(option);
}

onMounted(async () => {
  await initMap();
});
</script>