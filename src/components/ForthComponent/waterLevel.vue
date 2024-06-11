<template>
  <!-- fourStar -->

  <div style="display: flex;">
    <div class="box_water" style="margin-left: 10px;">
      <dv-water-level-pond :config="waterLevelConfig" style="width:90px;height:90px" />
      <div class="title_font">用户体验</div>
    </div>
    <div class="box_water" >
      <dv-water-level-pond :config="waterLevelConfig" style="width:90px;height:90px" />
      <div class="title_font">可维护性</div>
    </div>
    <div class="box_water" >
      <dv-water-level-pond :config="waterLevelConfig" style="width:90px;height:90px" />
      <div class="title_font">可扩展性</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const waterLevelConfig = ref();

waterLevelConfig.value = {
  waveNum:1,
  waveHeight:10,
  waveOpacity:0.3,
  formatter: '{value}%',
  shape: 'round',
  fontSize: 10,
  data: [30],

}
</script>

<style lang="scss" scoped>
.title_font{
  font-size: 18px;
  margin-top: 10px;
  color: #fafafacd;
  margin-left: 8px;
}
.box_water{
  margin-right: 20px;
}
</style>


