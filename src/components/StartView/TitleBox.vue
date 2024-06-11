<script setup lang="ts">
import {defineProps} from 'vue';

// 定义组件接收的参数
const props = defineProps<{
  title: string;
  probability: number;
}>();
</script>

<template>
  <dv-border-box-5>
    <div class="setTitle" >⭐️ {{ title }} {{ probability }}</div>
  </dv-border-box-5>
</template>

<style scoped lang="scss">
.setTitle {
  height: 35px;
  line-height: 35px;
  padding-left: 15px;
  //padding-top: 8px;
  font-size: 18px;
  font-weight: 700;
  color: #33ffff;
}
</style>
