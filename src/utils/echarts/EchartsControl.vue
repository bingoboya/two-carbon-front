<template>
  <div ref="domBox" :style="{ width, height }">
    <div ref="domRef" :style="{ width, height }" />
  </div>
</template>

<script lang="ts" setup>
import { watch, ref, onMounted, onUnmounted, nextTick } from "vue";

import type { ECharts } from "echarts/core";
import { graphic } from "echarts/core";
import { replaceVarStrings, useTheme } from "./utils";
import echarts from "./echarts";
const props = defineProps({
  width: {
    type: String,
    default: "100%",
  },
  height: {
    type: String,
    default: "100%",
  },
  // lazy: {
  //     type: Boolean,
  //     default: false,
  // },
  options: {
    type: Object,
    default: null,
  },
});
// const { isDark } = useTheme()

const domRef = ref(null);
const domBox = ref(null);
let chartObj: null | ECharts = null;
let observer: null | MutationObserver = null; // dom 监听
// 初始化
const init = () => {
  chartObj = echarts.init(domRef.value) as any;
};
onMounted(async () => {
  await nextTick();
  if (!domRef.value) return;
  init();
  // if (props.lazy) return
  drawOption();
  // observer = new MutationObserver((mutationsList) => {
  //     for (const mutation of mutationsList)
  //         if (mutation.target === domBox.value) resize()
  // })
  // nextTick(() => {
  //     domBox.value && (observer as MutationObserver).observe(domBox.value, {
  //         attributes: true,
  //         childList: false,
  //         characterData: true,
  //         subtree: true
  //     })
  // })
});

watch(
  () => props.options,
  () => {
    console.log("watch-option");
    drawOption();
    // !props.lazy && drawOption();
  }
);
// watch(() => isDark.value, () => !props.lazy && drawOption())

// 绘制方法
const drawOption = (options = props.options) => {
  if (!chartObj) return;
  if (options) {
    console.log("请传入 options2", options);

    chartObj.hideLoading();
    console.time("耗时");
    const newObj = replaceVarStrings(options);
    console.timeEnd("耗时");
    console.time("setOption耗时");

    chartObj.setOption(newObj);
    console.timeEnd("setOption耗时");
  } else {
    console.log("请传入 options", options);

    chartObj.clear();
    chartObj.showLoading({
      text: "",
      color: "#409eff",
      textColor: "#000",
      maskColor: "rgba(255, 255, 255, .95)",
      zlevel: 0,
      lineWidth: 2,
    });
  }
};

// 重绘 自适应尺寸
const resize = () => {
  chartObj?.resize();
};
onUnmounted(() => {
  if (chartObj) {
    chartObj.dispose();
    chartObj = null;
  }
  // observer?.disconnect();
});
defineExpose({
  drawOption,
  resize,
  init,
});
</script>
