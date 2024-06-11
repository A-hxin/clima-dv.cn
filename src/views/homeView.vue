<script setup lang="ts">

import TopHeader from "/@/components/TopHeader/index.vue";
import TitleBox from "/@/components/StartView/TitleBox.vue";
import bidirectionalDiagram from "/@/components/SixthComponent/bidirectionalDiagram.vue";
import Ex2 from "/@/components/StartView/Ex2.vue";

import lineChart from "/@/components/SecondComponent/lineChart.vue";
import PieChart from "/@/components/SecondComponent/pieChart.vue";
import BarChart from "/@/components/SecondComponent/barChart.vue";
import LineTable from "/@/components/FirstComponent/lineTable.vue";
import InstrumentPanel from "/@/components/FifthComponent/instrumentPanel.vue";
import ScrollRankingChart from "/@/components/SixthComponent/scrollRankingChart.vue";
import CapsuleChart from "/@/components/FirstComponent/capsuleChart.vue";
import RadarChart from "/@/components/ThirdComponent/radarChart.vue";
import DataTransmission from "/@/components/FifthComponent/dataTransmission.vue";
</script>

<template>
  <rl-row :span="24">
    <TopHeader></TopHeader>
  </rl-row>
  <main class="solBox">
    <!-- 第一部分 -->
    <el-row :gutter="10">
      <!--      1-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <TitleBox title="广东地区的降水概率"/>
          <dv-border-box-8>
            <bidirectionalDiagram/>
          </dv-border-box-8>
        </div>
      </el-col>

      <!--      22-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <TitleBox title="实时气象数据"/>
          <dv-border-box-8>
            <Ex2/>
          </dv-border-box-8>
        </div>
      </el-col>

      <!--      33-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <TitleBox title="气象仪表盘"/>
          <dv-border-box-8>
            <instrumentPanel/>
          </dv-border-box-8>
        </div>
      </el-col>
    </el-row>

    <!-- 第二部分 -->
    <el-row :gutter="10">
      <!--      1-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <div class="grid-content ep-bg-purple">
            <TitleBox title="过去30天的气温统计"/>
            <dv-border-box-8>
              <capsuleChart/>
            </dv-border-box-8>
          </div>


        </div>
      </el-col>

      <!--      22-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <!--          <Sixth></Sixth>-->
          <TitleBox title="天气趋势图"/>
          <dv-border-box-8>
            <lineChart/>
          </dv-border-box-8>
        </div>
      </el-col>

      <!--      33-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <!--          <Sixth></Sixth>-->
          <TitleBox title="表格"/>
          <dv-border-box-8>
            <lineTable/>
          </dv-border-box-8>
        </div>
      </el-col>
    </el-row>

    <!-- 第三部分 -->
    <el-row :gutter="10">
      <!--      1-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">
          <el-row>
            <el-col :xs="12" :md="12" :lg="12">
              <div class="grid-content ep-bg-purple">
                <TitleBox title="过去30天的气温统计"/>
                <dv-border-box-8>
                  <radarChart/>
                </dv-border-box-8>
              </div>
            </el-col>

            <el-col :xs="12" :md="12" :lg="12">
              <div class="grid-content ep-bg-purple">
                <!--          <Sixth></Sixth>-->
                <TitleBox title="过去30天的降水统计"/>
                <dv-border-box-8>
                  <dataTransmission/>
                </dv-border-box-8>
              </div>
            </el-col>
          </el-row>
        </div>

      </el-col>

      <!--      22-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <el-row>
          <el-col :xs="12" :md="12" :lg="12">
            <div class="grid-content ep-bg-purple">
              <TitleBox title="过去30天的气温统计"/>
              <dv-border-box-8>
                <barChart/>
              </dv-border-box-8>
            </div>
          </el-col>

          <el-col :xs="12" :md="12" :lg="12">
            <div class="grid-content ep-bg-purple">
              <TitleBox title="过去30天的降水统计"/>
              <dv-border-box-8>
                <pieChart/>
              </dv-border-box-8>
            </div>
          </el-col>
        </el-row>


      </el-col>

      <!--      33-->
      <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <div class="grid-content ep-bg-purple">

          <div class="grid-content ep-bg-purple">
            <TitleBox title="过去30天的气温统计"/>
            <dv-border-box-8>
              <scrollRankingChart/>
            </dv-border-box-8>
          </div>
        </div>
      </el-col>
    </el-row>

  </main>
</template>

<style scoped lang="scss">
.solBox {
  margin-top: 20px;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  padding: 0 20px;
  //text-align: center;


  .el-col {
    border-radius: 4px;
    margin-bottom: 20px;
  }

  .grid-content {
    border-radius: 4px;
    //min-height: 28vh;
    //background-color: rgba(196, 177, 243, 0.38);
  }
}
</style>