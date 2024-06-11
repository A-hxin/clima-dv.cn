<template>
  <div>
    <ul class="sec">
      <li>
        <div>
          <p><img src="../../assets/images/icon4.png" />轧机压力</p>
          <div class="barnav">
            <div class="bar2"><span style="width: 80%"></span></div>
            <span>   2435</span>
          </div>
        </div>

        <div>
          <div class="zaf">
            <div style="margin-top: 18px;">同比</div>
            <div style="display: flex;">
              <div style="color: rgb(242,105,105);">50%</div>
              <div style=" top:-15px">
                <img src="../../assets/images_4/arrow_up.png" style="width: 20px;"/>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <div>
          <p><img src="../../assets/images/icon3.png" />钢水含量</p>
          <div class="barnav">
            <div class="bar2"><span style="width: 50%"></span></div>
            <span>   1948</span>
          </div>
        </div>

        <div>
          <div class="zaf">
            <div style="margin-top: 18px;">同比</div>
            <div style="display: flex;">
              <div style="color: rgb(242,105,105);">30%</div>
              <div style=" top:-15px">
                <img src="../../assets/images_4/arrow_up.png" style="width: 20px;"/>
              </div>
            </div>
          </div>
        </div>
      </li>

      <li>
        <div>
          <p><img src="../../assets/images/icon4.png" />钢筋产量</p>
          <div class="barnav">
            <div class="bar2"><span style="width: 30%"></span></div>
            <span>   1435</span>
          </div>
        </div>

        <div>
          <div class="zaf">
            <div style="margin-top: 18px;">同比</div>
            <div style="display: flex;">
              <div style="color: rgb(131,211,108);">10%</div>
              <div style=" top:-15px">
                <img src="../../assets/images_4/arrow_down.png" style="width: 20px;"/>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
</script>

<style lang="scss" scoped>
.sec{
  padding: 0;
  margin: 0;
  margin-left: 20px;
}
.sec li {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.sec li > div:nth-child(1) {
  width: 100%;
}
.sec li > div:nth-child(2) {
  width: 30%;
}
// 进度条长度
.sec .bar2 {
  width: 70%;
  margin: 3px 0;
  display: inline-block;
  vertical-align: middle;
  border: 1px solid #00deff;
  height: 13px;
  padding: 3px;
  border-radius: 10px;
}
.sec .bar2 span {
  display: block;
  height: 100%;
  background: linear-gradient(to right, #14b6ff, #9cefff);
  border-radius: 10px;
}

.sec p {
  display: flex;
  align-items: center;
  font-size: 17px;
  margin-bottom: 3px;
}
.sec p img {
  width: 20px;
  margin-right: 10px;
}

.zaf {
  padding-top: 10px;
  font-size: 16.5px;
}
</style>


