<template>
  <!--第一个 -->
  <div class="big-index-1">
    <ul>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>登记用户数</p>
        <strong>174.6069</strong>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>登记用户数</p>
        <strong>174.6069</strong>
      </li>
      <li>
        <b class="animation-1"></b><b class="animation-2"></b
        ><b class="animation-3"></b>
        <p>登记用户数</p>
        <strong>174.6069</strong>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
/*引用字库*/
@font-face {
  font-family: "electronicFont";
  src: url("../../assets/font/DS-DIGIT.TTF");
}

/* 顶部大指标 */
.big-index-1 {
  text-align: center;
  position: absolute;
  left: -10px;
  top: 30px;
  line-height: 1;
  //min-width: 818px;
  height: 200px;
  overflow: hidden;
}

.big-index-1 li {
  transition: all 0.1s ease;
  cursor: pointer;
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 220px;
  height: 78px;
  padding: 10px 0 0 20px;
  background: url(../../assets/images/bg01bigindex.png);
  background-size: cover; /* 图片拉伸以填充整个元素 */
     background-position: center; /* 图片居中显示 */
  margin-right: 20px;
}

// 数字
.big-index-1 li strong {
  display: block;
  color: #fff;
  font-family: "electronicFont";
  font-size: 32px;
  font-weight: normal;
  //   top: -10px;
  margin-top: -8px;
  // margin-left: 38px;
}

// 标题
.big-index-1 li p {
  //   display: block;
  color: #b8babb;
  font-size: 15px;
  top: -10px;
  // margin-left: 60px;
}

.big-index-1 li .animation-1 {
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: bounceInLeft1;
  -webkit-animation-duration: 9000ms;
  position: absolute;
  left: 12px;
  bottom: 0px;
  height: 3px;
  width: 420px;
  background: url(../../assets/images/bg04bigindex.png) 0 0 repeat-x;
}

.big-index-1 li .animation-2 {
  position: absolute;
  right: 0;
  top: 1px;
  height: 111px;
  width: 15px;
  background: url(../../assets/images/bg02bigindex.png) 0 0 no-repeat;
}
.big-index-1 li .animation-3 {
  position: absolute;
  right: -1px;
  bottom: -1px;
  height: 111px;
  width: 4px;
  background: url(../../assets/images/bg03bigindex.png) 50% 50% no-repeat;
}

.big-index-1 li:hover .animation-2 {
  background: url(../../assets/images/bg02bigindex_.png) 0 0 no-repeat;
}

.big-index-1 li:hover .animation-3 {
  background: url(../../assets/images/bg03bigindex_.png) 50% 50% no-repeat;
}

.big-index-1 li:hover .animation-1 {
  -webkit-animation-iteration-count: infinite;
  -webkit-animation-name: bounceInRight1;
  -webkit-animation-duration: 4000ms;
}

.big-index-1 li:hover .animation-2,
.big-index-1 li:hover .animation-3 {
  -webkit-animation: flash 0.2s 0.2s ease both;
  -moz-animation: flash 0.2s 0.2s ease both;
}

@keyframes bounceInLeft1 {
  0% {
    -webkit-transform: translateX(-115px);
  }
  100% {
    -webkit-transform: translateX(0);
  }
}

@keyframes bounceInRight1 {
  0% {
    -webkit-transform: translateX(0);
  }
  100% {
    -webkit-transform: translateX(-115px);
  }
}
</style>



<script setup lang="ts">
import { ref, onMounted, toRef } from "vue";

onMounted(async () => {});
</script>
