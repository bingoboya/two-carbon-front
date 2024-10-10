<template>
  <div class="index_box" >
    <!-- 第二级页面主体 -->
    <div ref="contentLeftComp" class="contetn_left">
      <div style="height: 20px;display: flex; gap: 4px;"></div>
      <ItemWrap :backgroundImg="底部长bg"class="contetn_left-top " titlebg="headImg" :titleImg="headImg" title="碳排放量情况">
        <LeftTop />
      </ItemWrap>
      <ItemWrap :backgroundImg="底部长bg" class="contetn_left-center " titlebg="headImg" :titleImg="headImg" title="电量-产量情况">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap :backgroundImg="底部长bg"  titlebg="headImg" :titleImg="headImg" title="工序能流分析" >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap ref="centerMapRef" class="centermapComp" style="flex: 1;" />
      <div ref="centerBottomCompRef" class="centerBottomCompRef"
       style="transform: translate(0px, 0px);height:120px;
       background-color: rgb(0,0,0,0);
        position: absolute; bottom: 0px;width: 100%;
       "
       >
        <div style="position: relative;width: 120%; height: 100%;left: 50%; transform: translateX(-50%);">
          <video v-if="showVideo" autoplay loop muted width="100%" style="position: absolute; width: 100% !important;">
            <source src="/src/assets/webm/bottombgwebm.webm" type="video/webm" />
          </video>
        </div>
        <div class="bottom_item_wrapper">
          <div @mouseenter="enterBottomBtn('酸轧')" @mouseleave="leaveBottomBtn('酸轧')" @click="routerGo('酸轧')" class="bottom_item" >
            <div class="bottom_item_btn_default" >
              <img :src="getImageUrl('酸轧按钮_default')" alt="">
            </div>
            <div class="bottom_item_btn_press" >
              <img :src="getImageUrl('酸轧按钮_press')" alt="">
            </div>
          </div>
          <div @mouseenter="enterBottomBtn('连退')" @mouseleave="leaveBottomBtn('连退')" @click="routerGo('连退')" class="bottom_item" >
            <div class="bottom_item_btn_default" >
              <img :src="getImageUrl('连退按钮_default')" alt="">
            </div>
            <div class="bottom_item_btn_press" >
              <img :src="getImageUrl('连退按钮_press')" alt="">
            </div>
          </div>
          <div @mouseenter="enterBottomBtn('电镀(精整)')" @mouseleave="leaveBottomBtn('电镀(精整)')" @click="routerGo('电镀(精整)')" class="bottom_item" >
            <div class="bottom_item_btn_default" >
              <img :src="getImageUrl('电镀精整按钮_default')" alt="">
            </div>
            <div class="bottom_item_btn_press" >
              <img :src="getImageUrl('电镀精整按钮_press')" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div  ref="contentRightComp" class="contetn_right">
      <div style="height: 20px;display: flex; flex-direction: row; justify-content: space-between;align-items: center">
        <CusTomSelect 
          v-model="selectedValue"
          :width="'84px'"
          :options="options"
        />
        <div class="returnBtn" @click="router.go(-1)"></div>
      </div>
      <ItemWrap :backgroundImg="底部长bg"  titlebg="headImg" :titleImg="headImg" title="碳排占比">
          <RightTop />
      </ItemWrap>
      <ItemWrap :backgroundImg="底部长bg"  titlebg="headImg" :titleImg="headImg" title="电量预测分析" >
        <RightCenter />
      </ItemWrap>
      <ItemWrap :backgroundImg="底部长bg"  titlebg="headImg" :titleImg="headImg" title="碳排预测分析 ">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>
<script setup lang="ts">
import { bengangsecondpage } from "@/api";
import 底部长bg from "@/assets/bgpng/底部长bg.png";
import headImg from '@/assets/bgpng/头部2.png'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { gsap } from 'gsap';
import ItemWrap from "@/components/item-wrap";
import CusTomSelect from '@/components/CusTomSelect.vue'
import { LeftTop,
    LeftBottom,
    CenterMap,
    RightBottom,
    RightCenter,
    LeftCenter,
    RightTop,
  } from "./index";
const showVideo = ref(true)

const selectedValue = ref('');
const router = useRouter()
const routerGo = (name: any) => {
  router.push({ path: 'third', query: { typename: name }})
}
const getImageUrl = (name: any = '本浦冷轧2重卷机组按钮_default') => {
  // 注意URL里面不能是纯变量，那样就会报错了 详细的报错 你可以去试试看 https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  const a = new URL(`/src/assets/bgpng/${name}.png`, import.meta.url).href
  return a
}
const getData = async () => {
  console.log("getData-bengangfirstpage");
  const res = await bengangsecondpage();
  if (res) {
    if (res.success) {
      console.log(res);
    } else {
      console.log(res);
    }
  }
};
const centerMapRef: any = ref<HTMLDivElement | null>(null)
const contentLeftComp = ref<HTMLDivElement | null>(null)
const contentRightComp = ref<HTMLDivElement | null>(null)
const centerBottomCompRef = ref<HTMLDivElement | null>(null)
const enterBottomBtn = (name: any) => {
  // console.log('enterBottomBtn', name, centerMapRef.value)
  centerMapRef.value?.callBackFunc(name, 'enter')
}
const leaveBottomBtn = (name: any) => {
  // console.log('leaveBottomBtn', name, centerMapRef.value)
  centerMapRef.value?.callBackFunc(name, 'leave')
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
const returnPlaying = async () => {
  // console.log('returnPlaying----------');
  if (document.hidden) {
      showVideo.value = false
    } else {
      showVideo.value = true
    }
}
onMounted(async () => {
  await getData();
  await nextTick()
  animateDivs();
  document.addEventListener('visibilitychange', async () => {
    if (document.hidden) {
      showVideo.value = false
    } else {
      showVideo.value = true
    }
  });
});
onUnmounted(() => {
  document.removeEventListener('visibilitychange', returnPlaying);
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
  console.log('index---', to, from)
  // next()
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
.returnBtn {
  width: 66px;
  height: 28px;
  cursor: pointer;
  background-image: url('/src/assets/bgpng/return_btn_default.png');
  background-repeat: round;
  &:hover {
    background-image: url('/src/assets/bgpng/return_btn_press.png');
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
  .bottom_item{
    // width: 176px;
    // height: 54px;
    cursor: pointer;
    &:hover{
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
  position: relative;
  flex: 1;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}


</style>







