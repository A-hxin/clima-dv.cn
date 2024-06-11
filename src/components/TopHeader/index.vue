<template>
  <div class="top-header">
    <div class="flex justify-center">
      <div class="dv-dec-10-s">
        <dv-decoration-10 />
      </div>
      <div class="flex justify-center">
        <dv-decoration-8 class="dv-dec-8" />
        <div class="title">
          <span class="title-text">大数据在气象预测中的应用</span>
          <dv-decoration-6 class="dv-dec-6" :reverse="true" :color="['#50e3c2', '#67a1e5']" />
        </div>
        <dv-decoration-8 class="dv-dec-8" :reverse="true" />
      </div>
      <div class="dv-dec-10">
        <dv-decoration-10 />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.flex {
  display: flex;
}

.justify-center {
  justify-content: center;
}

.top-header {
  padding-top: 1rem;

  .dv-dec-10,
  .dv-dec-10-s {
    width: 33.3%;
    height: 5px;
  }

  .dv-dec-10-s {
    transform: rotateY(180deg);
  }

  .dv-dec-8 {
    width: 200px;
    height: 50px;
  }

  .title {
    position: relative;
    width: 700px;
    text-align: center;
    background-size: cover;
    background-repeat: no-repeat;

    .title-text {
      font-size: 25px;
      position: absolute;
      bottom: 0;
      left: 50%;
      color: #fff;
      transform: translate(-50%);
    }

    .dv-dec-6 {
      position: absolute;
      top: 0px;
      left: 50%;
      width: 250px;
      height: 8px;
      transform: translate(-50%);
    }
  }

}
</style>