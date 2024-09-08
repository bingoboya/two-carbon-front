<template>
  <div class="index-box">
    <!-- 第一级页面主体 -->
    <div ref="contentLeftComp" class="contetn_left">
      <div style="height: 20px;display: flex; gap: 4px;">
        <span>工艺</span>/
        <span>工序</span>/
        <span>排放检测</span>
      </div>
      <ItemWrap class="contetn_left-top " title="整体概览">
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center " title="碳排放量情况">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom " title="能源结构占比">
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <!-- <CenterMap title="设备分布图" /> -->
      <CenterMap class="centermapComp" style="flex: 2;" />

      <!--  -->
      <div ref="centerBottomCompRef" style="height:120px;background-color: rgb(0,0,0,0);">
        <div style="position: relative;width: 120%; height: 100%;left: 50%; transform: translateX(-50%);">
          <VideoPlayer :elId="4" :videoSrc="'/src/assets/webm/d底部背景动效.webm'" />
        </div>
        <div class="bottom_item_wrapper">
          <div @click="routerGo('高炉')" class="bottom_item" style="position: relative;">
              <VideoPlayer :elId="5" class="bottom_webm" :videoSrc="'/src/assets/webm/g高炉按钮_press.webm'" style="bottom: -20px;" />
          </div>
          <div @click="routerGo('炼钢')" class="bottom_item" style="position: relative;">
              <VideoPlayer :elId="6" class="bottom_webm" :videoSrc="'/src/assets/webm/g炼钢按钮_press.webm'" style="bottom: -20px;"/>
          </div>
          <div @click="routerGo('热轧')" class="bottom_item" style="position: relative;">
              <VideoPlayer :elId="7" class="bottom_webm" :videoSrc="'/src/assets/webm/g热轧按钮_press.webm'" style="bottom: -20px;"/>
          </div>
          <div @click="routerGo('冷轧')" class="bottom_item" style="position: relative;">
              <VideoPlayer :elId="8" class="bottom_webm" :videoSrc="'/src/assets/webm/g冷轧按钮_press.webm'" style="bottom: -20px;"/>
          </div>
          <div @click="routerGo('电镀锌')" class="bottom_item" style="position: relative;">
              <VideoPlayer :elId="9" class="bottom_webm" :videoSrc="'/src/assets/webm/g电镀锌按钮_press.webm'" style="bottom: -20px;"/>
          </div>
        </div>
      </div>
      <!--  -->

      <!-- 中间-底部
        <div ref="greenComp">
        <ItemWrap class="contetn_center-bottom" title="绿证消费策略">
          <div style="display: flex; width: 100%;height: 100%;">
            <div style="height: 100%; padding: 10px;">
              <div class="co2_wrap_bg">
                <div class="co2Icon_wrap">
                  <img :src="co2Icon" alt="">
                </div>
                <div class="money_icon_wrap">
                  <div class="money_icon_bg">
                    <div>
                      <img :src="moneyIcon" alt="">
                    </div>
                    <div style="display: flex; flex-direction: column;font-size: 14px;">
                      <div>当前绿证价格</div>
                      <div><span style="color:#91E4FF; font-size: 18px;">{{ 20 }} </span>&nbsp; 元</div>
                    </div>
                  </div>
                  <div class="money_icon_bg">
                    <div>
                      <img :src="moneyIcon" alt="">
                    </div>
                    <div style="display: flex; flex-direction: column;font-size: 14px;">
                      <div>近半年最低价</div>
                      <div><span style="color:#91E4FF; font-size: 18px;">{{ 22 }}</span>&nbsp; 元</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div style="flex: 1;">
              <CenterBottom />
            </div>
          </div>
        </ItemWrap>
      </div> -->
    </div>
    <div ref="contentRightComp" class="contetn_right">
      <div style="height: 20px;">
        <CusTomSelect v-model="selectedValue" :width="'84px'" :options="options" placeholder="请选择" />
      </div>
      <ItemWrap class="contetn_left-bottom " title="工艺碳排占比">
        <RightTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom " title="生产产量与单位产品碳排放量情况">
        <RightCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom " title=" 实际碳排放量与预测值对比">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import VideoPlayer  from '@/components/VideoPlayer.vue';
import ItemWrap from "@/components/item-wrap";
import CusTomSelect from './CusTomSelect.vue'
import { gsap } from 'gsap';
import {
  LeftTop,
  LeftBottom,
  CenterMap,
  // CenterBottom,
  RightBottom,
  RightCenter,
  LeftCenter,
  RightTop
} from "./index";
import { onMounted, ref } from 'vue';

const router = useRouter()
const routerGo = (name: any) => {
  router.push({ path: 'second', query: { typename: name }})
}
const contentLeftComp = ref<HTMLDivElement | null>(null)
const contentRightComp = ref<HTMLDivElement | null>(null)
const centerBottomCompRef = ref<HTMLDivElement | null>(null)
const greenComp = ref<HTMLDivElement | null>(null)
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
  if (greenComp.value) {
    // 获取domtwo的高度
    const height = greenComp.value.getBoundingClientRect().height;
    // 对domtwo进行向上移动的动画
    gsap.from(greenComp.value, { opacity: .1, y: height, duration: 2 });
  }
  gsap.fromTo('.centermapComp', { opacity: 0 }, { opacity: 1, duration: 3 });
};
onMounted(() => {
  animateDivs();
});
const animateDivsReverce = (calback: any) => {
  if (contentLeftComp.value) {
    const width = contentLeftComp.value.getBoundingClientRect().width; // x: -458
    gsap.to(contentLeftComp.value, { opacity: .1, x: -width, duration: 2 });
  }
  if (contentRightComp.value) {
    const width = contentRightComp.value.getBoundingClientRect().width; // x: 458
    gsap.to(contentRightComp.value, { opacity: .1, x: width, duration: 2 });
  }
  if (centerBottomCompRef.value) {
    const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458
    gsap.to(centerBottomCompRef.value, { y: height, duration: 2 });
  }
  if (greenComp.value) {
    // 获取domtwo的高度
    const height = greenComp.value.getBoundingClientRect().height;
    // 对domtwo进行向上移动的动画
    gsap.to(greenComp.value, { opacity: .1, y: height, duration: 2});
  }
  gsap.fromTo('.centermapComp', { opacity: 1 }, { opacity: 0, duration: 2, 
    onComplete: () => {
        console.log('动画完成2')
        calback()
      }
   });
};
onBeforeRouteLeave((to, from, next) => {
  console.log('index---', to, from)
  // const answer = window.confirm(
  //   'Do you really want to leave? you have unsaved changes!'
  // )
  // // 取消导航并停留在同一页面上
  // if (!answer) return false
  // if (centerBottomCompRef.value) {
  //   const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458
  //   gsap.to(centerBottomCompRef.value, { y: height, duration: 2, 
  //     onComplete: () => {
  //       console.log('动画完成')
  //       next()
  //     }
  //    });
  // }
  animateDivsReverce(next)
})
const selectedValue = ref('');
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
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
  .bottom_item{
    width: 176px;
    height: 90px;
    cursor: pointer;
    &:hover{
      .bottom_webm {
        // display: none;
        bottom: -15px !important;
      }
      // display: none;
    }
  }
}
.co2Icon_wrap {
  display: flex;
  justify-content: center;
  padding: 10px 0px;
}

.money_icon_wrap {
  display: flex;
  padding: 0 10px;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  gap: 10px;
}

.money_icon_bg {
  background: url('@/assets/icon/money_icon_bg.png');
  background-repeat: round;
  padding: 4px;
  display: flex;
}

.co2_wrap_bg {
  background: url('@/assets/icon/co2_wrap_bg.png');
  background-repeat: round;
  display: flex;
  height: 100%;
  padding: 10px;
  flex-direction: column;
  width: 180px;
}

.co2_icon {
  background: url('@/assets/icon/co2_icon.png');
}

.money_icon {
  background: url('@/assets/icon/money_icon.png');
}

.index-box {
  width: 100%;
  margin-top: -70px;
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
  flex: 1;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .contetn_center-bottom {
    flex: 1;
  }
}
</style>
