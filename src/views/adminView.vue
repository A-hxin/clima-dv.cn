<template>
  <div class="home-container">
    <!-- 标题 -->
    <TopHeader></TopHeader>

    <div class="flex" style="margin-top: 40px; margin-left: 20px">
      <!-- 第一个 -->
      <div class="mr-20" style="margin-left: 60px">
        <First></First>
      </div>

      <!-- 第二个 -->
      <div class="mr-20" style="margin-left: 40px">
        <Second></Second>
      </div>

      <!-- 第三个 -->
      <div class="mr-20" style="margin-left: 40px">
        <Third></Third>
      </div>


      <!-- 第四个 -->
      <div class="mr-20" style="margin-left: 40px">
        <Forth></Forth>
      </div>

      <!-- 第五个 -->
      <div class="mr-20" style="margin-left: 40px">
        <Fifth></Fifth>
      </div>

      <!-- 第六个 -->
      <div class="mr-20" style="margin-left: 40px">
        <Sixth></Sixth>
      </div>



    </div>
  </div>
</template>

<script lang="ts" setup>


// 第一個
import First from "/@/components/FirstComponent/index.vue";
import Second from "/@/components/SecondComponent/index.vue";
import Third from "/@/components/ThirdComponent/index.vue";

import Forth from "/@/components/ForthComponent/index.vue";
import Fifth from "/@/components/FifthComponent/index.vue";
import Sixth from "/@/components/SixthComponent/index.vue";

import TopHeader from "/@/components/TopHeader/index.vue";

</script>
<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>

