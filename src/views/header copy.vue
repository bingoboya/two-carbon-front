<template>
  <div ref="headerComp" class="title_wrap">
    <div class="titleleft">
      <div>辽宁省本溪市</div>
      <div>晴</div>
      <div>{{ 21 }}-{{ 55 }}°C</div>
    </div>
    <div class="">
      <div class="title">
        <span class="title-text">企业典型工艺碳排放监测</span>
      </div>
    </div>
    <div class="timers">
      {{ dateData.dateYear }} {{ dateData.dateWeek }} {{ dateData.dateDay }}
      <div class="setting_icon"   @click="setSettingShow(true)">
          <img src="@/assets/img/headers/setting.png" alt="设置">
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import dayjs from 'dayjs';
import type {DateDataType} from "./index.d"
import {useSettingStore} from "@/stores/index"
import { gsap } from 'gsap';
const headerComp = ref<HTMLDivElement | null>(null)

const animateDivs = () => {
  console.log(1)
  if (headerComp.value) {
    gsap.from(headerComp.value, { y: -120, duration: 2 });
  }
  // if (leftDiv.value) {
  //   gsap.from(leftDiv.value, { x: -40, duration: 1 });
  // }
  // if (rightDiv.value) {
  //   gsap.from(rightDiv.value, { x: 40, duration: 1 });
  // }
  // if (bottomDiv.value) {
  //   gsap.from(bottomDiv.value, { y: 40, duration: 1 });
  // }
};
onMounted(() => {
  animateDivs();
});



const dateData = reactive<DateDataType>({
  dateDay: "",
  dateYear: "",
  dateWeek: "",
  timing:null
});

const { setSettingShow} =useSettingStore()
const weekday= ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
const timeFn = () => {
  dateData.timing = setInterval(() => {
    dateData.dateDay = dayjs().format("YYYY-MM-DD hh : mm : ss");
    dateData.dateWeek = weekday[dayjs().day()];
  }, 1000);
};
timeFn()
</script>
<style scoped lang="scss">
.title_wrap {
  // height: 60px;
  height: 120px;
  background-image: url("../assets/img/header_bg.png");
  // background-image: url("../assets/img/top.png");
  background-size: cover;
  background-position: center center;
  position: relative;
  margin-bottom: 4px;

  .guang {
    position: absolute;
    bottom: -26px;
    background-image: url("../assets/img/guang.png");
    background-position: 80px center;
    width: 100%;
    height: 56px;
  }
  .zuojuxing,
  .youjuxing {
    position: absolute;
    top: -2px;
    width: 140px;
    height: 6px;
    background-image: url("../assets/img/headers/juxing1.png");
  }
  .zuojuxing {
    left: 11%;
  }
  .youjuxing {
    right: 11%;
    transform: rotate(180deg);
  }
  .timers {
    position: absolute;
    right: 0;
    top: 2px;
    font-size: 18px;
    display: flex;
    align-items: center;

    .setting_icon {
      width: 20px;
      height: 20px;
      cursor: pointer;
      margin-left: 12px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
  .titleleft {
    position: absolute;
    left: 0;
    top: 2px;
    font-size: 18px;
    display: flex;
    align-items: center;
    display: flex; gap: 10px;
  }
}
.title {
  position: relative;
  // width: 500px;
  text-align: center;
  background-size: cover;
  color: transparent;
  height: 60px;
  line-height: 76px;

  .title-text {
    font-size: 32px;
    // text-shadow: 11px 0px 29px #042040;
    font-weight: 800;
    letter-spacing: 6px;
    width: 100%;
    background: linear-gradient(
      92deg,
      #0072ff 0%,
      #00eaff 48.8525390625%,
      #01aaff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
