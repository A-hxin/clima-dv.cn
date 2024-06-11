<template>
  <div class="alltitle">投诉信息</div>

  <div>
    <div class="area-text">
      <b class="animation-line1"></b>
      <span ref="myText" class="text title-print"> </span
      ><span class="easy-typed-cursor">|</span>
      <b class="animation-line2"></b>
    </div>
  </div>
</template>

<style>
/* 打字机样式 —— 闪烁 */
.easy-typed-cursor {
  margin-left: 3px;
  opacity: 1;
  -webkit-animation: blink 0.7s infinite;
  -moz-animation: blink 0.7s infinite;
  animation: blink 0.7s infinite;
}
@keyframes blink {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.title-print {
  letter-spacing: 0.5px;
  /* font-family: Mulish, -apple-system, "PingFang SC", "Microsoft YaHei",sans-serif; */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.9);

}

/* 标题 */
.alltitle {
  font-size: 20.5px;
  color: #fff;
  line-height: 29px;
  position: relative;
  padding-left: 17px;

}
.alltitle:before {
  position: absolute;
  height: 25px;
  width: 5px;
  background: #62f7ed;
  border-radius: 5px;
  content: "";
  left: 0;
  top: 50%;
  margin-top: -11px;
}

/* 内容框 */
.area-text {

  position: relative;
  height: 24vh;

  padding: 10px;
  font-size: 15px;
}
.area-text p {
  color: rgba(255, 255, 255, 0.6);
}
.area-text b {
  position: absolute;
  top: 0;
  display: block;
  width: 8px;

}

.animation-line1 {
  left: 0;
  background: url(../../assets/images_6/bg01righttext.png) center top no-repeat;
}
.animation-line2 {
  right: 0;
  background: url(../../assets/images_6/bg02righttext.png) center top no-repeat;
}
</style>
  
<script setup lang="ts">
import { ref, onMounted } from "vue";

const txt = [
  " 邻近工厂排放的废水严重污染了我们的饮用水源，对居民生活造成了严重影响。城市周边工厂乱倾倒化学废料，严重破坏了周边环境，对生态系统造成了严重破坏。",
  " 汽车尾气排放严重，导致城市道路周围环境空气质量下降，影响居民健康和行车安全。化工厂非法排放废水，导致附近河流水质严重污染，对当地水生态环境带来了极大威胁。",
];

const myText = ref<HTMLSpanElement | null>(null);
let index = 0;
let xiaBiao = 0;
let huan = true;

onMounted(() => {
  setInterval(() => {
    const myTextElement = myText.value;
    if (!myTextElement) {
      console.error("Target element is null.");
      return;
    }
    if (huan) {
      myTextElement.textContent = txt[xiaBiao].slice(1, ++index);
    } else {
      myTextElement.textContent = txt[xiaBiao].slice(1, index--);
    }

    if (index === txt[xiaBiao].length + 3) {
      huan = false;
    } else if (index < 0) {
      index = 0;
      huan = true;
      xiaBiao++;
      if (xiaBiao >= txt.length) {
        xiaBiao = 0;
      }
    }
  }, 200);
});

const scrollDown = () => {
  window.scrollTo({
    behavior: "smooth",
    top: document.documentElement.clientHeight,
  });
};
</script>