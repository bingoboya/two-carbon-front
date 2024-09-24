<script setup lang="ts">
import { ref, onMounted } from "vue";
// import { alarmNum } from "@/api";
import { graphic } from "echarts/core";
// import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  const data = {
    dateList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    numList: [],
    numList2: [259.89, 202.96, 264.84, 230.18, 217.81, 217.81, 235.14, 227.72, null, null, null, null],
    numList3: [null, null, null, null, null, null, null, 227.72, 222.77, 235.14, 240.1, 279.7],
  }

  setOption(data.dateList, data.numList, data.numList2, data.numList3);
  // alarmNum()
  //   .then((res) => {
  //     if (res.success) {

  //       res.data = {
  //         dateList: ['1月', '2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  //         numList: [  ],
  //         numList2: [ 259.89 ,202.96 ,264.84 ,230.18 ,217.81, 217.81, 235.14 ,227.72 , null, null, null, null ],
  //         numList3: [ null, null, null, null, null, null, null, 227.72, 222.77 ,235.14, 240.1 ,279.7 ],
  //       }

  //       setOption(res.data.dateList, res.data.numList, res.data.numList2, res.data.numList3);
  //     } else {
  //       ElMessage({
  //         message: res.msg,
  //         type: "warning",
  //       });
  //     }
  //   })
  //   .catch((err) => {
  //     ElMessage.error(err);
  //   });
};
const setOption = async (xData: any[], yData: any[], yData2: any[], yData3: any[]) => {
  const findNullIndex = yData2.findIndex(item => item === null)
  option.value = {

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
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 168, 21, 1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}万千瓦时</br>` : '- </br>'}`;
          } else if (item.seriesName == "预测电量") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 230, 0, 1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}万千瓦时</br>` : '- </br>'}`;
          } else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      }
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
      data: xData,
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
        interval: 0 // 设置成 0 强制显示所有标签
      },
    },
    yAxis: [
      {
        type: "value",
        name: '电量(万千瓦时)',
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
          fontWeight: "500",
        },
      }
    ],

    series: [
      {
        data: yData2,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "实际电量",
        lineStyle: {
          color: "rgba(255, 168, 21, 1)",
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
                color: "rgba(255, 168, 21, .7)",
              },
              {
                offset: 1,
                color: "rgba(255, 168, 21, 0)",
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
          data: [{ xAxis: findNullIndex - 1 }]
        },
      },
      {
        data: yData3,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "预测电量",
        lineStyle: {
          type: 'dotted',
          color: "rgba(255, 230, 0, 1)",
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
                color: "rgba(255, 230, 0, 1)",
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
};
onMounted(() => {
  getData();
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <v-chart class="chart" autoresize style="width: 100%; height: 100%" :option="option"
      v-if="JSON.stringify(option) != '{}'" />
  </div>
</template>

<style scoped lang="scss"></style>
