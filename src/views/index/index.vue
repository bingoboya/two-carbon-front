

<template>
  <div class="index-box" style="margin-top: -50px;">
    <!-- 第一级页面主体 -->
    <div class="contetn_left">
      <!-- <div class="pagetab">
        <div class="item">实时监测</div>
        <div class="item">统计分析</div>
      </div> -->
      <ItemWrap class="contetn_left-top contetn_lr-item" style="background-repeat: round;" title="整体概览">
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="碳排放量情况">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="能源结构占比" >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap title="设备分布图" />
      <ItemWrap class="contetn_center-bottom" title="绿证消费策略" >
          <div style="display: flex; width: 100%;height: 100%;">
            <div style="height: 100%; padding: 10px;">
              <div class="co2_wrap_bg" >
                <div class="co2Icon_wrap">
                  <img :src="co2Icon" alt="">
                </div>
                <div class="money_icon_wrap" >
                  <div class="money_icon_bg" >
                    <div>
                      <img :src="moneyIcon" alt="">
                    </div>          
                    <div style="display: flex; flex-direction: column;font-size: 14px;">
                      <div>当前绿证价格</div>
                      <div><span style="color:#91E4FF; font-size: 18px;">{{ 20 }} </span>&nbsp; 元</div>
                    </div>           
                  </div>
                  <div class="money_icon_bg" >
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
            <div style="flex: 1;"><CenterBottom /></div>
          </div>
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="工艺碳排占比">
        <RightTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="生产产量与单位产品碳排放量情况">
        <RightCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title=" 实际碳排放量与预测值对比">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import co2Icon from '@/assets/icon/co2_icon.png'
import moneyIcon from '@/assets/icon/money_icon.png'
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";
</script>
<style scoped lang="scss">
.co2Icon_wrap{
  display: flex; justify-content: center; padding: 10px 0px;
}
.money_icon_wrap{
  display: flex; padding: 0 10px;flex-direction: column; justify-content: center; flex: 1; gap: 10px;
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
  display: flex;height: 100%; padding: 10px;
    flex-direction: column;width: 180px;
}
.co2_icon {
  background: url('@/assets/icon/co2_icon.png');
}
.money_icon {
  background: url('@/assets/icon/money_icon.png');
}
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  z-index:1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.contetn_center {
  flex: 1;
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  height: 310px;
}
</style>







