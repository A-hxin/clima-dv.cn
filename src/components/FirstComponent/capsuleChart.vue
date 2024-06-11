<template>

    <!-- 胶囊柱图 -->
    <dv-capsule-chart :config="capsuleConfig" style="height:24vh" />

</template>

<script setup lang="ts">
import { ref } from 'vue';
const capsuleConfig = ref();

capsuleConfig.value = {
  radius: "60%",
  activeRadius: "65%",
  digitalFlopStyle: {
    fontSize: 16,
  },
  data: [{
      name: '南阳',
      value: 167
    },
    {
      name: '周口',
      value: 67
    },
    {
      name: '漯河',
      value: 123
    },
    {
      name: '郑州',
      value: 55
    },
    {
      name: '漯河',
      value: 123
    },
    {
      name: '郑州',
      value: 55
    },
    {
      name: '西峡',
      value: 98
    }
  ],

}
</script>