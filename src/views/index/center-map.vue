<template>
  <div class="centermap">
    <div class="interactivefactorymap_wrap">
      <div class="center_wrapper" >

        <div class="item_wrap" style="position: relative;">
            <div class="card_left"  >
              <AnimatedLoader :iconSrc="'/src/assets/newicon/co2_icon.png'" />
            </div>
            <div class="card_right">
              <div >总碳排放量</div>
              <div style="display: flex;gap: 6px;">
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div class="card_unit" >万吨</div>
              </div>
              <div style="display: flex;gap: 6px;">
                <div >同比</div>
                <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px;">
                  <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div class="card_unit">%</div>
              </div>
            </div>
        </div>
        <div class="item_wrap" style="position: relative;">
            <div class="card_left"  >
              <AnimatedLoader :iconSrc="'/src/assets/newicon/co2_icon.png'" />
            </div>
            <div class="card_right">
              <div>耗电量</div>
              <div style="display: flex;gap: 6px;">
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div class="card_unit">千瓦时</div>
              </div>
              <div style="display: flex;gap: 6px;">
                <div>同比</div>
                <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; ">
                  <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div class="card_unit">%</div>
              </div>
            </div>
        </div>
        <div class="item_wrap" style="position: relative;">
            <div class="card_left"  >
              <AnimatedLoader :iconSrc="'/src/assets/newicon/电碳耦合度icon.png'" />
            </div>
            <div class="card_right">
              <div>电碳耦合度</div>
              <div style="display: flex;gap: 6px;">
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div class="card_unit">%</div>
              </div>
              <div style="display: flex;gap: 6px;">
                <div>同比</div>
                <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; ">
                  <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div class="card_unit">%</div>
              </div>
            </div>
        </div> 
        <div class="top_info_card" style="flex: 266;position: relative;">
            <div style="padding: 0 0px;width: 76px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;" >
              <AnimatedLoader :iconSrc="'/src/assets/newicon/green_report_icon.png'" />
            </div>
            <div class="card_right" >
              <div style="display: flex; gap: 8px;">
                <div>当前绿证价格</div>
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div class="card_unit">元</div>
              </div>
              <div style="display: flex; gap: 8px;">
                <div>近半年最低价</div>
                <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                <div class="card_unit">元</div>
              </div>
            </div>
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
import InteractiveFactoryMap from './InteractiveFactoryMap';
import AnimatedLoader from '@/components/AnimatedLoader.vue';
const InteractiveFactoryMapRef: any = ref<HTMLDivElement | null>(null)
const duration = ref(2);
const showInteractiveFactoryMap = ref(true)
const callBackFunc= (params: any, type: string) => {
  console.log('InteractiveFactoryMapRef', params, type)
  InteractiveFactoryMapRef.value?.callFunabcForBuilding(params, type)
}
onUnmounted(()=>{
  showInteractiveFactoryMap.value = false
})
defineExpose({
  callBackFunc
})
</script>

<style scoped lang="scss">
.card_unit {
  color: #ffffffb8; font-size: 14px; font-weight: 400;display: contents;
  
}
.card_left {
  padding: 0 0px;width: 106px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;
}
.card_right {
  flex: 1; height: 100%;display: flex; flex-direction: column; justify-content: center;
  color: #fff;
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
}
.interactivefactorymap_wrap {
  width: 100%; height: 100%; position: absolute; left: 50%;transform: translateX(-50%); 
}

</style>
