<template>
  <div class="index_box">
    <!-- 第三级页面主体 -->
    <div ref="contentLeftComp" class="contetn_left">
      <div style="height: 20px; display: flex; gap: 4px">
        <!-- <span>工艺</span>/
        <span>工序</span>/
        <span>排放检测</span> -->
      </div>
      <ItemWrap
        class="contetn_left-top"
        titlebg="headImg"
        :titleImg="headImg"
        :backgroundImg="底部长bg"
        title="碳排放量情况"
      >
        <LeftTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-center"
        titlebg="headImg"
        :titleImg="headImg"
        :backgroundImg="底部长bg"
        title="用电情况"
      >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap
        ref="centerMapRef"
        @handlePopupClick="handlePopupClick"
        class="centermapComp"
        style="flex: 1"
      />
      <div
        ref="centerBottomCompRef"
        class="centerBottomCompRef"
        style="
          transform: translate(0px, 0px);
          height: 120px;
          background-color: rgb(0, 0, 0, 0);
        "
      >
        <div
          style="
            pointer-events: none;
            position: relative;
            width: 120%;
            height: 100%;
            left: 50%;
            transform: translateX(-50%);
          "
        >
          <video
            v-if="showVideo"
            autoplay
            loop
            muted
            width="100%"
            style="position: absolute; width: 100% !important"
          >
            <source
              src="/src/assets/webm/d底部背景动效.webm"
              type="video/webm"
            />
          </video>
        </div>
        <div class="bottom_item_wrapper">
          <div
            @mouseenter="enterBottomBtn('本浦冷轧2#重卷机组')"
            @mouseleave="leaveBottomBtn('本浦冷轧2#重卷机组')"
            @click="routerGo('本浦冷轧2#重卷机组')"
            class="bottom_item"
          >
            <div
              class="bottom_item_btn_default"
              :style="{
                backgroundImage: `url(${本浦冷轧2重卷机组按钮_default})`,
              }"
            ></div>
            <div
              class="bottom_item_btn_press"
              :style="{
                backgroundImage: `url(${本浦冷轧2重卷机组按钮_press})`,
              }"
            ></div>
          </div>
          <div
            @mouseenter="enterBottomBtn('本浦冷轧3#重卷机组')"
            @mouseleave="leaveBottomBtn('本浦冷轧3#重卷机组')"
            @click="routerGo('本浦冷轧3#重卷机组')"
            class="bottom_item"
          >
            <div
              class="bottom_item_btn_default"
              :style="{
                backgroundImage: `url(${本浦冷轧3重卷机组按钮_default})`,
              }"
            ></div>
            <div
              class="bottom_item_btn_press"
              :style="{
                backgroundImage: `url(${本浦冷轧3重卷机组按钮_default})`,
              }"
            ></div>
          </div>
          <div
            @mouseenter="enterBottomBtn('电镀锌机组')"
            @mouseleave="leaveBottomBtn('电镀锌机组')"
            @click="routerGo('电镀锌机组')"
            class="bottom_item"
          >
            <div
              class="bottom_item_btn_default"
              :style="{
                backgroundImage: `url(${电镀锌机组_default})`,
              }"
            ></div>
            <div
              class="bottom_item_btn_press"
              :style="{
                backgroundImage: `url(${电镀锌机组_press})`,
              }"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div ref="contentRightComp" class="contetn_right">
      <div
        style="
          height: 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        "
      >
        <CusTomSelect
          v-model="selectedValue"
          :width="'84px'"
          :options="options"
          placeholder="请选择"
        />
        <div class="returnBtn" @click="router.go(-1)"></div>
      </div>
      <ItemWrap
        class="contetn_left-bottom"
        titlebg="headImg"
        :titleImg="headImg"
        :backgroundImg="底部长bg"
        title="设备机组碳排占比"
      >
        <RightTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom"
        titlebg="headImg"
        :titleImg="headImg"
        :backgroundImg="底部长bg"
        title="碳排预测分析"
      >
        <RightBottom />
      </ItemWrap>
    </div>
  </div>

  <CusModal ref="cusmodalRef" :mountedOnBody="false">
    <template #content>
      <EquipmentComp />
    </template>
  </CusModal>
</template>

<script setup lang="ts">
import 底部长bg from "@/assets/bgpng/底部长bg.png";
import 本浦冷轧2重卷机组按钮_default from "@/assets/bgpng/本浦冷轧2重卷机组按钮_default.png";
import 本浦冷轧2重卷机组按钮_press from "@/assets/bgpng/本浦冷轧2重卷机组按钮_press.png";
import 本浦冷轧3重卷机组按钮_default from "@/assets/bgpng/本浦冷轧3重卷机组按钮_default.png";
import 本浦冷轧3重卷机组按钮_press from "@/assets/bgpng/本浦冷轧3重卷机组按钮_press.png";
import 电镀锌机组_default from "@/assets/bgpng/电镀锌机组_default.png";
import 电镀锌机组_press from "@/assets/bgpng/电镀锌机组_press.png";
import headImg from "@/assets/bgpng/头部2.png";
import headLongImg from "@/assets/bgpng/头部长2.png";
import titleHeadBg from "@/assets/bgpng/二级标题头部长bg.png";
import { onBeforeRouteLeave, useRouter } from "vue-router";
import { gsap } from "gsap";
import CusModal from "@/components/CusModal.vue";
import EquipmentComp from "@/components/EquipmentComp.vue";
import ItemWrap from "@/components/item-wrap";
import CusTomSelect from "@/components/CusTomSelect.vue";
import { LeftTop, LeftBottom, CenterMap, RightBottom, RightTop } from "./index";
import { ref, onMounted, nextTick, onUnmounted } from "vue";
const selectedValue = ref("");
const showVideo = ref(true);

const cusmodalRef: any = ref<HTMLDivElement | null>(null); // 使用ref引用弹窗组件实例
const handlePopupClick = async (popup: any) => {
  // 处理弹窗点击事件
  await nextTick();
  cusmodalRef.value.openModal(popup);
};

const router = useRouter();
const routerGo = (name: any) => {
  handlePopupClick(name);
};

const enterBottomBtn = (name: any) => {
  centerMapRef.value?.callBackFunc(name, "enter");
};
const leaveBottomBtn = (name: any) => {
  centerMapRef.value?.callBackFunc(name, "leave");
};

const centerMapRef: any = ref<HTMLDivElement | null>(null);
const contentLeftComp = ref<HTMLDivElement | null>(null);
const contentRightComp = ref<HTMLDivElement | null>(null);
const centerBottomCompRef = ref<HTMLDivElement | null>(null);

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
  animateDivsReverce(next);
});
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
.returnBtn {
  width: 66px;
  height: 28px;
  cursor: pointer;
  background-image: url("/src/assets/bgpng/return_btn_default.png");
  background-repeat: round;
  &:hover {
    background-image: url("/src/assets/bgpng/return_btn_press.png");
  }
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
  left: 50%;
  transform: translate(-50%, -100%);
  .bottom_item {
    // width: 176px;
    // height: 54px;
    cursor: pointer;
    &:hover {
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
      width: 290px;
      height: 54px;
      // background-image: url('@/assets/bgpng/炼钢按钮_default.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
    .bottom_item_btn_press {
      display: none;
      width: 290px;
      height: 54px;
      // background-image: url('@/assets/bgpng/炼钢按钮_default.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
.index_box {
  user-select: none;
  width: 100%;
  margin-top: -32px;
  // margin-top: -74px;
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
  z-index: 2;
  flex: 1;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
</style>
