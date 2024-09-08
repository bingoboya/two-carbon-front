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
      </div>
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
import { useRouter } from 'vue-router'
import ItemWrap from "@/components/item-wrap";
import co2Icon from '@/assets/icon/co2_icon.png'
import moneyIcon from '@/assets/icon/money_icon.png'
import CusTomSelect from './CusTomSelect.vue'
import { gsap } from 'gsap';
import {
  LeftTop,
  LeftBottom,
  CenterMap,
  CenterBottom,
  RightBottom,
  RightCenter,
  LeftCenter,
  RightTop
} from "./index";
import { onMounted, ref } from 'vue';

const router = useRouter()
const contentLeftComp = ref<HTMLDivElement | null>(null)
const contentRightComp = ref<HTMLDivElement | null>(null)
const greenComp = ref<HTMLDivElement | null>(null)
const animateDivs = () => {
  if (contentLeftComp.value) {
    const width = contentLeftComp.value.getBoundingClientRect().width; // x: -458
    gsap.from(contentLeftComp.value, { opacity: .1, x: -width, duration: 2, lazy: true });
  }
  if (contentRightComp.value) {
    const width = contentRightComp.value.getBoundingClientRect().width; // x: 458
    gsap.from(contentRightComp.value, { opacity: .1, x: width, duration: 2, lazy: true });
  }
  if (greenComp.value) {
    // 获取domtwo的高度
    const height = greenComp.value.getBoundingClientRect().height;
    // 对domtwo进行向上移动的动画
    gsap.from(greenComp.value, { opacity: .1, y: height, duration: 2, lazy: true });
  }
  gsap.fromTo('.centermapComp', { opacity: 0 }, { opacity: 1, duration: 3, lazy: true });
};
onMounted(() => {
  animateDivs();
});
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
