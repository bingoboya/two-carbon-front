<template>
  <div class="centermap">
    <div class="center_wrapper">
      <div class="item_wrap" style="position: relative">
        <div class="card_left">
          <img :src="wholeco2icon" alt="" />
        </div>
        <div class="card_right">
          <div>总碳排放量</div>
          <div v-if="dataList.carbonEmissions !== null" style="display: flex; gap: 10px">
            <CountUp style="color: yellow" :endVal="dataList.carbonEmissions" :duration="1"
              :options="{ decimalPlaces: 2 }" />
            <div style="color: #e2e2e2">万吨</div>
          </div>
          <div v-else>--</div>
          <div style="display: flex">
            <div style="padding-right: 8px;">同比</div>
            <div v-if="dataList.carbonEmissionsYoy !== null"
              :style="{ color: dataList.carbonEmissionsYoy > 0 ? '#ff3434' : '#0fff3f' }" style="
                display: flex;
                align-items: center;
                gap: 4px;
              ">
              <img style="height: 14px" v-if="dataList.carbonEmissionsYoy > 0" :src="arrow_top_icon" alt="" />
              <img style="height: 14px" v-else :src="arrow_down_icon" alt="" />
              <!-- <svg v-else class="icon" viewBox="0 0 1024 1024" version="1.1" p-id="3159" width="14" height="14"><path d="M6.71115421 489.90890885l662.73273745-1e-8L669.44389165 551.27305136 6.71115421 551.27305136l2e-8-61.36414251z" fill="#d81e06" p-id="3160"></path><path d="M665.71307852 306.28092891L1022.56779958 515.86227332l-356.85472106 215.24570478 0-424.82704919z" fill="#d81e06" p-id="3161"></path></svg> -->
              <CountUp :endVal="dataList.carbonEmissionsYoy" :duration="1" :options="{ decimalPlaces: 2 }" />
              <div style="color: #e2e2e2">%</div>
            </div>
            <div v-else>--</div>
          </div>
        </div>
      </div>
      <div class="item_wrap" style="position: relative">
        <div class="card_left">
          <img :src="zongnenghaoicon" alt="" />
        </div>
        <div class="card_right">
          <div>总能耗</div>
          <div v-if="dataList.energyConsumption !== null" style="display: flex; gap: 10px">
            <CountUp style="color: yellow" :endVal="dataList.energyConsumption" :duration="1"
              :options="{ decimalPlaces: 2 }" />
            <div style="color: #e2e2e2">万吨标准煤</div>
          </div>
          <div v-else>--</div>
          <div style="display: flex">
            <div style="padding-right: 8px;">同比</div>
            <div v-if="dataList.energyConsumptionYoy !== null"
              :style="{ color: dataList.energyConsumptionYoy > 0 ? '#ff3434' : '#0fff3f' }" style="
                display: flex;
                align-items: center;
                gap: 4px;
              ">
              <img style="height: 14px" v-if="dataList.energyConsumptionYoy > 0" :src="arrow_top_icon" alt="" />
              <img style="height: 14px" v-else :src="arrow_down_icon" alt="" />
              <CountUp :endVal="dataList.energyConsumptionYoy" :duration="1" :options="{ decimalPlaces: 2 }" />
              <div style="color: #e2e2e2">%</div>
            </div>
            <div v-else>--</div>
          </div>
        </div>
      </div>
      <div class="item_wrap" style="position: relative">
        <div class="card_left">
          <img :src="haodianicon" alt="" />
        </div>
        <div class="card_right">
          <div>用电量</div>
          <div v-if="dataList.power !== null" style="display: flex; gap: 10px">
            <CountUp style="color: yellow" :endVal="dataList.power" :duration="1" :options="{ decimalPlaces: 2 }" />
            <div style="color: #e2e2e2">万千瓦时</div>
          </div>
          <div v-else>--</div>
          <div style="display: flex">
            <div style="padding-right: 8px;">同比</div>
            <div v-if="dataList.powerYoy !== null" :style="{ color: dataList.powerYoy > 0 ? '#ff3434' : '#0fff3f' }"
              style="
                display: flex;
                align-items: center;
                gap: 4px;
              ">
              <img style="height: 14px" v-if="dataList.powerYoy > 0" :src="arrow_top_icon" alt="" />
              <img style="height: 14px" v-else :src="arrow_down_icon" alt="" />
              <CountUp :endVal="dataList.powerYoy" :duration="1" :options="{ decimalPlaces: 2 }" />
              <div style="color: #e2e2e2">%</div>
            </div>
            <div v-else>--</div>
          </div>
        </div>
      </div>
    </div>
    <InteractiveFactoryMap ref="InteractiveFactoryMapRef" :buildingArr="defaultBuildingArr" @callBackFunction="gogogo"
      :backgroundImageSrc="flowBg" :dataList="state.detailedList" />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from "@/assets/icon/arrow_down_icon.png";
import arrow_top_icon from "@/assets/icon/arrow_top_icon.png";
import InteractiveFactoryMap from "./InteractiveFactoryMap/index";
import { useRouter } from "vue-router";
import flowBg from "@/assets/bgpng/flowBg.png";
import wholeco2icon from "@/assets/icon/co2_icon.png";
import zongnenghaoicon from "@/assets/icon/总能耗icon.png";
import haodianicon from "@/assets/icon/耗电量icon.png";
const props = defineProps({
  dataList: {
    type: Object,
    default: () => {
      return {
        carbonEmissions: 39522.72,
        carbonEmissionsYoy: 32,
        energyConsumption: 11145.76,
        energyConsumptionYoy: null,
        power: 2834.06,
        powerYoy: -4.5,
      };
    },
  }
})
const state = reactive({
  detailedList: <any>[]
})
const router = useRouter();
const gogogo = (buildingName: any) => {
  router.push({ path: "third", query: { typename: buildingName } });
};
const InteractiveFactoryMapRef: any = ref<HTMLDivElement | null>(null);
const defaultBuildingArr = [
  {
    id: 1,
    x: 70,
    y: 210,
    width: 100,
    height: 100,
    name: "酸轧",
    info: "主要生产区域",
    carbonEmissions: 19522.72,
    energyConsumption: 1834.06,
    alwaysVisible: !true,
    arrowPicSrc: "/src/assets/icon/dianduxinarrow.png",
    bgPicSrc: "/src/assets/bgpng/电镀锌弹框_default.png",
  },
  {
    id: 2,
    x: 50,
    y: 450,
    width: 150,
    height: 80,
    name: "连退",
    info: "主要生产区域",
    carbonEmissions: 19522.72,
    energyConsumption: 1834.06,
    alwaysVisible: !true,
    arrowPicSrc: "/src/assets/icon/lengzaarrow.png",
    bgPicSrc: "/src/assets/bgpng/冷轧弹框_default.png",
  },
  {
    id: 3,
    x: 70,
    y: 730,
    width: 120,
    height: 120,
    name: "电镀锌(精整)",
    info: "主要生产区域",
    carbonEmissions: 19522.72,
    energyConsumption: 1834.06,
    alwaysVisible: !true,
    arrowPicSrc: "/src/assets/icon/rezaarrow.png",
    bgPicSrc: "/src/assets/bgpng/热轧弹框_default.png",
  },
];

watch(() => toRaw(props.dataList), (newValue, oldValue) => {
  console.log('newValue', newValue);
  const { carbonEmissionsDetailedList, powerDetailedList } = newValue
  const enumList = [
    {
      name: "酸轧",
    },
    {
      name: "连退",
    },
    {
      name: "电镀锌(精整)",
    }
  ]
  enumList.forEach((item: any) => {
    carbonEmissionsDetailedList.forEach((ele: any) => {
      if (item.name === ele.procedureType) {
        item.carbonEmissions = ele.carbonEmissions
      }
    })
    powerDetailedList.forEach((ele: any) => {
      if (item.name === ele.procedureType) {
        item.energyConsumption = ele.energyConsumption
      }
    })
  })
  state.detailedList = enumList
  console.log('enumList', enumList);
})
const callBackFunc = (params: any, type: string) => {
  console.log("InteractiveFactoryMapRef", params, type);
  InteractiveFactoryMapRef.value?.callFunabcForBuilding(params, type);
};

defineExpose({
  callBackFunc,
});
</script>

<style scoped lang="scss">
.centermap {
  position: relative;
  flex: 1;
}

.center_wrapper {
  display: flex;
  z-index: 1;
  flex-direction: row;
  gap: 20px;
  padding: 0 2px;
  justify-content: space-around;
  align-items: center;
  width: 90%;
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
    background-image: url("@/assets/bgpng/顶部卡片bg.png");
    background-size: contain;
    background-repeat: round;
  }
}

.card_left {
  padding: 0 0px;
  width: 106px;
  height: 76px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  img {
    width: 60px;
  }
}

.card_right {
  color: #fff;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
