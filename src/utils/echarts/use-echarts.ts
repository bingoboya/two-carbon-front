import type { Ref } from "vue";
import { computed, nextTick, ref, watch } from "vue";

import {
  tryOnUnmounted,
  useDebounceFn,
  useResizeObserver,
  useTimeoutFn,
  useWindowSize,
} from "@vueuse/core";

import echarts from "./echarts";
type EchartsThemeType = "dark" | "light" | null;

function useEcharts(chartRef: Ref<any>) {
  // console.log('useEcharts', chartRef);
  let chartInstance: echarts.ECharts | null = null;
  let cacheOptions: any = {};

  const isDark = ref(true);
  const { height, width } = useWindowSize();
  const resizeHandler: () => void = useDebounceFn(resize, 200);

  const getOptions = computed((): any => {
    // if (!isDark.value) {
    //   return cacheOptions;
    // }

    return {
      backgroundColor: "transparent",
      ...cacheOptions,
    };
  });

  const initCharts = (t?: EchartsThemeType) => {
    const el = chartRef?.value?.$el;
    if (!el) {
      return;
    }
    chartInstance = echarts.init(el, t || isDark.value ? "dark" : null, {
      renderer: "canvas",
    });

    return chartInstance;
  };

  const renderEcharts = (options: any, clear = true) => {
    // console.log('options1', options.series[0].data)
    cacheOptions = {
      backgroundColor: "transparent",
      animation: !false,
      ...options,
    };
    return new Promise((resolve) => {
      if (chartRef.value?.offsetHeight === 0) {
        useTimeoutFn(() => {
          renderEcharts(getOptions.value);
          // renderEcharts({backgroundColor: 'transparent', ...options});
          // console.log('options2', options.series[0].data, getOptions.value.series[0].data)
          resolve(null);
        }, 30);
        return;
      }
      nextTick(() => {
        useTimeoutFn(() => {
          if (!chartInstance) {
            const instance = initCharts();
            if (!instance) return;
          }
          clear && chartInstance?.clear();
          // chartInstance?.setOption(getOptions.value);
          chartInstance?.setOption(cacheOptions);
          // console.log('options3', options.series[0].data, getOptions.value.series[0].data)
          resolve(null);
        }, 30);
      });
    });
  };

  function resize() {
    // console.log('resize', width, height);
    chartInstance?.resize({
      animation: {
        duration: 300,
        easing: "quadraticIn",
      },
    });
  }

  function getchartInstance() {
    return chartInstance;
  }

  watch([width, height], () => {
    resizeHandler?.();
  });

  useResizeObserver(chartRef as never, resizeHandler);

  watch(isDark, () => {
    if (chartInstance) {
      chartInstance.dispose();
      initCharts();
      renderEcharts(cacheOptions);
      resize();
    }
  });

  tryOnUnmounted(() => {
    // 销毁实例，释放资源
    chartInstance?.dispose();
  });
  return {
    renderEcharts,
    resize,
    getchartInstance,
  };
}

export { useEcharts  };

// export type { EchartsUIType };
