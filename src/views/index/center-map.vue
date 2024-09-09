<template>
  <div class="centermap">
    <div class="interactivefactorymap_wrap">
      <div v-if="!false" class="center_wrapper" >

        <div class="item_wrap" style="position: relative;">
          <VideoPlayer :elId="10" :videoSrc="'/src/assets/webm/e顶部卡片短背景.webm'" />
          <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;">
            <div style="padding: 0 0px;width: 76px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;" >
              <AnimatedLoader :iconSrc="'/src/assets/webm/co2_icon.png'" />
            </div>
            <div class="card_right">
              <div>总碳排放量</div>
              <div style="display: flex;gap: 10px;">
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div style="color: gray">万吨</div>
              </div>
              <div style="display: flex;">
                <div>同比</div>
                <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
                  <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div style="color: gray">%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item_wrap" style="position: relative;">
          <VideoPlayer :elId="11" :videoSrc="'/src/assets/webm/e顶部卡片短背景.webm'" />
          <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;">
            <div style="padding: 0 0px;width: 76px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;" >
              <AnimatedLoader :iconSrc="'/src/assets/icon/icon2.png'" />
            </div>
            <div class="card_right">
              <div>耗电量</div>
              <div style="display: flex;gap: 10px;">
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div style="color: gray">万吨</div>
              </div>
              <div style="display: flex;">
                <div>同比</div>
                <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
                  <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div style="color: gray">%</div>
              </div>
            </div>
          </div>
        </div>
        <div class="item_wrap" style="position: relative;">
          <VideoPlayer :elId="12" :videoSrc="'/src/assets/webm/e顶部卡片短背景.webm'" />
          <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;">
            <div style="padding: 0 0px;width: 76px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;" >
              <AnimatedLoader :iconSrc="'/src/assets/webm/co2_icon.png'" />
            </div>
            <div class="card_right">
              <div>电碳耦合度</div>
              <div style="display: flex;gap: 10px;">
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div style="color: gray">万吨</div>
              </div>
              <div style="display: flex;">
                <div>同比</div>
                <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
                  <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div style="color: gray">%</div>
              </div>
            </div>
          </div>
        </div> 
        <div class="top_info_card" style="flex: 266;position: relative;">
          <VideoPlayer :elId="13" :videoSrc="'/src/assets/webm/e顶部卡片长背景.webm'" />
          <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;">
            <div style="padding: 0 0px;width: 76px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;" >
              <AnimatedLoader :iconSrc="'/src/assets/webm/co2_icon.png'" />
            </div>
            <div class="card_right" >
              <div style="display: flex; gap: 8px;">
                <div>当前绿证价格</div>
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div style="color: gray">元</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <div>近半年最低价</div>
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div style="color: gray">元</div>
              </div>
            </div>
          </div>
        </div>


        <!-- <div class="item top_info_card">
          <div style="padding: 0 10px;"><img style="width:62px;" :src="icon6" alt=""></div>
          <div class="card_right" >
            <div>耗电量</div>
            <div style="display: flex;gap: 10px;">
              <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
              <div style="color: gray">万吨</div>
            </div>
            <div style="display: flex;">
              <div>同比</div>
              <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
                <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
              </div>
              <div style="color: gray">%</div>
            </div>
          </div>
        </div>
        <div class="item top_info_card">
          <div style="padding: 0 10px;"><img style="width:62px;" :src="icon6" alt=""></div>
          <div class="card_right">
            <div>电碳耦合度</div>
            <div style="display: flex;gap: 10px;">
              <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
              <div style="color: gray">万吨</div>
            </div>
            <div style="display: flex;">
              <div>同比</div>
              <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
                <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
              </div>
              <div style="color: gray">%</div>
            </div>
          </div>
        </div> 
        <div class="item top_info_card" style="flex: 266;">
          <div style="padding: 0 10px;"><img style="width:62px;" :src="icon6" alt=""></div>
          <div class="card_right">
            <div style="display: flex; gap: 8px;">
              <div>当前绿证价格</div>
              <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
              <div style="color: gray">元</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <div>近半年最低价</div>
              <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
              <div style="color: gray">元</div>
            </div>
            
          </div>
        </div> -->
      </div>
      <!-- ./mapdemo.webm 是public文件夹中的文件路径
          <InteractiveFactoryMap :videoSrc="'./mapdemo.webm'"/>
             或者 
          <InteractiveFactoryMap :videoSrc="'/src/assets/webm/gaolubg.webm'" />
      -->
      <InteractiveFactoryMap v-if="!false" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from '@/assets/icon/arrow_down_icon.png'
import arrow_top_icon from '@/assets/icon/arrow_top_icon.png'
import InteractiveFactoryMap from '@/components/InteractiveFactoryMap';
import AnimatedLoader from './AnimatedLoader.vue';
import VideoPlayer  from '@/components/VideoPlayer.vue';
const duration = ref(2);
const showInteractiveFactoryMap = ref(true)
onUnmounted(()=>{
  showInteractiveFactoryMap.value = false
})
</script>

<style scoped lang="scss">
.card_right {
  flex: 1; height: 100%;display: flex; flex-direction: column; justify-content: center;gap: 8px;
} 
.center_wrapper {
  display: flex;
  z-index: 2;
  flex-direction: row;
  gap: 20px;
  padding: 0 2px;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  .item_wrap {
    flex: 226;
    display: flex;
    flex-direction: row;
    // background-color: rgba(0, 0, 0, 0.432);
    // justify-content: center;
    align-items: center;
    height: 100px;
    // background-image: url('@/assets/icon/top_card_bg.png');
    // background-size: contain;
    // background-repeat: round;
  }
  .item {
    flex: 226;
    display: flex;
    flex-direction: row;
    // background-color: rgba(0, 0, 0, 0.432);
    justify-content: center;
    align-items: center;
    height: 100px;
    background-image: url('@/assets/icon/top_card_bg.png');
    background-size: contain;
    background-repeat: round;
  }
  .top_info_card {
    display: flex;
    flex-direction: row;
    // background-color: rgba(0, 0, 0, 0.432);
    justify-content: center;
    align-items: center;
    height: 100px;
    // background-image: url('@/assets/icon/top_card_bg.png');
    // background-size: contain;
    // background-repeat: round;
  }
}
.centermap {
  position: relative;
}
.interactivefactorymap_wrap {
  width: 100%; height: 100%; position: absolute; left: 50%;transform: translateX(-50%); 
  // background-color: #836d6d73;
}

</style>
