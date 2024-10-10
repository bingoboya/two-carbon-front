<template>
  <div ref="ChartCpRef" :style="{ width, height }">
    <div ref="ChartRef" :style="{ width, height }" ></div>
  </div>
</template>
<script setup lang="ts">
/**
 * echart容器
 * 外部只关心写入配置
 * 组件关心的是自身大小的适应以及实例的销毁，以及提供一些常用的方法让外部调用
 */
import { ref, onUnmounted, onActivated, onMounted } from "vue";
import * as echarts from "echarts";
// import * as echarts from './echarts';

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
const ChartRef = ref(null);
const ChartCpRef = ref(null);
const otherContainer: any = {
  optionData: {},
  myChart: "",
};
/**
 * 初始化数据（外部调用）
 * 外部只关心图标的option数据，写入就行
 *  */
const initData = (data: any) => {
  otherContainer.optionData = data;
  initChart();
};
/** 重新计算图表大小 */
const resizeChart = () => {
  if (otherContainer.myChart) {
    otherContainer.myChart.resize();
  }
};
/** 当元素大小发生变化时 */
if (typeof ResizeObserver === "function") {
  let resizeObserver: any = new ResizeObserver(() => {
    if (!ChartCpRef.value) return;
    resizeChart();
  });
  onMounted(() => {
    resizeObserver.observe(ChartCpRef.value);
  });
}
/** 当屏幕缩放时 */
window.addEventListener("resize", resizeChart);
onUnmounted(() => {
  window.removeEventListener("resize", resizeChart);
  disposeChart();
});
onActivated(() => {
  resizeChart();
});
/** 初始化图表 */
const initChart = () => {
  if (otherContainer.myChart) {
    // 使用之前的图表
    otherContainer.myChart.setOption(otherContainer.optionData);
    otherContainer.myChart.resize();
  } else {
    otherContainer.myChart = echarts.init(ChartRef.value, null, {
      renderer: "svg",
    });
    otherContainer.myChart.setOption(otherContainer.optionData, true);
  }
};
/**
 * 销毁图表  (外部可调用)
 *  */
const disposeChart = () => {
  /** 销毁元素 */
  if (otherContainer.myChart) {
    otherContainer.myChart.dispose();
    otherContainer.myChart = "";
  }
};

defineExpose({
  ChartRef,
  initData,
  disposeChart,
  ChartCpRef,
});
</script>

<style lang="scss" scoped>

</style>
