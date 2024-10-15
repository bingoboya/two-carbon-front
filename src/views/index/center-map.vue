<template>
  <div class="centermap">
    <div class="interactivefactorymap_wrap">
      <div class="center_wrapper">
        <div class="item_wrap" style="position: relative;">
          <div class="card_left">
            <AnimatedLoader :iconSrc="co2_icon" />
          </div>
          <div class="card_right">
            <div>总碳排放量</div>
            <div v-if="dataList.carbonEmissions !== null" style="display: flex;gap: 6px;">
              <CountUp style="color: yellow;" :endVal="dataList.carbonEmissions" :duration="1"
                :options="{ decimalPlaces: 2 }" />
              <div class="card_unit">万吨</div>
            </div>
            <div v-else>--</div>
            <div style="display: flex;gap: 6px;">
              <div>同比</div>
              <div v-if="dataList.carbonEmissionsYoy !== null"
                :style="{ color: dataList.carbonEmissionsYoy > 0 ? '#ff3434' : '#0fff3f' }"
                style="display: flex; align-items: center;gap: 4px;">
                <img style="height: 14px;" v-if="dataList.carbonEmissionsYoy > 0" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <CountUp :endVal="dataList.carbonEmissionsYoy" :duration="1" :options="{ decimalPlaces: 2 }" />
                <div class="card_unit">%</div>
              </div>
              <div v-else>--</div>
            </div>
          </div>
        </div>
        <div class="item_wrap" style="position: relative;">
          <div class="card_left">
            <AnimatedLoader :iconSrc="nenghao_icon" />
          </div>
          <div class="card_right">
            <div>用电量</div>
            <div v-if="dataList.power !== null" style="display: flex;gap: 6px;">
              <CountUp style="color: yellow;" :endVal="dataList.power" :duration="1" :options="{ decimalPlaces: 0 }" />
              <div class="card_unit">万千瓦时</div>
            </div>
            <div v-else>--</div>
            <div style="display: flex;gap: 6px;">
              <div>同比</div>
              <div v-if="dataList.powerYoy !== null" :style="{ color: dataList.powerYoy > 0 ? '#ff3434' : '#0fff3f' }"
                style="display: flex; align-items: center;gap: 4px; ">
                <img style="height: 14px;" v-if="dataList.powerYoy > 0" :src="arrow_top_icon" alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <CountUp :endVal="dataList.power" :duration="1" :options="{ decimalPlaces: 2 }" />
                <div class="card_unit">%</div>
              </div>
              <div v-else>--</div>
            </div>
          </div>
        </div>
        <div class="item_wrap" style="position: relative;">
          <div class="card_left">
            <AnimatedLoader :iconSrc="ouhedu_icon" />
          </div>
          <div class="card_right">
            <div>电碳耦合度</div>
            <div v-if="dataList.powerCarbonCouplingDegree !== null" style="display: flex;gap: 6px;">
              <CountUp style="color: yellow;" :endVal="dataList.powerCarbonCouplingDegree" :duration="1"
                :options="{ decimalPlaces: 0 }" />
              <div class="card_unit">%</div>
            </div>
            <div v-else>--</div>
            <div style="display: flex;gap: 6px;">
              <div>同比</div>
              <div v-if="dataList.powerCarbonCouplingDegreeYoy !== null"
                :style="{ color: dataList.powerCarbonCouplingDegreeYoy > 0 ? '#ff3434' : '#0fff3f' }"
                style="display: flex; align-items: center;gap: 4px; ">
                <img style="height: 14px;" v-if="dataList.powerCarbonCouplingDegreeYoy > 0" :src="arrow_top_icon"
                  alt="">
                <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
                <CountUp :endVal="dataList.carbonEmissions" :duration="1" :options="{ decimalPlaces: 2 }" />
                <div class="card_unit">%</div>
              </div>
              <div v-else>--</div>
            </div>
          </div>
        </div>
        <div class="top_info_card" style="flex: 266;position: relative;">
          <div class="animated_loader_wrap">
            <AnimatedLoader :iconSrc="green_report_icon" />
          </div>
          <div class="card_right">
            <div style="display: flex; gap: 8px;">
              <div>当前绿证价格</div>
              <CountUp style="color: yellow;" :endVal="dataList.powCurrentGreenCertificatePriceer" :duration="1"
                :options="{ decimalPlaces: 0 }" />
              <div class="card_unit">元</div>
            </div>
            <div style="display: flex; gap: 8px;">
              <div>近半年最低价</div>
              <CountUp style="color: yellow;" :endVal="dataList.halfYearLow" :duration="1"
                :options="{ decimalPlaces: 0 }" />
              <div class="card_unit">元</div>
            </div>
          </div>
        </div>

      </div>
      <InteractiveFactoryMap @callBackFunction="gogogo" ref="InteractiveFactoryMapRef"
        :buildingArr="state.defaultBuildingArr" />
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
const props = defineProps({
  detailedList: {
    type: Object,
    default: () => {
      return {}
    }
  },
  dataList: {
    type: Object,
    default: () => {
      return {
        carbonEmissions: 0,
        carbonEmissionsYoy: 0,
        power: 0,
        powerYoy: 0,
        powerCarbonCouplingDegree: 0, // 电碳耦合度
        powerCarbonCouplingDegreeYoy: null, // 电碳耦合度同比
        powCurrentGreenCertificatePriceer: 0, //当前绿证价格
        halfYearLow: 0, //近半年最低价
        // detailedList: {
        //   // 电镀锌
        //   electroplating: {
        //     carbonEmission: 80, // 碳排
        //     energyConsumption: 10, // 能耗
        //     power: 0, // 用电量
        //   },
        //   // 热轧
        //   hotRolling: {
        //     carbonEmission: 10, // 碳排
        //     energyConsumption: 0, // 能耗
        //     power: 0, // 用电量
        //   },
        //   // 高炉
        //   blastFurnace: {
        //     carbonEmission: 10, // 碳排
        //     energyConsumption: 0, // 能耗
        //     power: 0, // 用电量
        //   },
        //   // 炼钢
        //   steelSmelting: {
        //     carbonEmission: 10, // 碳排
        //     energyConsumption: 0, // 能耗
        //     power: 0, // 用电量
        //   },
        // }
      };
    },
  }
})
const InteractiveFactoryMapRef: any = ref<HTMLDivElement | null>(null)

const state = reactive({
  defaultBuildingArr: [
    {
      id: 1, x: 110, y: 600, width: 50, height: 80, name: "电镀锌", info: "主要生产区域", alwaysVisible: !true,
      bgPicSrc: dianduxinImgdefault,
      toolTipBg: dianduxinImg,
      tagName: 'electroplating',
      tanpaiValue: 32,
      nenghaoValue: 32,
      haodianValue: 32,
    },
    {
      id: 3, x: 420, y: 610, width: 50, height: 80, name: "热轧", info: "主要生产区域", alwaysVisible: !true,
      bgPicSrc: rezaImgdefault,
      toolTipBg: rezaImg,
      tagName: 'hotRolling',
      tanpaiValue: 32,
      nenghaoValue: 32,
      haodianValue: 32,
    },
    {
      id: 4, x: 610, y: 280, width: 50, height: 80, name: "高炉", info: "主要生产区域", alwaysVisible: !true,
      bgPicSrc: gaoluImgdefault,
      toolTipBg: gaoluImg,
      tagName: 'blastFurnace',
      tanpaiValue: 32,
      nenghaoValue: 32,
      haodianValue: 32,
    },
    {
      id: 5, x: 800, y: 520, width: 50, height: 80, name: "炼钢", info: "主要生产区域", alwaysVisible: !true,
      bgPicSrc: liangangImgdefault,
      toolTipBg: liangangImg,
      tagName: 'steelSmelting',
      tanpaiValue: 32,
      nenghaoValue: 32,
      haodianValue: 32,
    },
  ]
})

watch(() => toRaw(props.detailedList), (newValue, oldValue) => {
  const cacheData = JSON.parse(JSON.stringify(state.defaultBuildingArr))
  cacheData.forEach((item: any) => {
    const { carbonEmission, energyConsumption, power } = newValue[item.tagName]
    console.log('carbonEmission, energyConsumption, power', carbonEmission, energyConsumption, power);
    item.tanpaiValue = carbonEmission
    item.nenghaoValue = energyConsumption
    item.haodianValue = power
  })
  state.defaultBuildingArr = cacheData
  console.log('watch-state.detailedList', state.defaultBuildingArr[0].tanpaiValue);
}, { immediate: true, })


const callBackFunc = (params: any, type: string) => {
  // console.log('InteractiveFactoryMapRef', params, type)
  InteractiveFactoryMapRef.value?.callFunabcForBuilding(params, type)
}
const gogogo = (buildingName: any) => {
  router.push({ path: 'second', query: { typename: buildingName } })
}
defineExpose({
  callBackFunc
})
</script>

<style scoped lang="scss">
.animated_loader_wrap {
  padding: 0 0px;
  width: 76px;
  height: 76px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

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
