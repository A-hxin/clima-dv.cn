<template>
  <full-screen-container class="container">
    <router-view></router-view>
  </full-screen-container>
</template>

<script setup lang="ts">
import FullScreenContainer from "/@/components/FullScreenContainer/index.vue";
</script>

<style scoped>
.container {
  background: url("/src/assets/big_bg01.png");
  background-size: cover;
  /* width: 7680px;
  height: 1080px; */
}
</style>
