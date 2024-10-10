<template>
  <div class="centermap">
    <div class="center_wrapper">
      <div class="item_wrap" style="position: relative">
        <!-- <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;"> -->
        <div class="card_left">
          <img :src="wholeco2icon" alt="" />
        </div>
        <div class="card_right">
          <div>总碳排放量</div>
          <div style="display: flex; gap: 10px">
            <div>
              <CountUp
                style="color: yellow"
                :endVal="99.23"
                :duration="duration"
                :options="{ decimalPlaces: 3 }"
              />
            </div>
            <div style="color: #e2e2e2">万吨</div>
          </div>
          <div style="display: flex">
            <div>同比</div>
            <div
              :style="{ color: true ? 'red' : 'green' }"
              style="
                display: flex;
                align-items: center;
                gap: 4px;
                padding-left: 8px;
              "
            >
              <img
                style="height: 14px"
                v-if="true"
                :src="arrow_top_icon"
                alt=""
              />
              <img style="height: 14px" v-else :src="arrow_down_icon" alt="" />
              <div>
                <CountUp
                  :endVal="1.23"
                  :duration="duration"
                  :options="{ decimalPlaces: 3 }"
                />
              </div>
            </div>
            <div style="color: #e2e2e2">%</div>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <div class="item_wrap" style="position: relative">
        <!-- <div style="position: absolute; display: flex; flex-direction: row;justify-content: center; align-items: center;"> -->
        <div class="card_left">
          <img :src="zongnenghaoicon" alt="" />
        </div>
        <div class="card_right">
          <div>总能耗</div>
          <div style="display: flex; gap: 10px">
            <div>
              <CountUp
                style="color: yellow"
                :endVal="99.23"
                :duration="duration"
                :options="{ decimalPlaces: 3 }"
              />
            </div>
            <div style="color: #e2e2e2">万吨</div>
          </div>
          <div style="display: flex">
            <div>同比</div>
            <div
              :style="{ color: true ? 'red' : 'green' }"
              style="
                display: flex;
                align-items: center;
                gap: 4px;
                padding-left: 8px;
              "
            >
              <img
                style="height: 14px"
                v-if="true"
                :src="arrow_top_icon"
                alt=""
              />
              <img style="height: 14px" v-else :src="arrow_down_icon" alt="" />
              <div>
                <CountUp
                  :endVal="1.23"
                  :duration="duration"
                  :options="{ decimalPlaces: 3 }"
                />
              </div>
            </div>
            <div style="color: #e2e2e2">%</div>
          </div>
        </div>
        <!-- </div> -->
      </div>
      <div class="item_wrap" style="position: relative">
        <div class="card_left">
          <img :src="haodianicon" alt="" />
        </div>
        <div class="card_right">
          <div>耗电量</div>
          <div style="display: flex; gap: 10px">
            <div>
              <CountUp
                style="color: yellow"
                :endVal="99.23"
                :duration="duration"
                :options="{ decimalPlaces: 3 }"
              />
            </div>
            <div style="color: #e2e2e2">万吨</div>
          </div>
          <div style="display: flex">
            <div>同比</div>
            <div
              :style="{ color: true ? 'red' : 'green' }"
              style="
                display: flex;
                align-items: center;
                gap: 4px;
                padding-left: 8px;
              "
            >
              <img
                style="height: 14px"
                v-if="true"
                :src="arrow_top_icon"
                alt=""
              />
              <img style="height: 14px" v-else :src="arrow_down_icon" alt="" />
              <div>
                <CountUp
                  :endVal="1.23"
                  :duration="duration"
                  :options="{ decimalPlaces: 3 }"
                />
              </div>
            </div>
            <div style="color: #e2e2e2">%</div>
          </div>
        </div>
      </div>
    </div>

    <InteractiveFactoryMap
      @callBackFunction="callBackFunction"
      ref="InteractiveFactoryMapRef"
      :buildingArr="defaultBuildingArr"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import CountUp from "@/components/count-up";
import arrow_down_icon from "@/assets/icon/arrow_down_icon.png";
import arrow_top_icon from "@/assets/icon/arrow_top_icon.png";
import InteractiveFactoryMap from "./InteractiveFactoryMap/index";
import wholeco2icon from "@/assets/icon/co2_icon.png";
import zongnenghaoicon from "@/assets/icon/总能耗icon.png";
import haodianicon from "@/assets/icon/耗电量icon.png";
const emits = defineEmits(["handlePopupClick"]);

const duration = ref(2);
const InteractiveFactoryMapRef: any = ref(null);

const callBackFunction = (buildingName: any, departmentImgName: any) => {
  console.log("callBackFunction", buildingName);
  emits("handlePopupClick", buildingName, departmentImgName);
};
const defaultBuildingArr = [
  {
    id: 1,
    x: 130,
    y: 450,
    width: 260,
    height: 100,
    name: "本浦冷轧2#重卷机组",
    info: "这是主要办公区域",
    alwaysVisible: !true,
    arrowPicSrc: "/src/assets/icon/dianduxinarrow.png",
    bgPicSrc: "/src/assets/bgpng/电镀锌弹框_default.png",
  },
  {
    id: 2,
    x: 420,
    y: 450,
    width: 150,
    height: 80,
    name: "本浦冷轧3#重卷机组",
    info: "主要生产区域",
    alwaysVisible: !true,
    arrowPicSrc: "/src/assets/icon/lengzaarrow.png",
    bgPicSrc: "/src/assets/bgpng/冷轧弹框_default.png",
  },
  {
    id: 3,
    x: 780,
    y: 450,
    width: 120,
    height: 120,
    name: "电镀锌机组",
    info: "主要生产区域",
    alwaysVisible: !true,
    arrowPicSrc: "/src/assets/icon/rezaarrow.png",
    bgPicSrc: "/src/assets/bgpng/热轧弹框_default.png",
  },
];

const callBackFunc = (params: any, type: string) => {
  // console.log('InteractiveFactoryMapRef', params, type)
  InteractiveFactoryMapRef.value?.callFunabcForBuilding(params, type);
};
defineExpose({
  callBackFunc,
});
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
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
}
</style>
