<template>
  <div class="centermap">
    <div class="interactivefactorymap_wrap">
      <div class="center_wrapper" >

        <div class="item_wrap" style="position: relative;">
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
        </div>
        <div class="item_wrap" style="position: relative;">
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
        </div>
        <div class="item_wrap" style="position: relative;">
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
        </div> 
      </div>
      <!-- ./mapdemo.webm 是public文件夹中的文件路径
          <InteractiveFactoryMap :videoSrc="'./mapdemo.webm'"/>
             或者 
          <InteractiveFactoryMap :videoSrc="'/src/assets/webm/gaolubg.webm'" />
      -->
      <InteractiveFactoryMap ref="InteractiveFactoryMapRef" :buildingArr="defaultBuildingArr" @callBackFunction="gogogo" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from '@/assets/icon/arrow_down_icon.png'
import arrow_top_icon from '@/assets/icon/arrow_top_icon.png'
import InteractiveFactoryMap from '@/components/InteractiveFactoryMap/index';
import { useRouter } from 'vue-router'


const router = useRouter()
const gogogo = (buildingName: any) => {
  router.push({ path: 'third', query: { typename: buildingName }})
}
const duration = ref(2);
const InteractiveFactoryMapRef: any = ref<HTMLDivElement | null>(null)
const defaultBuildingArr =  [
      { id: 1, x: 130, y: 450, width: 100, height: 100, name: "酸轧", info: "这是主要办公区域", alwaysVisible: !true, 
        // videoSrc: '/src/assets/webm/dianduxin_default.webm',
        // videoSrcPress: '/src/assets/webm/dianduxin_press.webm',
        arrowPicSrc: '/src/assets/icon/dianduxinarrow.png',
        bgPicSrc: '/src/assets/bgpng/电镀锌弹框_default.png',
       },
      { id: 2, x: 420, y: 450, width: 150, height: 80, name: "连退", info: "主要生产区域", alwaysVisible: !true, 
        // videoSrc: '/src/assets/webm/lengza_default.webm',
        // videoSrcPress: '/src/assets/webm/lengza_press.webm',
        arrowPicSrc: '/src/assets/icon/lengzaarrow.png',
        bgPicSrc: '/src/assets/bgpng/冷轧弹框_default.png',
       },
        { id: 3, x: 780, y: 450, width: 120, height: 120, name: "电镀(精整)", info: "主要生产区域", alwaysVisible: !true, 
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
.card_left {
  padding: 0 0px;width: 106px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;
}
.card_right {color: #fff;
  flex: 1; height: 100%;display: flex; flex-direction: column; justify-content: center;
} 
.center_wrapper {
  display: flex;
  z-index: 2;
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
}
.interactivefactorymap_wrap {
  width: 100%; height: 100%; position: absolute; left: 50%;transform: translateX(-50%); 
}

</style>
