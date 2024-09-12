<template>
  <div class="centermap">
    <div class="interactivefactorymap_wrap">
      <div class="center_wrapper" >

        <div class="item_wrap" style="position: relative;">
          <!-- <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;"> -->
            <div class="card_left" >
              <img style="width: 60px;" :src="'/src/assets/icon/co2_icon.png'" alt="">

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
          <!-- </div> -->
        </div>
        <div class="item_wrap" style="position: relative;">
          <!-- <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;"> -->
            <div class="card_left" >
              <img style="width: 60px;" :src="'/src/assets/icon/co2_icon.png'" alt="">

            </div>
            <div class="card_right">
              <div>总能耗</div>
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
          <!-- </div> -->
        </div>
        <div class="item_wrap" style="position: relative;">
          <!-- <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;"> -->
            <div class="card_left" >
              <img style="width: 60px;" :src="'/src/assets/icon/co2_icon.png'" alt="">

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
          <!-- </div> -->
        </div> 
      
      </div>
      <!-- ./mapdemo.webm 是public文件夹中的文件路径
          <InteractiveFactoryMap :videoSrc="'./mapdemo.webm'"/>
             或者 
          <InteractiveFactoryMap :videoSrc="'/src/assets/webm/gaolubg.webm'" />
      -->
      <InteractiveFactoryMap ref="InteractiveFactoryMapRef" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onUnmounted } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from '@/assets/icon/arrow_down_icon.png'
import arrow_top_icon from '@/assets/icon/arrow_top_icon.png'
import InteractiveFactoryMap from './InteractiveFactoryMap/index';
import AnimatedLoader from '@/components/AnimatedLoader.vue';
const duration = ref(2);
const InteractiveFactoryMapRef: any = ref(null)
const showInteractiveFactoryMap = ref(true)
const getChildRef = (name: any) => {
  // console.log('getChildRef', InteractiveFactoryMapRef.value.handlePopupClick)
  InteractiveFactoryMapRef.value.handlePopupClick(name)
}
onUnmounted(()=>{
  showInteractiveFactoryMap.value = false
})
defineExpose({
  getChildRef
})
</script>

<style scoped lang="scss">
.card_left {
  padding: 0 0px;width: 106px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;
}
.card_right {
  flex: 1; height: 100%;display: flex; flex-direction: column; justify-content: center;color: #fff;
} 
.center_wrapper {
  display: flex;
  // z-index: 2;
  flex-direction: row;
  gap: 20px;
  padding: 0 2px;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  .item_wrap {
    flex: 226;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100px;
    background-image: url('@/assets/bgpng/顶部前三个卡片bg.png');
    background-size: contain;
    background-repeat: round;
  }
  .item {
    flex: 226;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-image: url('@/assets/bgpng/顶部前三个卡片bg.png');
    background-size: contain;
    background-repeat: round;
  }
  .top_info_card {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: 100px;
    background-image: url('@/assets/bgpng/顶部最后一个卡片bg.png');
    background-size: contain;
    background-repeat: round;
  }
}
.centermap {
  position: relative;
  z-index: 1;
}
.interactivefactorymap_wrap {
  width: 100%; height: 100%; position: absolute; left: 50%;transform: translateX(-50%); 
}

</style>
