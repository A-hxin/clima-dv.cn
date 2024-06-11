<template>
  <div class="tit01">🌟 内容待定</div>

  <vue3-seamless-scroll :hover='true' :step="0.5" :list="list" class="scroll">
    <div class="item" v-for="(item, index) in list" :key="index">
      <span>{{item.title}}</span>
      <span>{{item.date}}</span>
      <span>{{item.date}}</span>
    </div>
  </vue3-seamless-scroll>
</template>
<script>
import { defineComponent, ref } from "vue";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";

export default defineComponent({
  name: "App",
  components: {
    Vue3SeamlessScroll
  },
  setup() {
    const list = ref([
      {
        title: "滚动数据第1条",
        date: Date.now(),
      },
      {
        title: "滚动数据第2条",
        date: Date.now(),
      },
      {
        title: "滚动数据第3条",
        date: Date.now(),
      },
      {
        title: "滚动数据第4条",
        date: Date.now(),
      },
      {
        title: "滚动数据第5条",
        date: Date.now(),
      },
    ]);
    return { list };
  },
});
</script>

<style>
.tit01 {
	background: linear-gradient(to right, rgba(48, 82, 174, 1), rgba(48, 82, 174, 0));
	color: #fff;
	font-size: 15px;
	padding: 0;
  margin-left: 25px;
}

.scroll {
  height: 80px;
  width: 300px;
  margin-left: 25px;
  margin-top: 13px;
  overflow: hidden;
  font-size: 10px;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 0;
}
</style>