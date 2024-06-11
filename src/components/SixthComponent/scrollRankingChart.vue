<template>
  <!-- 排名 -->
  <dv-scroll-ranking-board
    :config="scrollRankingconfig"
    style="height: 24vh;"
  />
</template>


<script setup lang="ts">
import { ref } from "vue";
const scrollRankingconfig = ref();

scrollRankingconfig.value = {
  data: [
    {
      name: "湄潭",
      value: 167,
    },
    {
      name: "绥阳",
      value: 67,
    },
    {
      name: "正安",
      value: 123,
    },
    {
      name: "余庆",
      value: 55,
    },
    {
      name: "习水",
      value: 123,
    },
    {
      name: "播州区",
      value: 55,
    },
    {
      name: "红花岗区",
      value: 98,
    },
  ],
};
</script>

<style>
.dv-scroll-ranking-board .ranking-column .inside-column {
  background:  linear-gradient(to right, #3CB5F8, #60F3EB) !important;
}

.dv-scroll-ranking-board .ranking-info .rank {
  color: #3DB3F7 !important;
}

</style>
