<template>
  <!-- fourStar -->

  <div class="boxall">
    <table>
      <tr>
        <td class="label-name">健康分值：</td>
        <td class="label-value">
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <div class="score-val">5分</div>
        </td>
        <td class="label-name">受理速度：</td>
        <td class="label-value">
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star2.png" />
          <div class="score-val">4.5分</div>
        </td>
      </tr>
      <tr>
        <td class="label-name">违规行为：</td>
        <td class="label-value">
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star3.png" />
          <div class="score-val">4分</div>
        </td>
        <td class="label-name">打分评级：</td>
        <td class="label-value">
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star3.png" />
          <img src="../../assets/images_4/star3.png" />
          <div class="score-val">3分</div>
        </td>
      </tr>
      <tr>
        <td class="label-name">违规行为：</td>
        <td class="label-value">
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star2.png" />
          <img src="../../assets/images_4/star3.png" />
          <div class="score-val">3.5分</div>
        </td>
        <td class="label-name">打分评级：</td>
        <td class="label-value">
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star1.png" />
          <img src="../../assets/images_4/star3.png" />
          <img src="../../assets/images_4/star3.png" />
          <div class="score-val">3分</div>
        </td>
      </tr>
    </table>
  </div>
</template>



<style lang="scss" scoped>

table {
  background: rgba(6, 48, 109, 0.3);
  width: 97%;
  padding: 20px;
  margin:10px;
  margin-top:0px;
}
img {
  height: 30px;
}

// 标题
.label-name{
  font-size: 21px;
}

// 标签 图片 + 分数
.label-value {
  padding-top: 10px;
  padding-left: 0px;
  color: #fff;
  margin-top: 3px;
}
.label-value img {
  float: left;
  width: 21px;
  height: 20px;
  margin-top: px;
}
.label-value .score-val {
  float: left;
  padding-left: 5px;
  height: 30px;
  line-height: 20px;
  color: #fff;
}
</style>


