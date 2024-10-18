<script setup lang="ts">
import { ref, onMounted } from "vue";
import { EchartsUI, useEcharts } from "@/utils/echarts";
import { graphic } from "echarts/core";
const EchartContainerRef = ref(); //组件实例
const { renderEcharts, getchartInstance } = useEcharts(EchartContainerRef);
const option = ref({});
const curInstance: any = ref(null);
const props = defineProps({
  dataList: {
    type: Object,
    default: () => { },
  },
});

const newOption = {
  grid: {
    show: true,
    left: "10px",
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
        if (item.seriesName == "实际碳排") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(1, 245, 255, 1);"></span>`
          item.marker = mark
          result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}万吨</br>` : '- </br>'}`;
        } else if (item.seriesName == "测算碳排") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 163, 33, 1);"></span>`
          item.marker = mark
          result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}万吨</br>` : '- </br>'}`;
        } else if (item.seriesName == "预测碳排") {
          const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 128, 36, 1);"></span>`
          item.marker = mark
          result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}万吨</br>` : '- </br>'}`;
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
        name: "实际碳排",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "测算碳排",
        itemStyle: {
          opacity: 0,
        },
        textStyle: {
          color: "#fff",
        },
      },
      {
        name: "预测碳排",
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
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
      fontWeight: "500",
      interval: 0 // 设置成 0 强制显示所有标签
    },
  },
  yAxis: [
    {
      type: "value",
      name: '碳排放量(万吨)',
      max: function (value: any) {
        return value.max + 10;
      },
      min: function (value: any) {
        return value.min - 10;
      },
      position: 'left',
      nameTextStyle: {
        color: '#fff',
        // align: 'left'
        padding: [0, 0, 0, 30]
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
    }
  ],
  series: [
    {
      data: [],
      type: "line",
      yAxisIndex: 0,
      // smooth: true,
      symbol: "none", //去除点
      name: "实际碳排",
      lineStyle: {
        color: "rgba(1, 245, 255, 1)",
        width: 2
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
              color: "rgba(9,202,243,.7)",
            },
            {
              offset: 1,
              color: "rgba(252,144,16,.0)",
            },
          ],
          false
        ),
      }
    },
    {
      data: [],
      type: "line",
      yAxisIndex: 0,
      // smooth: true,
      symbol: "none", //去除点
      name: "测算碳排",
      lineStyle: {
        color: "rgba(255, 163, 33, 1)",
        width: 2
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
      markLine: {
        symbol: ['none', 'none'],
        slient: true,
        lineStyle: {
          color: 'rgba(112, 158, 227, 1)',
          width: 2
        },
        label: { show: false },
        // data: nullIndices.map((index: any) => ({
        //   xAxis: index
        // }))
        data: [{ xAxis: -1 }]
      },
    },
    {
      data: [],
      type: "line",
      yAxisIndex: 0,
      // smooth: true,
      symbol: "none", //去除点
      name: "预测碳排",
      lineStyle: {
        type: 'dotted',
        color: "rgba(255, 128, 36, 1)",
        width: 2
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
              color: "rgba(255, 128, 36, 1)",
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
}


watch(
  () => toRaw(props.dataList),
  async (newValue) => {
    await nextTick();
    const { yList } = newValue;
    const lineOneValue = yList.find((item: any) => item.dataName === "实际碳排")?.dataList;
    const lineTwoValue = yList.find((item: any) => item.dataName === "测算碳排")?.dataList;
    const lineThreeValue = yList.find((item: any) => item.dataName === "预测碳排")?.dataList;
    if (curInstance.value === null) {
      curInstance.value = getchartInstance();
      /** 接口数据更新，判断是否有图表实例 ？没有->初始化图表 */
      const series = [
        {
          data: lineOneValue,
          type: "line",
          yAxisIndex: 0,
          // smooth: true,
          symbol: "none", //去除点
          name: "实际碳排",
          lineStyle: {
            color: "rgba(1, 245, 255, 1)",
            width: 2
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
                  color: "rgba(9,202,243,.7)",
                },
                {
                  offset: 1,
                  color: "rgba(252,144,16,.0)",
                },
              ],
              false
            ),
          }
        },
        {
          data: lineTwoValue,
          type: "line",
          yAxisIndex: 0,
          // smooth: true,
          symbol: "none", //去除点
          name: "测算碳排",
          lineStyle: {
            color: "rgba(255, 163, 33, 1)",
            width: 2
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
          markLine: {
            symbol: ['none', 'none'],
            slient: true,
            lineStyle: {
              color: 'rgba(112, 158, 227, 1)',
              width: 2
            },
            label: { show: false },
            // data: nullIndices.map((index: any) => ({
            //   xAxis: index
            // }))
            data: [{ xAxis: lineTwoValue.findIndex((item: any) => item === null) - 1 }],
          },
        },
        {
          data: lineThreeValue,
          type: "line",
          yAxisIndex: 0,
          // smooth: true,
          symbol: "none", //去除点
          name: "预测碳排",
          lineStyle: {
            type: 'dotted',
            color: "rgba(255, 128, 36, 1)",
            width: 2
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
                  color: "rgba(255, 128, 36, 1)",
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
              data: lineOneValue,
              type: "line",
              yAxisIndex: 0,
              // smooth: true,
              symbol: "none", //去除点
              name: "实际碳排",
              lineStyle: {
                color: "rgba(1, 245, 255, 1)",
                width: 2
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
                      color: "rgba(9,202,243,.7)",
                    },
                    {
                      offset: 1,
                      color: "rgba(252,144,16,.0)",
                    },
                  ],
                  false
                ),
              }
            },
            {
              data: lineTwoValue,
              type: "line",
              yAxisIndex: 0,
              // smooth: true,
              symbol: "none", //去除点
              name: "测算碳排",
              lineStyle: {
                color: "rgba(255, 163, 33, 1)",
                width: 2
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
              markLine: {
                symbol: ['none', 'none'],
                slient: true,
                lineStyle: {
                  color: 'rgba(112, 158, 227, 1)',
                  width: 2
                },
                label: { show: false },
                // data: nullIndices.map((index: any) => ({
                //   xAxis: index
                // }))
                data: [{ xAxis: lineTwoValue.findIndex((item: any) => item === null) - 1 }]
              },
            },
            {
              data: lineThreeValue,
              type: "line",
              yAxisIndex: 0,
              // smooth: true,
              symbol: "none", //去除点
              name: "预测碳排",
              lineStyle: {
                type: 'dotted',
                color: "rgba(255, 128, 36, 1)",
                width: 2
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
                      color: "rgba(255, 128, 36, 1)",
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
        },
        false
      );
    }
  }
);



onMounted(() => {
  // getData();
  renderEcharts(newOption);
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <EchartsUI ref="EchartContainerRef" />
  </div>
</template>

<style scoped lang="scss"></style>
