<template>
  <div style="width: 100%; height: 100%">
    <v-chart class="chart"  @mouseover="mouseoverFun"
    autoresize style="width: 100%; height: 100%" :option="option" v-if="JSON.stringify(option) != '{}'" />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive} from "vue";
import { countUserNum } from "@/api";
// 监听鼠标事件，实现饼图选中效果（单选），近似实现高亮（放大）效果。
let selectedIndex = '';
let hoveredIndex = '';
const option = ref({});
const state: any = reactive({
  data: []
});
// TODO
// 生成扇形的曲面参数方程，用于 series-surface.parametricEquation
function getParametricEquation(
  startRatio: any,
  endRatio: any,
  isSelected: any,
  isHovered: any,
  k: any,
  h: any
) {
  // 计算
  let midRatio = (startRatio + endRatio) / 2;

  let startRadian = startRatio * Math.PI * 2;
  let endRadian = endRatio * Math.PI * 2;
  let midRadian = midRatio * Math.PI * 2;

  // 如果只有一个扇形，则不实现选中效果。
  // if (startRatio === 0 && endRatio === 1) {
  //     isSelected = false;
  // }
  isSelected = false;
  // 通过扇形内径/外径的值，换算出辅助参数 k（默认值 1/3）
  k = typeof k !== "undefined" ? k : 1 / 3;

  // 计算选中效果分别在 x 轴、y 轴方向上的位移（未选中，则位移均为 0）
  let offsetX = isSelected ? Math.sin(midRadian) * 0.1 : 0;
  let offsetY = isSelected ? Math.cos(midRadian) * 0.1 : 0;

  // 计算高亮效果的放大比例（未高亮，则比例为 1）
  let hoverRate = isHovered ? 1.05 : 1;

  // 返回曲面参数方程
  return {
    u: {
      min: -Math.PI,
      max: Math.PI * 3,
      step: Math.PI / 32,
    },

    v: {
      min: 0,
      max: Math.PI * 2,
      step: Math.PI / 20,
    },

    x: function (u: any, v: any) {
      if (u < startRadian) {
        return (
          offsetX +
          Math.cos(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetX +
          Math.cos(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetX + Math.cos(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    y: function (u: any, v: any) {
      if (u < startRadian) {
        return (
          offsetY +
          Math.sin(startRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      if (u > endRadian) {
        return (
          offsetY +
          Math.sin(endRadian) * (1 + Math.cos(v) * k) * hoverRate
        );
      }
      return offsetY + Math.sin(u) * (1 + Math.cos(v) * k) * hoverRate;
    },

    z: function (u: any, v: any) {
      if (u < -Math.PI * 0.5) {
        return Math.sin(u);
      }
      if (u > Math.PI * 2.5) {
        return Math.sin(u) * h * 0.1;
      }
      return Math.sin(v) > 0 ? 1 * h * 0.1 : -1;
    },
  };
}

// 生成模拟 3D 饼图的配置项
function getPie3D(pieData: any, internalDiameterRatio: any) {
  let series: any = [];
  let sumValue = 0;
  let startValue = 0;
  let endValue = 0;
  let legendData = [];
  let k =
    typeof internalDiameterRatio !== "undefined"
      ? (1 - internalDiameterRatio) / (1 + internalDiameterRatio)
      : 1 / 3;

  // 为每一个饼图数据，生成一个 series-surface 配置
  for (let i = 0; i < pieData.length; i++) {
    sumValue += pieData[i].value;

    let seriesItem: any = {
      name:
        typeof pieData[i].name === "undefined"
          ? `series${i}`
          : pieData[i].name,
      type: "surface",
      parametric: true,
      wireframe: {
        show: false,
      },
      pieData: pieData[i],
      pieStatus: {
        selected: false,
        hovered: false,
        k: 1 / 10,
      },
    };

    if (typeof pieData[i].itemStyle != "undefined") {
      let itemStyle: any = {};

      typeof pieData[i].itemStyle.color != "undefined"
        ? (itemStyle.color = pieData[i].itemStyle.color)
        : null;
      typeof pieData[i].itemStyle.opacity != "undefined"
        ? (itemStyle.opacity = pieData[i].itemStyle.opacity)
        : null;

      seriesItem.itemStyle = itemStyle;
    }
    series.push(seriesItem);
  }

  // 使用上一次遍历时，计算出的数据和 sumValue，调用 getParametricEquation 函数，
  // 向每个 series-surface 传入不同的参数方程 series-surface.parametricEquation，也就是实现每一个扇形。
  for (let i = 0; i < series.length; i++) {
    endValue = startValue + series[i].pieData.value;

    series[i].pieData.startRatio = startValue / sumValue;
    series[i].pieData.endRatio = endValue / sumValue;
    series[i].parametricEquation = getParametricEquation(
      series[i].pieData.startRatio,
      series[i].pieData.endRatio,
      false,
      false,
      k,
      series[i].pieData.value
    );

    startValue = endValue;

    legendData.push(series[i].name);
  }

  // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: "mouseoutSeries",
    type: "surface",
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.1,
      color: "#E1E8EC",
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u: any, v: any) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u: any, v: any) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u: any, v: any) {
        return Math.cos(v) > 0 ? -0.5 : -5;
      },
    },
  });

  // // 补充一个透明的圆环，用于支撑高亮功能的近似实现。
  series.push({
    name: "mouseoutSeries",
    type: "surface",
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.1,
      color: "#E1E8EC",
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u: any, v: any) {
        return ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2;
      },
      y: function (u: any, v: any) {
        return ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2;
      },
      z: function (u: any, v: any) {
        return Math.cos(v) > 0 ? -5 : -7;
      },
    },
  });
  series.push({
    name: "mouseoutSeries",
    type: "surface",
    parametric: true,
    wireframe: {
      show: false,
    },
    itemStyle: {
      opacity: 0.1,
      color: "#E1E8EC",
    },
    parametricEquation: {
      u: {
        min: 0,
        max: Math.PI * 2,
        step: Math.PI / 20,
      },
      v: {
        min: 0,
        max: Math.PI,
        step: Math.PI / 20,
      },
      x: function (u: any, v: any) {
        return (
          ((Math.sin(v) * Math.sin(u) + Math.sin(u)) / Math.PI) * 2.2
        );
      },
      y: function (u: any, v: any) {
        return (
          ((Math.sin(v) * Math.cos(u) + Math.cos(u)) / Math.PI) * 2.2
        );
      },
      z: function (u: any, v: any) {
        return Math.cos(v) > 0 ? -7 : -7;
      },
    },
  });

  // 准备待返回的配置项，把准备好的 legendData、series 传入。
  let option = {
    // animation: false,
    legend: {
      orient: 'horizontal',
      // left: "50%",
      left: "center",
      itemWidth: 14,
      itemHeight: 14,
      right: "0",
      // bottom: "20",
      bottom: 0,
      padding: [0, 40],
      // itemGap: 20,
      align: 'auto',
      // icon:'diamond',
      data: legendData,
      textStyle: {
        fontSize: 8,
        color: "#ffffff",
        rich: {
          name: {
            fontSize: 14,
            color: "gray",
            width: 40,
            verticalAlign: 'center',
            padding: [2, 0, 0, 0]//上，右，下，左
          },
          value: {
            fontSize: 14,
            align: 'right',
            width: 22,
            verticalAlign: 'center',
            padding: [2, 0, 0, 0],
          },
          unit: {
            fontSize: 14,
            // width: 36,
            align: 'right',
            color: "#fff",
            verticalAlign: 'center',
            padding: [2, 10, 0, 0],
          },
          num: {
            fontSize: 14,
            width: 44,
            align: 'right',
            color: "#fff",
            verticalAlign: 'center',
            padding: [4, 10, 0, 0],
          },
        },
      },
      formatter: (name: any) => {
        let tarValue, tarUnit, tarNum
        for (let i = 0; i < state.data.length; i++) {
          if (state.data[i].name == name) {
            tarValue = state.data[i].value;
            tarUnit = state.data[i].unit;
            tarNum = state.data[i].num;
          }
        }
        const v = tarValue;
        const unit = tarUnit
        return [`{name|${name}} {value|${v}}{unit|${unit}} `].join('');
        // return [`{name|${name}} {value|${v}}{unit|${unit}} {num|${tarNum}}`].join('');
      },
    },
    tooltip: {
      formatter: (params: any) => {
        if (params.seriesName !== "mouseoutSeries") {
          return `${params.seriesName
            }<br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${params.color
            };"></span>${option.series[params.seriesIndex].pieData.value}`;
        }
      },
    },
    xAxis3D: {},
    yAxis3D: {},
    zAxis3D: {},
    grid3D: {
      viewControl: {
        autoRotate: true,
        projection: 'orthographic',
      },
      width: "100%",
      show: false, // 显示网格背景
      // left: '0',
      top: -52,
      boxHeight: 50,
      // boxWidth和boxDepth这两个属性值保持一致，才可以在调整饼图宽度的时候保持水平，不然就会歪歪扭扭
      boxWidth: 180,
      boxDepth: 180,

    },
    series: series,
  };
  return option;
}

const mouseoverFun = (params: any) => {
  // console.log('11111', params)
    // 准备重新渲染扇形所需的参数
    let isSelected;
    let isHovered;
    let startRatio;
    let endRatio;
    let k;

    // 如果触发 mouseover 的扇形当前已高亮，则不做操作
    if (hoveredIndex === params.seriesIndex) {
          return;
          // 否则进行高亮及必要的取消高亮操作
    } else {
      // 如果当前有高亮的扇形，取消其高亮状态（对 option 更新）
      if (hoveredIndex !== "") {
        // 从 option.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 false。
        isSelected = option.value.series[hoveredIndex].pieStatus.selected;
        isHovered = false;
        startRatio = option.value.series[hoveredIndex].pieData.startRatio;
        endRatio = option.value.series[hoveredIndex].pieData.endRatio;
        k = option.value.series[hoveredIndex].pieStatus.k;

        // 对当前点击的扇形，执行取消高亮操作（对 option.value 更新）
        option.value.series[hoveredIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.value.series[hoveredIndex].pieData.value
          );
        option.value.series[hoveredIndex].pieStatus.hovered = isHovered;

        // 将此前记录的上次选中的扇形对应的系列号 seriesIndex 清空
        hoveredIndex = "";
      }

      // 如果触发 mouseover 的扇形不是透明圆环，将其高亮（对 option.value 更新）
      if (params.seriesName !== "mouseoutSeries") {
        // 从 option.value.series 中读取重新渲染扇形所需的参数，将是否高亮设置为 true。
        isSelected = option.value.series[params.seriesIndex].pieStatus.selected;
        isHovered = true;
        startRatio = option.value.series[params.seriesIndex].pieData.startRatio;
        endRatio = option.value.series[params.seriesIndex].pieData.endRatio;
        k = option.value.series[params.seriesIndex].pieStatus.k;

        // 对当前点击的扇形，执行高亮操作（对 option.value 更新）
        option.value.series[params.seriesIndex].parametricEquation =
          getParametricEquation(
            startRatio,
            endRatio,
            isSelected,
            isHovered,
            k,
            option.value.series[params.seriesIndex].pieData.value + 5
          );
        option.value.series[params.seriesIndex].pieStatus.hovered = isHovered;

        // 记录上次高亮的扇形对应的系列号 seriesIndex
        hoveredIndex = params.seriesIndex;
      }

      // 使用更新后的 option，渲染图表
      // myChart.setOption(option);
    }
}

// // 监听点击事件，实现选中效果（单选）
// const clickFun = (params: any) => {
      
// } 

// const globaloutFunc = (params: any) => {
//   // 鼠标划出echarts的区域时响应
//   console.log('globaloutFunc', params)
// }


const getData = () => {
  countUserNum().then((res) => {
    if (res.success) {
      state.data = [
    {
      value: 36,
      name: '热轧',
      unit: '%',
      num: 2541,
      itemStyle: {
        color: "rgba(17, 95, 255, 1)",
      },
    },
    {
      value: 21,
      name: '冷轧',
      unit: '%',
      num: 25,
      itemStyle: {
        color: "rgba(9, 169, 243, 1)",
      },
    },
    {
      value: 16,
      name: '炼钢',
      unit: '%',
      num: 22354,
      itemStyle: {
        color: "rgba(17, 219, 231, 1)",
      },
    },
    {
      value: 10,
      name: '工艺',
      unit: '%',
      num: 254,
      itemStyle: {
        color: "rgba(0, 177, 151, 1)",
      },
    },
    {
      value: 10,
      name: '工艺1',
      unit: '%',
      num: 254,
      itemStyle: {
        color: "rgba(199, 181, 0, 1)",
      },
    },
    {
      value: 9,
      name: '工艺2',
      unit: '%',
      num: 254,
      itemStyle: {
        color: "rgba(231, 141, 0, 1)",
      },
    },
    {
      value: 4,
      name: '其他',
      unit: '%',
      num: 254,
      itemStyle: {
        color: "rgba(197, 77, 29, 1)",
      },
    },
    // {
    //   value: 61,
    //   name: '工艺4',
    //   unit: '%',
    //   num: 254,
    //   // itemStyle: {
    //     // color: "#1F9AA7",
    //   // },
    // }
    // {
    //   name: "代码安全",
    //   value: 11,
    // percent: 12,
    //   itemStyle: {
    //     color: "#F5B64C",
    //   },
    // },
      ]
      option.value = getPie3D(
        state.data,
            0.8
      );
    } else {
      console.log(res.msg)
    }
  }).catch(err => {
    console.log(err)
  });
};
getData();

</script>

<style scoped lang="scss"></style>
