<template>
  <div class="centermap" >
    <div class="interactivefactorymap_wrap" >
      <div class="center_wrapper">

        <div class="item_wrap" style="position: relative;">
          <div class="card_left">
            <AnimatedLoader :iconSrc="co2_icon" />
          </div>
          <div class="card_right">
            <div>总碳排放量</div>
            <div style="display: flex;gap: 6px;">
              <div>
                <CountUp style="color: yellow;" :endVal="273.53" :duration="duration" :options="{ decimalPlaces: 2 }" />
              </div>
              <div class="card_unit">万吨</div>
            </div>
            <div style="display: flex;gap: 6px;">
              <div>同比</div>
              <div :style="{ color: !true ? '#e86442' : '#68cfa6' }" style="display: flex; align-items: center;gap: 4px;">
                <img style="height: 14px;" v-if="!true" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <div>
                  <CountUp :endVal="0.82" :duration="duration" :options="{ decimalPlaces: 2 }" />
                </div>
              </div>
              <div class="card_unit">%</div>
            </div>
          </div>
        </div>
        <div class="item_wrap" style="position: relative;">
          <div class="card_left">
            <AnimatedLoader :iconSrc="nenghao_icon" />
          </div>
          <div class="card_right">
            <div>耗电量</div>
            <div style="display: flex;gap: 6px;">
              <div>
                <CountUp style="color: yellow;" :endVal="36639.4" :duration="duration" :options="{ decimalPlaces: 0 }" />
              </div>
              <div class="card_unit">万千瓦时</div>
            </div>
            <div style="display: flex;gap: 6px;">
              <div>同比</div>
              <div :style="{ color: true ? '#e86442' : '#68cfa6' }" style="display: flex; align-items: center;gap: 4px; ">
                <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <div>
                  <CountUp :endVal="3.67" :duration="duration" :options="{ decimalPlaces: 2 }" />
                </div>
              </div>
              <div class="card_unit">%</div>
            </div>
          </div>
        </div>
        <div class="item_wrap" style="position: relative;">
          <div class="card_left">
            <AnimatedLoader :iconSrc="ouhedu_icon" />
          </div>
          <div class="card_right">
            <div>电碳耦合度</div>
            <div style="display: flex;gap: 6px;">
              <div>
                <CountUp style="color: yellow;" :endVal="88" :duration="duration" :options="{ decimalPlaces: 0 }" />
              </div>
              <div class="card_unit">%</div>
            </div>
            <div style="display: flex;gap: 6px;">
              <div>同比</div>
              <div :style="{ color: true ? '#e86442' : '#68cfa6' }" style="display: flex; align-items: center;gap: 4px; ">
                <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <div>
                  <CountUp :endVal="1.31" :duration="duration" :options="{ decimalPlaces: 2 }" />
                </div>
              </div>
              <div class="card_unit">%</div>
            </div>
          </div>
        </div>
        <div class="top_info_card" style="flex: 266;position: relative;">
          <div
            style="padding: 0 0px;width: 76px;height: 76px;display: flex; flex-direction: row;justify-content: center; align-items: center;">
            <AnimatedLoader :iconSrc="green_report_icon" />
          </div>
          <div class="card_right">
            <div style="display: flex; gap: 8px;">
              <div>当前绿证价格</div>
              <div>
                <CountUp style="color: yellow;" :endVal="25" :duration="duration" :options="{ decimalPlaces: 0 }" />
              </div>
              <div class="card_unit">元</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <div>近半年最低价</div>
              <div>
                <CountUp style="color: yellow;" :endVal="22" :duration="duration" :options="{ decimalPlaces: 0 }" />
              </div>
              <div class="card_unit">元</div>
            </div>
          </div>
        </div>

      </div>
      <InteractiveFactoryMap @callBackFunction="gogogo" ref="InteractiveFactoryMapRef"
        :buildingArr="defaultBuildingArr" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from '@/assets/icon/arrow_down_icon.png'
import arrow_top_icon from '@/assets/icon/arrow_top_icon.png'
import InteractiveFactoryMap from '@/components/InteractiveFactoryMap/index';
import AnimatedLoader from '@/components/AnimatedLoader.vue';
import dianduxinImg from '@/assets/bgpng/dianduxin_border.png'
import rezaImg from '@/assets/bgpng/reza_border.png'
import gaoluImg from '@/assets/bgpng/gaolu_border.png'
import liangangImg from '@/assets/bgpng/liangang_border.png'

import dianduxinImgdefault from '@/assets/bgpng/电镀锌弹框_default.png'
import rezaImgdefault from '@/assets/bgpng/热轧弹框_default.png'
import gaoluImgdefault from '@/assets/bgpng/高炉弹框_default.png'
import liangangImgdefault from '@/assets/bgpng/炼钢弹框_default.png'

import co2_icon from '@/assets/icon/co2_icon1.png'
import nenghao_icon from '@/assets/icon/zongnenghao_icon.png'
import ouhedu_icon from '@/assets/icon/diantanouhe_icon.png'
import green_report_icon from '@/assets/icon/green_report_icon.png'

import { useRouter } from 'vue-router'
const router = useRouter()

const InteractiveFactoryMapRef: any = ref<HTMLDivElement | null>(null)
const duration = ref(2);
const gogogo = (buildingName: any) => {
  router.push({ path: 'second', query: { typename: buildingName } })
}
const defaultBuildingArr = [
  {
    id: 1, x: 110, y: 600, width: 50, height: 80, name: "电镀锌", info: "这是主要办公区域", alwaysVisible: !true,
    // videoSrc: '',
    // videoSrcPress: '',
    // arrowPicSrc: '@/assets/icon/dianduxinarrow.png',
    // arrowItemLine: '@/assets/icon/电镀锌弹框线.png',
    bgPicSrc: dianduxinImgdefault,
    toolTipBg: dianduxinImg,
    tanpaiValue: Number(26.62 * 0.7).toFixed(2),
    nenghaoValue:  Number(6.83 * 0.7).toFixed(2),
    haodianValue:  Number(22689.56 * 0.7).toFixed(2),
  },
  {
    id: 3, x: 420, y: 610, width: 50, height: 80, name: "热轧", info: "主要生产区域", alwaysVisible: !true,
    // videoSrc: '',
    // videoSrcPress: '',
    // arrowPicSrc: '@/assets/icon/rezaarrow.png',
    // arrowItemLine: '@/assets/icon/热轧弹框线.png',
    bgPicSrc: rezaImgdefault,
    toolTipBg: rezaImg,
    tanpaiValue:  Number(72.826 * 0.7).toFixed(2),
    nenghaoValue:  Number(8.49 * 0.7).toFixed(2),
    haodianValue:  Number(14826.22 * 0.7).toFixed(2),
  },
  {
    id: 4, x: 610, y: 280, width: 50, height: 80, name: "高炉", info: "主要生产区域", alwaysVisible: !true,
    // videoSrc: '',
    // videoSrcPress: '',
    // arrowPicSrc: '@/assets/icon/gaoluarrow.png',
    // arrowItemLine: '@/assets/icon/高炉弹框线.png',
    bgPicSrc: gaoluImgdefault,
    toolTipBg:gaoluImg,
    tanpaiValue:  Number(182.06 * 0.7).toFixed(2),
    nenghaoValue:  Number(11.82 * 0.7).toFixed(2),
    haodianValue:  Number(5930.48 * 0.7).toFixed(2),
  },
  {
    id: 5, x: 800, y: 520, width: 50, height: 80, name: "炼钢", info: "主要生产区域", alwaysVisible: !true,
    // videoSrc: '',
    // videoSrcPress: '',
    // arrowPicSrc: '@/assets/icon/liangangarrow.png',
    // arrowItemLine: '@/assets/icon/炼钢弹框线.png',
    bgPicSrc: liangangImgdefault,
    toolTipBg: liangangImg,
    tanpaiValue: Number(109.23 * 0.7).toFixed(2),
    nenghaoValue:  Number(9.55 * 0.7).toFixed(2),
    haodianValue:  Number(8895.73 * 0.7).toFixed(2),
  },
];
const callBackFunc = (params: any, type: string) => {
  // console.log('InteractiveFactoryMapRef', params, type)
  InteractiveFactoryMapRef.value?.callFunabcForBuilding(params, type)
}

defineExpose({
  callBackFunc
})
</script>

<style scoped lang="scss">
.card_unit {
  color: #ffffffb8;
  font-size: 14px;
  font-weight: 400;
  display: contents;

}

.card_left {
  padding: 0 0px;
  width: 106px;
  height: 76px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.card_right {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}

.center_wrapper {
  display: flex;
  z-index: 1;
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
  flex: 1;
}

.interactivefactorymap_wrap {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
</style>
