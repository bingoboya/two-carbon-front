

<template>
  <div class="index_box" >
    <!-- 第三级页面主体 -->
    <div ref="contentLeftComp" class="contetn_left">
      <div style="height: 20px;display: flex; gap: 4px;">
        <!-- <span>工艺</span>/
        <span>工序</span>/
        <span>排放检测</span> -->
      </div>
      <ItemWrap class="contetn_left-top " title="碳排放量情况">
        <LeftTop />
      </ItemWrap>
      <ItemWrap  class="contetn_left-center " title="用电情况">
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap ref="centermapCompRef" class="centermapComp" style="flex: 1;" />
      <div ref="centerBottomCompRef" class="centerBottomCompRef" style="transform: translate(0px, 0px);height:120px;background-color: rgb(0,0,0,0);">
        <div style="pointer-events: none; position: relative;width: 120%; height: 100%;left: 50%; transform: translateX(-50%);">
          <VideoPlayer :elId="41" :videoSrc="'/src/assets/webm/d底部背景动效.webm'" />
        </div>
        <div class="bottom_item_wrapper">
          <div @click="routerGo('酸轧')" class="bottom_item" >
            <div class="bottom_item_btn_default" :style="{ backgroundImage: `url('src/assets/bgpng/高炉按钮_default.png')` }"></div>
            <div class="bottom_item_btn_press" :style="{ backgroundImage: `url('src/assets/bgpng/高炉按钮_press.png')` }"></div>
          </div>
          <div @click="routerGo('连退')" class="bottom_item" >
            <div class="bottom_item_btn_default" :style="{ backgroundImage: `url('src/assets/bgpng/炼钢按钮_default.png')` }"></div>
            <div class="bottom_item_btn_press" :style="{ backgroundImage: `url('src/assets/bgpng/炼钢按钮_press.png')` }"></div>
          </div>
          <div @click="routerGo('电镀(精整)')" class="bottom_item" >
            <div class="bottom_item_btn_default" :style="{ backgroundImage: `url('src/assets/bgpng/热轧按钮_default.png')` }"></div>
            <div class="bottom_item_btn_press" :style="{ backgroundImage: `url('src/assets/bgpng/热轧按钮_press.png')` }"></div>
          </div>
        </div>
      </div>

    </div>
    <div ref="contentRightComp" class="contetn_right">
      <div style="height: 20px;display: flex; flex-direction: row; justify-content: space-between;align-items: center">
        <CusTomSelect 
          v-model="selectedValue"
          :width="'84px'"
          :options="options"
          placeholder="请选择"
        />
        <div><button @click="router.go(-1)">返回</button></div>
      </div>
      <ItemWrap  class="contetn_left-bottom " title="能耗预测分析">
        <RightTop />
      </ItemWrap>
      <ItemWrap  class="contetn_left-bottom " title="碳排预测分析" >
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import VideoPlayer  from '@/components/VideoPlayer.vue';
import { gsap } from 'gsap';
import ItemWrap from "@/components/item-wrap";
import CusTomSelect from './CusTomSelect.vue'
import { LeftTop,
    LeftBottom,
    CenterMap,
    RightBottom,
    RightTop
   } from "./index";
import { ref, onMounted } from "vue";
const selectedValue = ref('');
const router = useRouter()
const routerGo = (name: any) => {
  // router.push({ path: 'third', query: { typename: name }})
  getChildRefFun(name)
}
const centermapCompRef: any = ref<HTMLDivElement | null>(null)
const contentLeftComp = ref<HTMLDivElement | null>(null)
const contentRightComp = ref<HTMLDivElement | null>(null)
const centerBottomCompRef = ref<HTMLDivElement | null>(null)

const getChildRefFun = (name: any) => {
  console.log('getChildRef', centermapCompRef.value.getChildRef)
  centermapCompRef.value.getChildRef(name)
}

const animateDivs = () => {
  if (contentLeftComp.value) {
    const width = contentLeftComp.value.getBoundingClientRect().width; // x: -458
    gsap.from(contentLeftComp.value, { opacity: .1, x: -width, duration: 2 });
  }
  if (contentRightComp.value) {
    const width = contentRightComp.value.getBoundingClientRect().width; // x: 458
    gsap.from(contentRightComp.value, { opacity: .1, x: width, duration: 2 });
  }
  if (centerBottomCompRef.value) {
    const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458
    gsap.from(centerBottomCompRef.value, { y: height, duration: 2 });
  }
  
  gsap.fromTo('.centermapComp', { opacity: 0 }, { opacity: 1, duration: 3 });
};
onMounted(() => {
  animateDivs();
});
const animateDivsReverce = (calback: any) => {
  if (contentLeftComp.value) {
    const width = contentLeftComp.value.getBoundingClientRect().width; // x: -458
    gsap.to(contentLeftComp.value, { opacity: .1, x: -width, duration: 1 });
  }
  if (contentRightComp.value) {
    const width = contentRightComp.value.getBoundingClientRect().width; // x: 458
    gsap.to(contentRightComp.value, { opacity: .1, x: width, duration: 1 });
  }

  if (centerBottomCompRef.value) {
    const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458
    gsap.to(centerBottomCompRef.value, { y: height, duration: 1 });
  }
  gsap.fromTo('.centermapComp', { opacity: 1 }, { opacity: 0, duration: 1, 
    onComplete: () => {
        console.log('动画完成2')
        calback()
      }
   });
};
onBeforeRouteLeave((to, from, next) => {
  animateDivsReverce(next)
})
const options = [
  { value: 'option1', label: '2021年' },
  { value: 'option2', label: '2022年' },
  { value: 'option3', label: '2023年' },
  { value: 'option31', label: '2024年' },
  { value: 'option32', label: '2025年' },
  { value: 'option33', label: '2026年' },
  { value: 'option34', label: '2027年' },
];
</script>
<style scoped lang="scss">
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
  .bottom_item{
    // width: 176px;
    // height: 54px;
    cursor: pointer;
    &:hover{
      .bottom_item_btn_default {
        // background-image: url('@/assets/bgpng/炼钢按钮_press.png');
        // transform: translateY(-10px);
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
      // background-image: url('@/assets/bgpng/炼钢按钮_default.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
    .bottom_item_btn_press {
      display: none;
      width: 176px;
      height: 54px;
      // background-image: url('@/assets/bgpng/炼钢按钮_default.png');
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
.index_box {
  width: 100%;
  margin-top: -74px;
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







