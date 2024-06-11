<template>
  <div id="dv-full-screen-container" ref="fullScreenContainer">
    <template v-if="state.ready">
      <slot />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import autoResize from '/@/utils/autoResize'

const fullScreenContainer = ref<HTMLElement | null>(null)

const state = reactive({
  allWidth: 0,
  scale: 0,
  datavRoot: '',
  ready: false,
})

const initConfig = () => {
  // const { width, height } = screen

  // 原始屏幕
  // let width = 7680
  // let height = 1080

  // 方便修改
  // let width = 2680
  // let height = 1080

  // 显示六个的
  // let width = 5800
  // let height = 1100

    // 显示3个的
  let width = 2900
  let height = 1300

  state.allWidth = width

  if (fullScreenContainer.value) {
    fullScreenContainer.value.style.width = `${width}px`
    fullScreenContainer.value.style.height = `${height}px`
  }
}

const setAppScale = () => {
  const currentWidth = document.body.clientWidth
  if (fullScreenContainer.value)
    fullScreenContainer.value.style.transform = `scale(${currentWidth / state.allWidth})`
  
}

const onResize = () => {
  setAppScale()
}

const afterAutoResizeMixinInit = () => {
  initConfig()
  setAppScale()

  state.ready = true
}

autoResize(fullScreenContainer, onResize, afterAutoResizeMixinInit)

</script>

<style lang="scss">
#dv-full-screen-container {
  position: fixed;
  top: 0px;
  left: 0px;
  overflow: hidden;
  transform-origin: left top;
  z-index: 999;
}
</style>
