<script setup lang="ts">
import EchartContainer from "@/utils/echarts/echartContainer.vue";
import { EchartsUI, useEcharts } from "@/utils/echarts";
import { ref, onMounted, nextTick, toRaw } from "vue";
import { graphic } from "echarts/core";
const EchartContainerRef = ref(); //组件实例
const { renderEcharts, getchartInstance } = useEcharts(EchartContainerRef);
const option = ref({});
const curInstance: any = ref(null);
const getData = () => {
  const data = {
    dateList: [
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
    yData: [22, 25, 23, 28, 30, 27, 26, 25, null, null, null, null],
    yData2: [
      4132,
      4211,
      4313,
      4143,
      4222,
      4231,
      4151,
      4326,
      null,
      null,
      null,
      null,
    ],
    yData3: [
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      4226,
      4116,
      4215,
      4333,
      4145,
    ],
  };
  setOption(data.dateList, data.yData, data.yData2, data.yData3);
};

const setOption = async (
  xData: any[],
  yData: any[],
  yData2: any[],
  yData3: any[]
) => {
  const findNullIndex = yData2.findIndex((item) => item === null);
  option.value = {
    grid: {
      show: true,
      left: "0px",
      right: "0px",
      bottom: "0px",
      top: "50px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
      formatter: function (params: any) {
        // 添加单位
        let result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.seriesName == "绿证价格") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(25, 181, 255, 1);"></span>`;
            item.marker = mark;
            result += `${item.marker} ${item.seriesName} : ${
              item.value ? `${item.value}元</br>` : "- </br>"
            }`;
          } else if (item.seriesName == "电量") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 163, 33, 1);"></span>`;
            item.marker = mark;
            result += `${item.marker} ${item.seriesName} : ${
              item.value ? `${item.value}万千瓦时</br>` : "- </br>"
            }`;
          } else if (item.seriesName == "电量预测") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 105, 59, 1);"></span>`;
            item.marker = mark;
            result += `${item.marker} ${item.seriesName} : ${
              item.value ? `${item.value}万千瓦时</br>` : "- </br>"
            }`;
          } else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      },
    },
    legend: {
      data: [
        {
          name: "绿证价格",
          itemStyle: {
            opacity: 0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "电量",
          itemStyle: {
            opacity: 0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "电量预测",
          itemStyle: {
            opacity: 0,
          },
          textStyle: {
            color: "#fff",
          },
        },
      ],
    },
    xAxis: {
      type: "category",
      data: xData,
      boundaryGap: false, // 不留白，从原点开始
      splitLine: {
        show: !true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        // fontWeight: "500",
        interval: 0, // 设置成 0 强制显示所有标签
      },
    },
    yAxis: [
      {
        type: "value",
        name: "绿证价格(元)",
        max: function (value: any) {
          return value.max + 20;
        },
        // min: function (value: any) {
        //     return value.min - 10;
        // },
        position: "left",
        nameTextStyle: {
          color: "#fff",
          padding: [0, 0, 0, 30],
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
          fontWeight: "500",
        },
      },

      {
        type: "value",
        position: "right",
        max: function (value: any) {
          return value.max + 2000;
        },
        // min: function (value: any) {
        //     return value.min - 1000;
        // },
        name: "电量(万千瓦时)",
        nameTextStyle: {
          color: "#fff",
          // align: 'right'
        },
        alignTicks: true,
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
          fontWeight: "500",
        },
      },
    ],
    series: [
      {
        data: yData,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "绿证价格",
        lineStyle: {
          color: "rgba(25, 181, 255, 1)",
          width: 2,
        },
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(25, 181, 255, .7)",
              },
              {
                offset: 1,
                color: "rgba(25, 181, 255,.0)",
              },
            ],
            false
          ),
        },
      },
      {
        data: yData2,
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        symbol: "none", //去除点
        name: "电量",
        lineStyle: {
          width: 2,
          color: "rgba(255, 163, 33, 1)",
        },
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(255, 163, 33, 1)",
              },
              {
                offset: 1,
                color: "rgba(9,202,243,.0)",
              },
            ],
            false
          ),
        },
        markLine: {
          symbol: ["none", "none"],
          slient: true,
          lineStyle: {
            color: "rgba(112, 158, 227, 1)",
            width: 2,
          },
          label: { show: false },
          data: [{ xAxis: findNullIndex - 1 }],
        },
      },
      {
        data: yData3,
        type: "line",
        yAxisIndex: 1,
        smooth: true,
        symbol: "none", //去除点
        name: "电量预测",
        color: "rgba(255, 105, 59, 1)",
        lineStyle: {
          type: "dotted",
          width: 2,
        },
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(255, 105, 59, 1)",
              },
              {
                offset: 1,
                color: "rgba(9,202,243,.0)",
              },
            ],
            false
          ),
        },
      },
    ],
  };
  /** 初始化图表 */
  EchartContainerRef.value.initData(toRaw(option.value));
};
onMounted(async () => {
  await nextTick();
  getData();
  setTimeout(() => {
    const data = {
      dateList: [
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
      yData: [122, 215, 213, 281, 130, 127, 26, 25, null, null, null, null],
      yData2: [
        4132,
        4211,
        4313,
        4143,
        4222,
        4231,
        4151,
        4326,
        null,
        null,
        null,
        null,
      ],
      yData3: [
        null,
        null,
        null,
        null,
        null,
        null,
        null,
        4226,
        4116,
        4215,
        4333,
        4145,
      ],
    };
    setOption(data.dateList, data.yData, data.yData2, data.yData3);
  }, 3000);
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <EchartContainer ref="EchartContainerRef" />
  </div>
</template>

<style scoped lang="scss"></style>
