<template>
  <div style="width: 100%; height: 100%">
    <EchartsUI ref="EchartContainerRef" />
  </div>
</template>
<script setup lang="ts">
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
const curInstance: any = ref(null);
const newOption = {
  grid: {
    show: true,
    left: "0px",
    right: "14px",
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
        if (item.seriesName == "实际电量") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(12, 246, 209, 1);"></span>`;
          item.marker = mark;
          result += `${item.marker} ${item.seriesName} : ${
            item.value ? `${item.value}万千瓦时</br>` : "- </br>"
          }`;
        } else if (item.seriesName == "预测电量") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(0, 235, 138, 1);"></span>`;
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
        name: "实际电量",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "预测电量",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
    ],
    top: -4,
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
    boundaryGap: false, // 不留白，从原点开始
    splitLine: {
      show: true,
      lineStyle: {
        color: "rgba(31,99,163,.2)",
      },
    },
    axisLine: {
      // show:false,
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
      name: "电量(万千瓦时)",
      position: "left",
      nameTextStyle: {
        color: "#fff",
        // align: 'left'
        padding: [0, 0, 0, 30],
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
    },
  ],
  series: [
    {
      data: [],
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none", //去除点
      name: "实际电量",
      lineStyle: {
        color: "rgba(12, 246, 209, 1)",
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
              color: "rgba(12, 246, 209, .7)",
            },
            {
              offset: 1,
              color: "rgba(12, 246, 209, 0)",
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
        // data: nullIndices.map((index: any) => ({
        //   xAxis: index
        // }))
        data: [{ xAxis: -1 }],
      },
    },
    {
      data: [],
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none", //去除点
      name: "预测电量",
      lineStyle: {
        type: "dotted",
        color: "rgba(0, 235, 138, 1)",
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
              color: "rgba(0, 235, 138, 1)",
            },
            {
              offset: 1,
              color: "rgba(9,202,243,0)",
            },
          ],
          false
        ),
      },
    },
  ],
};

watch(
  () => toRaw(props.dataList),
  async (newValue) => {
    await nextTick();
    console.log("props.dataList", newValue);

    const { yList } = newValue;
    const lineOneValue = yList.find(
      (item: any) => item.dataName === "实际电量"
    )?.dataList;
    const lineTwoValue = yList.find(
      (item: any) => item.dataName === "预测电量"
    )?.dataList;
    if (curInstance.value === null) {
      curInstance.value = getchartInstance();
      /** 接口数据更新，判断是否有图表实例 ？没有->初始化图表 */
      const series = [
        {
          data: lineOneValue,
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          symbol: "none", //去除点
          name: "实际电量",
          lineStyle: {
            color: "rgba(12, 246, 209, 1)",
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
                  color: "rgba(12, 246, 209, .7)",
                },
                {
                  offset: 1,
                  color: "rgba(12, 246, 209, 0)",
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
            // data: nullIndices.map((index: any) => ({
            //   xAxis: index
            // }))
            data: [
              {
                xAxis: lineOneValue.findIndex((item: any) => item === null) - 1,
              },
            ],
          },
        },
        {
          data: lineTwoValue,
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          symbol: "none", //去除点
          name: "预测电量",
          lineStyle: {
            type: "dotted",
            color: "rgba(0, 235, 138, 1)",
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
                  color: "rgba(0, 235, 138, 1)",
                },
                {
                  offset: 1,
                  color: "rgba(9,202,243,0)",
                },
              ],
              false
            ),
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
              name: "实际电量",
              data: lineOneValue,
              markLine: {
                symbol: ["none", "none"],
                slient: true,
                lineStyle: {
                  color: "rgba(112, 158, 227, 1)",
                  width: 2,
                },
                label: { show: false },
                // data: nullIndices.map((index: any) => ({
                //   xAxis: index
                // }))
                data: [
                  {
                    xAxis:
                      lineOneValue.findIndex((item: any) => item === null) - 1,
                  },
                ],
              },
            },
            {
              // 根据名字对应到相应的系列
              name: "预测电量",
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
  renderEcharts(newOption);
});
</script>

<style scoped lang="scss"></style>
