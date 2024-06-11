<template>
  <!-- 第一个 4 icon-->
  <div class="boxall">
    <ul class="flex h100">
      <li>
        <div class="bar1">
          <img src="../../assets/images/icon1.png" />
          <h3><span>字段名称</span>200个</h3>
        </div>
      </li>
      <li>
        <div class="bar1">
          <img src="../../assets/images/icon2.png" />
          <h3><span>字段名称</span>1200个</h3>
        </div>
      </li>
      <li>
        <div class="bar1">
          <img src="../../assets/images/icon3.png" />
          <h3><span>字段名称 </span>150家</h3>
        </div>
      </li>
	  <li>
        <div class="bar1">
          <img src="../../assets/images/icon4.png" />
          <h3><span>字段名称 </span>150家</h3>
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
  display: flex;
  margin: 0;
  padding: 0;
}
.h100 {
  height: 100px;
}
// 颜色框
.boxall {
  padding: 0px;
//   background: rgba(6, 48, 109, 0.5);
  margin-bottom: 0;
  height: 120px;
}



.bar1 {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background: url(../../assets/images/bg01.png) no-repeat;
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
  font-size: 20px;
  display: block;
  font-weight: normal;
}
// 数字
.bar1 h3 {
  color: #fef000;
  font-size: 20px;
}


</style>


