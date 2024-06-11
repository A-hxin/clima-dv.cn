<template>
  <!-- 第一个 4 icon-->
  <div class="boxall">
    <ul class="flex">
      <li>
        <div class="bar1">
          <h3><span>轧机数量</span>1800个</h3>
        </div>
      </li>
      <li>
        <div class="bar1">
          <h3><span>炉子数量</span>1200个</h3>
        </div>
      </li>
      <li>
        <div class="bar1">
          <h3><span>钢筋数量 </span>1500个</h3>
        </div>
      </li>

    </ul>
  </div>
</template>

<style lang="scss" scoped>
li {
  list-style-type: none;
  padding: 13px;
  width: 200px;
}
.flex {
  height: 100px;
  display: flex;
  margin: 0;
  padding: 0;
}

// 颜色框
.boxall {
  margin-top: 0px;
  padding: 0px;
  // background: rgba(226, 106, 124, 0.5);
  margin-bottom: 0;
  height: 94px;
}



.bar1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url(../../assets/images/bg02.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
// icon
.bar1 img {
  width: 30px;
  margin-right: 10px;
}
// 标题
.bar1 span {
  color: #fff;
  font-size: 16px;
  display: block;
  font-weight: normal;
}
// 数字
.bar1 h3 {
  color: #fef000;
  font-size: 19px;
}


</style>


