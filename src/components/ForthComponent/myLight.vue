<template>
  <!-- fourStar -->
  <div >
    <div style="display: flex; margin-top: 10px">
      <div class="title_font">A区用电量:</div>
      <ul style="margin-left: -30px">
        <!-- <li class="yellow"></li> -->
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>

      </ul>
      <div class="title_font">1432度</div>
    </div>

    <div style="display: flex; margin-top: -10px">
      <div class="title_font">B区用电量:</div>
      <ul style="margin-left: -30px">
        <!-- <li class="yellow"></li> -->
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
      </ul>
      <div class="title_font">2432度</div>
    </div>

    <div style="display: flex; margin-top: -10px">
      <div class="title_font">C区用电量:</div>
      <ul style="margin-left: -30px">
        <!-- <li class="yellow"></li> -->
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="red"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="yellow"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class="green"></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
        <li class=""></li>
      </ul>
      <div class="title_font">1024度</div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.title_font {
  padding-top: 10px;
  padding-left: 10px;
  height: 100%;
}
.yellow {
  background: #ffbc00;
}

.red {
  background: #ff0000;
}

.green {
  background: #06d530;
  // background: #cad8dc60;
}

li {
  width: 3px;
  height: 25px;
  border-radius: 12px;
  background: #dadcdc;
  float: left;
  margin-left: 3px;
  list-style-type: none;
}

.title_font {
  font-size: 17px;
  margin-top: 10px;
  color: #fafafacd;
}
.box_water {
  margin-right: 20px;
}
</style>


