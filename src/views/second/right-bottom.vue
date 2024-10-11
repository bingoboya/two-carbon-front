<template>
  <div style="width: 100%; height: 100%">
    <EchartsUI ref="EchartContainerRef" />
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { alarmNum } from "@/api";
import { graphic } from "echarts/core";

import { EchartsUI, useEcharts } from "@/utils/echarts";
const EchartContainerRef = ref(); //组件实例
const { renderEcharts, getchartInstance } = useEcharts(EchartContainerRef);
const option = ref({});
const props = defineProps({
  dataList: {
    type: Object,
    default: () => {},
  },
});
const curInstance: any = ref(null);
const numList2 = [
  "24407.01",
  "19060.89",
  "24872.06",
  "21617.73",
  "20455.44",
  "20455.44",
  "22082.64",
  "21385.34",
  "22385.34",
  null,
  null,
  null,
]; // 实际
const numList = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "23920.23",
  "23082.64",
  "23547.49",
  "23266.72",
];
const numList3 = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "20920.23",
  "22082.64",
  "22547.49",
  "26266.72",
]; // 预测碳排放量
const numList4 = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  "17920.23",
  "19082.64",
  "19547.49",
  "23266.72",
];
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
        if (item.seriesName == "实际碳排放量") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(31, 254, 255, 1);"></span>`;
          item.marker = mark;
          result += `${item.marker} ${item.seriesName} : ${
            item.value ? `${item.value}吨</br>` : "- </br>"
          }`;
        } else if (item.seriesName == "预测碳排放量") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(9,118,109,1);"></span>`;
          item.marker = mark;
          result += `${item.marker} ${item.seriesName} : ${
            item.value ? `${item.value}吨</br>` : "- </br>"
          }`;
        } else if (item.seriesName == "预测碳排放量上限") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(188,196,48,1);"></span>`;
          item.marker = mark;
          result += `${item.marker} ${item.seriesName} : ${
            item.value ? `${item.value}吨</br>` : "- </br>"
          }`;
        } else if (item.seriesName == "预测碳排放量下限") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(229,126,47,1);"></span>`;
          item.marker = mark;
          result += `${item.marker} ${item.seriesName} : ${
            item.value ? `${item.value}吨</br>` : "- </br>"
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
        name: "实际碳排放量",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "预测碳排放量",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "预测碳排放量上限",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "预测碳排放量下限",
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
      name: "碳排(吨)",
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
    },
  ],
  series: [
    {
      data: [],
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none", //去除点
      name: "实际碳排放量",
      lineStyle: {
        color: "rgba(31, 254, 255, 1)",
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
              color: "rgba(252,144,16,.7)",
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
    {
      data: numList3,
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none", //去除点
      name: "预测碳排放量",
      lineStyle: {
        type: "dotted",
        color: "#edbb43",
        width: 2,
      },
    },
    {
      data: numList,
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none", //去除点
      name: "预测碳排放量上限",
      lineStyle: {
        color: "rgba(188,196,48,1)",
        type: "dotted",
        width: 2,
      },
    },
    {
      data: numList4,
      type: "line",
      yAxisIndex: 0,
      smooth: true,
      symbol: "none", //去除点
      name: "预测碳排放量下限",
      lineStyle: {
        color: "rgba(229,126,47,1)",
        type: "dotted",
        width: 2,
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
      (item: any) => item.dataName === "实际碳排放量"
    )?.dataList;
    const lineTwoValue = yList.find(
      (item: any) => item.dataName === "预测碳排放量"
    )?.dataList;
    const lineThreeValue = yList.find(
      (item: any) => item.dataName === "预测碳排放量上限"
    )?.dataList;
    const lineFourValue = yList.find(
      (item: any) => item.dataName === "预测碳排放量下限"
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
          name: "实际碳排放量",
          lineStyle: {
            color: "rgba(31, 254, 255, 1)",
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
                  color: "rgba(252,144,16,.7)",
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
        {
          data: lineTwoValue,
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          symbol: "none", //去除点
          name: "预测碳排放量",
          lineStyle: {
            type: "dotted",
            color: "#edbb43",
            width: 2,
          },
        },
        {
          data: lineThreeValue,
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          symbol: "none", //去除点
          name: "预测碳排放量上限",
          lineStyle: {
            color: "rgba(188,196,48,1)",
            type: "dotted",
            width: 2,
          },
        },
        {
          data: lineFourValue,
          type: "line",
          yAxisIndex: 0,
          smooth: true,
          symbol: "none", //去除点
          name: "预测碳排放量下限",
          lineStyle: {
            color: "rgba(229,126,47,1)",
            type: "dotted",
            width: 2,
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
              name: "实际碳排放量",
              data: lineOneValue,
            },
            {
              // 根据名字对应到相应的系列
              name: "预测碳排放量",
              data: lineTwoValue,
            },
            {
              // 根据名字对应到相应的系列
              name: "预测碳排放量上限",
              data: lineThreeValue,
            },
            {
              // 根据名字对应到相应的系列
              name: "预测碳排放量下限",
              data: lineFourValue,
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
