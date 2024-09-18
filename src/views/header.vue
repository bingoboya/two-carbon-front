<template>
  <div ref="headerComp" class="title_wrap" style="position: relative;user-select: none;">
    <VideoPlayer :elId="1" :videoSrc="'/src/assets/webm/t头部背景动效_无文字.webm'" />
    <!-- <VideoPlayer :elId="1" :videoSrc="'/src/assets/webm/headerbg.webm'" /> -->
    <div class="titleleft">
      <div>辽宁省本溪市</div>
      <div>晴</div>
      <div>{{ 21 }}-{{ 25 }}°C</div>
    </div>
    <div class="title_content">
      <div class="title">本钢典型工艺碳排放监测</div>
    </div>
    <div class="timers">
      <!-- {{ dateData.dateYear }}  -->
      <!-- {{ dateData.dateWeek }}  -->
      <span style="color: #58C2FF">{{ dateData.dateDay }}</span>
      <!-- <div class="setting_icon"   @click="setSettingShow(true)">
          <img src="@/assets/img/headers/setting.png" alt="设置">
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import dayjs from 'dayjs';
import VideoPlayer  from '@/components/VideoPlayer.vue';
import type {DateDataType} from "./index.d"
// import {useSettingStore} from "@/stores/index"
import { gsap } from 'gsap';
const headerComp = ref<HTMLDivElement | null>(null)

const animateDivs = () => {
  if (headerComp.value) {
    const height = headerComp.value.getBoundingClientRect().height; // x: -458
    gsap.from(headerComp.value, { y: -height, duration: 2 });
  }
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

// const { setSettingShow} =useSettingStore()
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
  height: 72px;
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
  .title_content {
    position: absolute;
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    .title {
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* 字体设置 */
      // font-family: 'Noto Sans SC', sans-serif;
      /* 文字渐变 */
      background: linear-gradient(to top, #95dbff, #ffffff);
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
      
      /* 文字阴影 */
      // text-shadow: 0 0 24px #021b2a;
      
      /* 其他样式 */
      font-weight: bold;
      font-size: 32px; /* 您可以根据需要调整字体大小 */
    }
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
