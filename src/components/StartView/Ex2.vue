<script setup lang="ts">

import rowNumber from "/@/components/ThirdComponent/rowNumber.vue";
import NumBigBox from "/@/components/StartView/NumBigBox.vue";
</script>

<template>
  <div class="ex2Box">
    <NumBigBox title1="观测站数量" num1="174" title2="测量点数量" num2="6069" title3="数据源数量" num3="12"/>
    <rowNumber title1="极端天气事件" num1="1292" title2="高温记录" num2="892" title3="暴雨事件" num3="970" title4="台风记录" num4="1002" title5="雾霾记录" num5="692"/>
  </div>

</template>

<style scoped lang="scss">
.ex2Box{
  flex-direction: column;
  justify-content: center;
  height: 24vh;
}
</style>