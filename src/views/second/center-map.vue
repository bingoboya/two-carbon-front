<template>
  <div class="centermap">
      <div class="center_wrapper" >
        <div class="item_wrap" style="position: relative;">
            <div class="card_left" >
              <img style="width: 60px;" :src="'/src/assets/icon/总碳排放量icon.png'" alt="">
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
                  <img style="height: 14px;" v-if="!true" :src="arrow_top_icon" alt="">
                  <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">

                  <!-- <svg v-else class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3159" width="14" height="14"><path d="M6.71115421 489.90890885l662.73273745-1e-8L669.44389165 551.27305136 6.71115421 551.27305136l2e-8-61.36414251z" fill="#d81e06" p-id="3160"></path><path d="M665.71307852 306.28092891L1022.56779958 515.86227332l-356.85472106 215.24570478 0-424.82704919z" fill="#d81e06" p-id="3161"></path></svg> -->

                  <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
                </div>
                <div style="color: gray">%</div>
              </div>
            </div>
        </div>
        <div class="item_wrap" style="position: relative;">
            <div class="card_left" >
              <img style="width: 60px;" :src="'/src/assets/icon/耗电量icon.png'" alt="">
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
        </div>
        <div class="item_wrap" style="position: relative;">
            <div class="card_left" >
              <img style="width: 60px;" :src="'/src/assets/icon/耗电量icon.png'" alt="">
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
      <!-- ./mapdemo.webm 是public文件夹中的文件路径
          <InteractiveFactoryMap :videoSrc="'./mapdemo.webm'"/>
             或者 
          <InteractiveFactoryMap :videoSrc="'/src/assets/webm/gaolubg.webm'" />
      -->
      <InteractiveFactoryMap ref="InteractiveFactoryMapRef"
       :buildingArr="defaultBuildingArr"
        @callBackFunction="gogogo"
        :backgroundImageSrc="'/src/assets/bgpng/二级流程图bg.png'" 
        />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from '@/assets/icon/arrow_down_icon.png'
import arrow_top_icon from '@/assets/icon/arrow_top_icon.png'
import InteractiveFactoryMap from './InteractiveFactoryMap/index';
// import InteractiveFactoryMap from '@/components/InteractiveFactoryMap/index';
import { useRouter } from 'vue-router'


const router = useRouter()
const gogogo = (buildingName: any) => {
  router.push({ path: 'third', query: { typename: buildingName }})
}
const duration = ref(2);
const InteractiveFactoryMapRef: any = ref<HTMLDivElement | null>(null)
const defaultBuildingArr =  [
  { id: 1, x: 70, y: 210, width: 100, height: 100, name: "酸轧", info: "这是主要办公区域", alwaysVisible: !true, 
    // videoSrc: '/src/assets/webm/dianduxin_default.webm',
    // videoSrcPress: '/src/assets/webm/dianduxin_press.webm',
    arrowPicSrc: '/src/assets/icon/dianduxinarrow.png',
    bgPicSrc: '/src/assets/bgpng/电镀锌弹框_default.png',
    },
  { id: 2, x: 50, y: 450, width: 150, height: 80, name: "连退", info: "主要生产区域", alwaysVisible: !true, 
    // videoSrc: '/src/assets/webm/lengza_default.webm',
    // videoSrcPress: '/src/assets/webm/lengza_press.webm',
    arrowPicSrc: '/src/assets/icon/lengzaarrow.png',
    bgPicSrc: '/src/assets/bgpng/冷轧弹框_default.png',
    },
    { id: 3, x: 70, y: 730, width: 120, height: 120, name: "电镀(精整)", info: "主要生产区域", alwaysVisible: !true, 
    // videoSrc: '/src/assets/webm/reza_default.webm',
    // videoSrcPress: '/src/assets/webm/reza_press.webm',
    arrowPicSrc: '/src/assets/icon/rezaarrow.png',
    bgPicSrc: '/src/assets/bgpng/热轧弹框_default.png',
    },
]
const callBackFunc= (params: any, type: string) => {
  console.log('InteractiveFactoryMapRef', params, type)
  InteractiveFactoryMapRef.value?.callFunabcForBuilding(params, type)
}

defineExpose({
  callBackFunc
})
</script>

<style scoped lang="scss">
.centermap {
  position: relative;
}
.center_wrapper {
  display: flex;
  z-index: 1;
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
    background-image: url('@/assets/bgpng/顶部卡片bg.png');
    background-size: contain;
    background-repeat: round;
  }

}

.card_left {
  padding: 0 0px;width: 106px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;
}
.card_right {color: #fff;
  flex: 1; height: 100%;display: flex; flex-direction: column; justify-content: center;
} 
</style>
