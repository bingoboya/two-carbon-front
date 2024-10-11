<template>
  <div style="width: 100%; height: 100%">
    <EchartsUI ref="EchartContainerRef" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { graphic } from "echarts/core";
import { EchartsUI, useEcharts } from "@/utils/echarts";
const EchartContainerRef = ref(); //组件实例
const { renderEcharts, getchartInstance } = useEcharts(EchartContainerRef);
const props = defineProps({
  dataList: {
    type: Object,
    default: () => {},
  },
});

const VALUE = [
  2080.7,
  1624.93,
  2120.33,
  1842.89,
  1743.83,
  1743.83,
  1882.54,
  1823.09,
  null,
  null,
  null,
  null,
];
const LineVALUE = [
  27.75,
  21.67,
  28.28,
  24.58,
  23.26,
  23.26,
  25.11,
  24.32,
  null,
  null,
  null,
  null,
];

const newOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
    backgroundColor: "rgba(0,0,0,.6)",
    borderColor: "rgba(147, 235, 248, .8)",
    textStyle: {
      color: "#FFF",
    },
    formatter: function (params: any) {
      // 添加单位
      var result = params[0].name + "<br>";
      params.forEach(function (item: any) {
        if (item.value) {
          if (item.seriesName == "产量") {
            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:orange;"></span>`;
            result +=
              marker + " " + item.seriesName + " : " + item.value + "万吨</br>";
          } else if (item.seriesName == "电力") {
            const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#029ED9;"></span>`;
            result +=
              marker +
              " " +
              item.seriesName +
              " : " +
              item.value +
              "万千瓦时</br>";
          }
        } else {
          result += item.marker + " " + item.seriesName + " :  - </br>";
        }
      });
      return result;
    },
  },
  legend: {
    top: -4,
    data: [
      {
        name: "电力",
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "产量",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
    ],
  },
  grid: {
    left: "10px",
    right: "8px",
    bottom: "0px",
    top: "40px",
    borderColor: "#1F63A3",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: [
      "1月",
      "2月",
      "3月",
      "4月",
      "5月",
      "6月",
      "7月",
      "8月",
      "9月",
      "10月",
      "11月",
      "12月",
    ],
    axisTick: {
      show: true,
      alignWithLabel: true,
    },
    // axisLine: {
    //     show: true,
    //     lineStyle: {
    //         width: 2,
    //         color: '#2B7BD6',
    //     },
    // },
    // axisLabel: {
    //     // fontSize: 14,
    //     interval: 0 // 设置成 0 强制显示所有标签
    // },
    axisLabel: {
      color: "#7EB7FD",
      // fontWeight: "500",
      interval: 0, // 设置成 0 强制显示所有标签
    },
  },
  yAxis: [
    {
      type: "value",
      name: "电力(万千瓦时)",
      position: "left",
      nameTextStyle: {
        color: "#fff",
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163, 1)",
        },
      },
      axisLabel: {
        show: true,
        color: "#fff",
        // color: "#7EB7FD",
        fontWeight: "500",
      },

      // boundaryGap: ['20%', '20%'],
    },
    {
      type: "value",
      position: "right",
      name: "产量(万吨)",
      alignTicks: true,
      nameTextStyle: {
        color: "#fff",
        // align: 'left'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163, 1)",
        },
      },
      axisLabel: {
        show: true,
        color: "#fff",
        // color: "#7EB7FD",
        fontWeight: "500",
      },
      // boundaryGap: ['20%', '20%'],
    },
  ],
  series: [
    {
      name: "电力",
      barMinHeight: 10,
      type: "pictorialBar",
      barCategoryGap: "60%",
      // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
      symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
      itemStyle: {
        //barBorderRadius: 5,
        //渐变色
        color: new graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: "#01EAED",
          },
          {
            offset: 0.5,
            color: "#02C4DD",
          },
          {
            offset: 1,
            color: "#029ED9",
          },
        ]),
      },
      data: VALUE,
    },
    {
      name: "产量",
      type: "line",
      yAxisIndex: 1,
      smooth: true,
      showAllSymbol: true,
      symbol: "circle",
      symbolSize: 0,
      // itemStyle: {
      //     color: '#fff',
      //     shadowColor: '#5ce0e2',
      //     shadowBlur: 20,
      //     borderColor: '#5ce0e2',
      //     borderWidth: 5,
      // },
      lineStyle: {
        width: 1,
        color: "orange",
        shadowColor: "orange",
        shadowBlur: 10,
      },
      data: LineVALUE,
      areaStyle: {
        //区域填充样式
        //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
        color: new graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: "rgba(25,163,223,.3)",
            },
            {
              offset: 1,
              color: "rgba(25,163,223, 0)",
            },
          ],
          false
        ),
        shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
        shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
      },
    },
  ],
};

const curInstance: any = ref(null);
watch(
  () => toRaw(props.dataList),
  async (newValue) => {
    await nextTick();
    console.log("props.dataList", newValue);
    const { yList } = newValue;
    const lineOneValue = yList.find(
      (item: any) => item.dataName === "电力"
    )?.dataList;
    const lineTwoValue = yList.find(
      (item: any) => item.dataName === "产量"
    )?.dataList;
    if (curInstance.value === null) {
      curInstance.value = getchartInstance();
      /** 接口数据更新，判断是否有图表实例 ？没有->初始化图表 */
      const series = [
        {
          name: "电力",
          barMinHeight: 10,
          type: "pictorialBar",
          barCategoryGap: "60%",
          // symbol: 'path://M0,10 L10,10 L5,0 L0,10 z',
          symbol: "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
          itemStyle: {
            //barBorderRadius: 5,
            //渐变色
            color: new graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: "#01EAED",
              },
              {
                offset: 0.5,
                color: "#02C4DD",
              },
              {
                offset: 1,
                color: "#029ED9",
              },
            ]),
          },
          data: lineOneValue,
        },
        {
          name: "产量",
          type: "line",
          yAxisIndex: 1,
          smooth: true,
          showAllSymbol: true,
          symbol: "circle",
          symbolSize: 0,
          // itemStyle: {
          //     color: '#fff',
          //     shadowColor: '#5ce0e2',
          //     shadowBlur: 20,
          //     borderColor: '#5ce0e2',
          //     borderWidth: 5,
          // },
          lineStyle: {
            width: 1,
            color: "orange",
            shadowColor: "orange",
            shadowBlur: 10,
          },
          data: lineTwoValue,
          areaStyle: {
            //区域填充样式
            //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
            color: new graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(25,163,223,.3)",
                },
                {
                  offset: 1,
                  color: "rgba(25,163,223, 0)",
                },
              ],
              false
            ),
            shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
            shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
          },
        },
      ];
      renderEcharts({
        ...newOption,
        series,
      });
    } else {
      /** 接口数据更新，判断是否有图标实例 ？有->直接更新图表数据 */
      renderEcharts(
        {
          series: [
            {
              // 根据名字对应到相应的系列
              name: "电力",
              data: lineOneValue,
            },
            {
              // 根据名字对应到相应的系列
              name: "产量",
              data: lineTwoValue,
            },
          ],
        },
        false
      );
    }
  }
);
onMounted(() => {
  /** 初始化图表, 如果接口返回慢，先不填写具体数值，只是初始化一个图标框架 */
  renderEcharts(newOption);
});
</script>
<style scoped lang="scss"></style>
