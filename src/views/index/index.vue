<template>
  <div class="index_box">
    <div ref="contentLeftComp" class="contetn_left">
      <div style="height: 20px; display: flex; gap: 4px"></div>
      <ItemWrap class="contetn_left-top" titlebg="headImg" :titleImg="headImg" title="绿证消费策略">
        <LeftTop :dataList="state.greenCertificateConsumptionStrategy" />
      </ItemWrap>
      <ItemWrap class="contetn_left-center" titlebg="headImg" :titleImg="headImg" title="碳排放量情况">
        <LeftCenter :dataList="state.carbonEmissions" />
      </ItemWrap>
      <ItemWrap titlebg="headImg" :titleImg="headImg" title="能源结构占比">
        <LeftBottom :dataList="state.energyStructureFocus" />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <div class="centermapComp" style="flex: 1; display: flex">
        <CenterMap ref="centerMapRef" :dataList="state.overview" :detailedList="state.detailedList" />
      </div>
      <div ref="centerBottomCompRef" class="centerBottomCompRef">
        <div style="
            position: relative;
            width: 120%;
            height: 100%;
            left: 50%;
            transform: translateX(-50%);
          ">
          <video v-if="showVideo" autoplay loop muted width="100%" style="position: absolute; width: 100% !important">
            <source src="/src/assets/webm/bottombgwebm.webm" type="video/webm" />
          </video>
        </div>
        <div class="bottom_item_wrapper">
          <div @mouseenter="enterBottomBtn('高炉')" @mouseleave="leaveBottomBtn('高炉')" @click="routerGo('高炉')"
            class="bottom_item">
            <div class="bottom_item_btn_default">
              <img :src="getImageUrl('高炉按钮_default')" alt="" />
            </div>
            <div class="bottom_item_btn_press">
              <img :src="getImageUrl('高炉按钮_press')" alt="" />
            </div>
          </div>
          <div @mouseenter="enterBottomBtn('炼钢')" @mouseleave="leaveBottomBtn('炼钢')" @click="routerGo('炼钢')"
            class="bottom_item">
            <div class="bottom_item_btn_default">
              <img :src="getImageUrl('炼钢按钮_default')" alt="" />
            </div>
            <div class="bottom_item_btn_press">
              <img :src="getImageUrl('炼钢按钮_press')" alt="" />
            </div>
          </div>
          <div @mouseenter="enterBottomBtn('热轧')" @mouseleave="leaveBottomBtn('热轧')" @click="routerGo('热轧')"
            class="bottom_item">
            <div class="bottom_item_btn_default">
              <img :src="getImageUrl('热轧按钮_default')" alt="" />
            </div>
            <div class="bottom_item_btn_press">
              <img :src="getImageUrl('热轧按钮_press')" alt="" />
            </div>
          </div>
          <div @mouseenter="enterBottomBtn('电镀锌')" @mouseleave="leaveBottomBtn('电镀锌')" @click="routerGo('电镀锌')"
            class="bottom_item">
            <div class="bottom_item_btn_default">
              <img :src="getImageUrl('电镀锌按钮_default')" alt="" />
            </div>
            <div class="bottom_item_btn_press">
              <img :src="getImageUrl('电镀锌按钮_press')" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div ref="contentRightComp" class="contetn_right">
      <div style="height: 20px">
        <CusTomSelect v-model="selectedValue" :width="'84px'" :options="options" placeholder="请选择" />
      </div>
      <ItemWrap titlebg="headImg" :titleImg="headImg" title="工艺碳排占比">
        <RightTop :dataList="state.processCarbonEmissionProportion" />
      </ItemWrap>
      <ItemWrap titlebg="headLongImg" :titleImg="headLongImg" title="生产产量与单位产品碳排放量情况">
        <RightCenter :dataList="state.productionOutputAndProductCarbonEmissions" />
      </ItemWrap>
      <ItemWrap titlebg="headLongImg" :titleImg="headLongImg" title=" 实际碳排放量与预测值对比">
        <RightBottom :dataList="state.comparisonOfActualCarbonEmissionsAndPredictedValues" />
      </ItemWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { bengangfirstpage } from "@/api";
import headImg from "@/assets/bgpng/头部2.png";
import headLongImg from "@/assets/bgpng/头部长2.png";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import ItemWrap from "@/components/item-wrap";
import CusTomSelect from "@/components/CusTomSelect.vue";
import { gsap } from "gsap";
import {
  LeftTop,
  LeftBottom,
  CenterMap,
  RightBottom,
  RightCenter,
  LeftCenter,
  RightTop,
} from "./index";
const showVideo = ref(true);
const state = reactive({
  greenCertificateConsumptionStrategy: {}, // "绿证消费策略",
  carbonEmissions: {}, // "碳排放量情况",
  energyStructureFocus: {}, // "能源结构占比",
  processCarbonEmissionProportion: {}, // "工艺碳排占比",
  productionOutputAndProductCarbonEmissions: {}, // "生产产量与产品碳排放情况",
  comparisonOfActualCarbonEmissionsAndPredictedValues: {}, // "实际碳排放量与预测值对比",
  overview: {
    carbonEmissions: 0,
    carbonEmissionsYoy: 0,
    power: 0,
    powerYoy: 0,
    powCurrentGreenCertificatePriceer: 0, //当前绿证价格
    halfYearLow: 0, //近半年最低价
    powerCarbonCouplingDegree: 0, // 电碳耦合度
    powerCarbonCouplingDegreeYoy: 0, // 电碳耦合度同比
  }, // "总览"
  detailedList: {
    // 电镀锌
    electroplating: {
      carbonEmission: 0, // 碳排
      energyConsumption: 0, // 能耗
      power: 0, // 用电量
    },
    // 热轧
    hotRolling: {
      carbonEmission: 0, // 碳排
      energyConsumption: 0, // 能耗
      power: 0, // 用电量
    },
    // 高炉
    blastFurnace: {
      carbonEmission: 0, // 碳排
      energyConsumption: 0, // 能耗
      power: 0, // 用电量
    },
    // 炼钢
    steelSmelting: {
      carbonEmission: 0, // 碳排
      energyConsumption: 0, // 能耗
      power: 0, // 用电量
    },
  }
})
const getImageUrl = (name: any = "本浦冷轧2重卷机组按钮_default") => {
  // 注意URL里面不能是纯变量，那样就会报错了 详细的报错 你可以去试试看 https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  const a = new URL(`/src/assets/bgpng/${name}.png`, import.meta.url).href;
  return a;
};
const getData = async () => {
  console.log("getData-bengangfirstpage");
  const res = await bengangfirstpage();
  if (res.code === 0) {
    console.log(res);
    const {
      greenCertificateConsumptionStrategy,
      carbonEmissions,
      energyStructureFocus,
      processCarbonEmissionProportion,
      productionOutputAndProductCarbonEmissions,
      comparisonOfActualCarbonEmissionsAndPredictedValues,
      overview
    } = res.data
    state.greenCertificateConsumptionStrategy = greenCertificateConsumptionStrategy
    state.carbonEmissions = carbonEmissions
    state.energyStructureFocus = energyStructureFocus
    state.processCarbonEmissionProportion = processCarbonEmissionProportion
    state.productionOutputAndProductCarbonEmissions = productionOutputAndProductCarbonEmissions
    state.comparisonOfActualCarbonEmissionsAndPredictedValues = comparisonOfActualCarbonEmissionsAndPredictedValues
    state.overview = overview // 获取"总览"数据
    state.detailedList = overview.detailedList
  } else {
    console.log(res.msg);
  }
};
getData();
setInterval(() => {
  getData();
}, 2000);


const router = useRouter();
const routerGo = (name: any) => {
  if (name === "电镀锌") {
    router.push({ path: "second", query: { typename: name } });
  }
};

const centerMapRef: any = ref<HTMLDivElement | null>(null);
const contentLeftComp = ref<HTMLDivElement | null>(null);
const contentRightComp = ref<HTMLDivElement | null>(null);
const centerBottomCompRef = ref<HTMLDivElement | null>(null);
const enterBottomBtn = (name: any) => {
  // console.log('enterBottomBtn', name, centerMapRef.value)
  centerMapRef.value?.callBackFunc(name, "enter");
};
const leaveBottomBtn = (name: any) => {
  // console.log('leaveBottomBtn', name, centerMapRef.value)
  centerMapRef.value?.callBackFunc(name, "leave");
};
const animateDivs = () => {
  if (contentLeftComp.value) {
    const width = contentLeftComp.value.getBoundingClientRect().width; // x: -458
    gsap.from(contentLeftComp.value, { opacity: 0.1, x: -width, duration: 2 });
  }
  if (contentRightComp.value) {
    const width = contentRightComp.value.getBoundingClientRect().width; // x: 458
    gsap.from(contentRightComp.value, { opacity: 0.1, x: width, duration: 2 });
  }
  if (centerBottomCompRef.value) {
    const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458
    gsap.from(centerBottomCompRef.value, { y: height, duration: 2 });
  }

  gsap.fromTo(".centermapComp", { opacity: 0 }, { opacity: 1, duration: 3 });
};
const returnPlaying = async () => {
  // console.log('returnPlaying----------');
  if (document.hidden) {
    showVideo.value = false;
  } else {
    showVideo.value = true;
  }
};
onMounted(async () => {
  await nextTick();
  animateDivs();
  document.addEventListener("visibilitychange", returnPlaying);
});
onUnmounted(() => {
  document.removeEventListener("visibilitychange", returnPlaying);
});
const animateDivsReverce = (calback: any) => {
  if (contentLeftComp.value) {
    const width = contentLeftComp.value.getBoundingClientRect().width; // x: -458
    gsap.to(contentLeftComp.value, { opacity: 0.1, x: -width, duration: 1 });
  }
  if (contentRightComp.value) {
    const width = contentRightComp.value.getBoundingClientRect().width; // x: 458
    gsap.to(contentRightComp.value, { opacity: 0.1, x: width, duration: 1 });
  }
  if (centerBottomCompRef.value) {
    const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458
    gsap.to(centerBottomCompRef.value, { y: height, duration: 1 });
  }

  gsap.fromTo(
    ".centermapComp",
    { opacity: 1 },
    {
      opacity: 0,
      duration: 1,
      onComplete: () => {
        console.log("动画完成2");
        calback();
      },
    }
  );
};
onBeforeRouteLeave((to, from, next) => {
  // console.log('index---', to, from)
  animateDivsReverce(next);
});
const selectedValue = ref("option31");
const options = [
  { value: "option1", label: "2021年" },
  { value: "option2", label: "2022年" },
  { value: "option3", label: "2023年" },
  { value: "option31", label: "2024年" },
  { value: "option32", label: "2025年" },
  { value: "option33", label: "2026年" },
  { value: "option34", label: "2027年" },
];
</script>
<style scoped lang="scss">
.centerBottomCompRef {
  height: 120px;
  background-color: rgb(0, 0, 0, 0);
  position: absolute;
  width: 100%;
  bottom: 0;
}

.bottom_item_wrapper {
  width: 100%;
  // height: 100%;
  // height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: flex-end;
  position: absolute;
  // top: 60%;
  left: 0;
  bottom: 0;

  .bottom_item {
    // width: 176px;
    // height: 54px;
    cursor: pointer;

    &:hover {
      .bingo_video {
        transform: translateY(-10px);
        transform: scale(1.1) translateY(-10px);
      }

      .bottom_item_btn_default {
        display: none;
      }

      .bottom_item_btn_press {
        display: block;
        transform: translateY(-10px);
        transform: scale(1.1) translateY(-10px);
      }
    }

    .bottom_item_btn_default {
      display: block;
      width: 176px;
      height: 54px;
      background-size: contain;
      background-repeat: no-repeat;
    }

    .bottom_item_btn_press {
      display: none;
      width: 176px;
      height: 54px;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}

.index_box {
  width: 100%;
  margin-top: -32px;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}

//左边 右边 结构一样
.contetn_left,
.contetn_right {
  z-index: 1;
  display: flex;
  gap: 10px;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 430px;
}

.contetn_center {
  position: relative;
  flex: 1;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
