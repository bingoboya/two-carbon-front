

<template>
  <div class="index-box" style="margin-top: -50px;">
    <!-- 第二级页面主体 -->
    <div class="contetn_left">
      <div style="height: 20px;display: flex; gap: 4px;">
        <span>工艺</span>/
        <span>工序</span>/
        <span>排放检测</span>
      </div>
      <ItemWrap class="contetn_left-top " title="碳排放量情况">
        <LeftTop />
      </ItemWrap>
      <ItemWrap  class="contetn_left-bottom " title="产量情况" >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <!-- <CenterMap title="设备分布图" /> -->
      <CenterMap style="flex: 2;" />
      <ItemWrap  class="contetn_center-bottom" title="用电情况">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <div style="height: 20px;display: flex; flex-direction: row; justify-content: space-between;align-items: center">
        <CusTomSelect 
          v-model="selectedValue"
          :width="'84px'"
          :options="options"
          placeholder="请选择"
        />
        <div><button @click="router.go(-1)">返回</button></div>
      </div>
      <ItemWrap  class="contetn_left-bottom " title="能耗预测分析" >
        <RightCenter />
      </ItemWrap>
      <ItemWrap  class="contetn_left-bottom " title="碳排预测分析 ">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import CusTomSelect from './CusTomSelect.vue'

import { LeftTop,
    LeftBottom,
    CenterMap,
    CenterBottom,
    RightBottom,
    RightCenter } from "./index";

    import { useRouter } from 'vue-router'
import { ref } from "vue";
const router = useRouter()
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
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  z-index: 1;
  display: flex;gap: 10px;
  flex-direction: column;
  // justify-content: space-around;
  gap: 10px;
  position: relative;
  width: 430px;
  box-sizing: border-box;
  flex-shrink: 0;
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







