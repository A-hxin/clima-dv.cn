<script setup lang="ts">
import { defineProps } from 'vue';

// 定义组件接收的参数
const props = defineProps<{
  title1: string;
  title2: string;
  title3: string;
  title4: string;
  title5: string;
  num1: number;
  num2: number;
  num3: number;
  num4: number;
  num5: number;
}>();

const titles = [props.title1, props.title2, props.title3, props.title4, props.title5];
const nums = [props.num1, props.num2, props.num3, props.num4, props.num5];
const colors = ['purple', 'grn', 'bule', 'yel', 'org'];
</script>

<template>
  <div class="column">
    <div class="numBox" v-for="(title, index) in titles" :key="index">
      <p>{{ title }}</p>
      <p ><span :class="colors[index]">{{ nums[index] }}次</span></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column {
  display: flex;
  flex-wrap: wrap; /* 允许子元素换行 */
  justify-content: center; /* 水平居中排列 */
  align-items: center; /* 垂直居中对齐 */
  gap: 20px; /* 盒子之间的间距 */
  margin-top: 20px;

  .numBox {
    border: 1px solid #252e44;
    text-align: center;
    width: 80px;
    height: 60px;

    p {
      font-size: 12px;
      font-weight: normal;
      text-align: center;
      color: #fff;
      position: relative;
      top: -5px;
    }
    p:nth-child(2) {
      font-size: 20px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      position: relative;
      top: -22px;
    }
  }
}

.hbule {
  color: #86b5d2;
}
.purple {
  color: #8129dd;
}
.grn {
  color: #8ec63f;
}
.bule {
  color: #2756ca;
}
.yel {
  color: #f1b601;
}
.org {
  color: #f86423;
}
.ybule {
  color: #27aae3;
}
</style>
