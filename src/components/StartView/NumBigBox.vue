<script setup lang="ts">
import {defineProps} from 'vue';

// 定义组件接收的参数
const props = defineProps<{
  title1: string;
  title2: string;
  title3: string;
  num1: number;
  num2: number;
  num3: number;
}>();
</script>

<template>
  <div class="container">
    <div class="Num-box">
      <p>{{title1}}</p>
      <p>{{num1}} <span class="minSet">个</span></p>
    </div>
    <div class="Num-box">
      <p>{{title2}}</p>
      <p>{{num2}} <span class="minSet">个</span></p>
    </div>
    <div class="Num-box">
      <p>{{title3}}</p>
      <p>{{num3}} <span class="minSet">个</span></p>
    </div>
  </div>

</template>

<style scoped lang="scss">
.container {
  display: flex;
  justify-content: center; /* 水平居中排列 */
  align-items: center; /* 垂直居中对齐 */
  gap: 20px; /* 盒子之间的间距 */
  padding: 20px 20px 10px 20px;
}

.Num-box {
  width: 140px;
  height: 60px;
  background: url(../../assets/images/bg01bigindex.png);
  background-size: 100%;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin: 0 auto;
  text-align: center;

  p {
    font-size: 10px;
    font-weight: normal;
    text-align: center;
    color: #fff;
    position: relative;
    top: 4px;
  }

  p:nth-child(2) {
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    color: #fff;
    position: relative;
    top: -13px;
  }
  .minSet{
    font-size: 10px;
    color:#7dfbfd;
  }
}
</style>
