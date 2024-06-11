<template>
  <div style="height: 24vh;">
    <div class="my_center" style="padding-top: 20px">
      <!-- 进度池 percentPondConfig-->
      <dv-percent-pond :config="percentPondConfig" class="my_pond" />
      <div>设计进度</div>
    </div>

    <div class="my_center">
      <!-- 进度池 percentPondConfig-->
      <dv-percent-pond :config="percentPondConfig" class="my_pond" />
      <div>工作进度</div>
    </div>

<!--    <div class="my_center">-->
<!--      &lt;!&ndash; 进度池 percentPondConfig&ndash;&gt;-->
<!--      <dv-percent-pond :config="percentPondConfig" class="my_pond" />-->
<!--      <div>修改进度</div>-->
<!--    </div>-->
  </div>
</template>

<style>
.my_center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 20px;
  font-size: 18px;
  color: #ffffffce;
}
.my_pond {
  width: 95px;
  height: 50px;
  margin-bottom: 8px;
}

/* 强制修改字体大小 */
.dv-percent-pond text {
  font-weight: bold;
  text-anchor: middle;
  dominant-baseline: middle;
  font-size: 24px !important; /* 设置字体大小为 16 像素 */
}
</style>
  
<script setup lang="ts">
import { ref } from "vue";
const percentPondConfig = ref();

percentPondConfig.value = {
  // 进度值，范围在 0 到 100 之间
  value: 66,
  // 线条间隙，数组中的两个数字分别表示实线长度和间隙长度
  lineDash: [6, 2],
  // 进度池配色，数组中的两个颜色分别表示起始颜色和结束颜色
  colors: ["#01c4f9", "#c135ff"],
  // 边框宽度
  borderWidth: 3,
  // 边框间隙
  borderGap: 3,
  // 文字颜色
  textColor: "#fff",
  // 字体大小
  fontSize: "1px", // 或者 '1em', '2rem' 等 CSS 单位
  // 边框半径
  borderRadius: 5,
  // 是否使用局部渐变
  localGradient: false,
  // 信息格式化字符串，{value} 将会被替换为实际的进度值
  formatter: "{value}%",
};
</script>