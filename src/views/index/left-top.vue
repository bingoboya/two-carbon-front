<script setup lang="ts">
import { ref, onMounted } from "vue";
import { alarmNum } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  alarmNum()
    .then((res) => {
      if (res.success) {

        res.data = {
          dateList: ['1月', '2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
          numList: [ 12, 32, 123, 53, 12, 33, 44, 11, 66, 34, 23, 15 ],
          numList2: [ 32, 11, 13, 43, 22, 31, 51, 26, null, null, null, null ],
          numList3: [ null, null, null, null, null, null, null, 26, 16, 5, 33, 45 ],
        }

        setOption(res.data.dateList, res.data.numList, res.data.numList2, res.data.numList3);
      } else {
        ElMessage({
          message: res.msg,
          type: "warning",
        });
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
const setOption = async (xData: any[], yData: any[], yData2: any[], yData3: any[]) => {
  // 找出 Y 值为 null 的数据点的索引
  // const nullIndices = yData2.reduce((acc, val, index) => {
  //   if (val === null) {
  //     acc.push(index);
  //   }
  //   return acc;
  // }, []);
  // const ddd = nullIndices.map((index: any) => ({
  //           xAxis: index
  //         }))
  // console.log(nullIndices, 2222, ddd);
  const findNullIndex = yData2.findIndex(item => item === null)
  option.value = {

    // tooltip: {
    //   trigger: "axis",
    //   backgroundColor: "rgba(0,0,0,.6)",
    //   borderColor: "rgba(147, 235, 248, .8)",
    //   textStyle: {
    //     color: "#FFF",
    //   },
    // },
    // legend: {
    //   textStyle: {
    //     color: '#fff',
    //   }
    // },
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
        var result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.value) {
            if (item.seriesName == "绿证价格") {
              result += item.marker + " " + item.seriesName + " : " + item.value + "元</br>";
            } else {
              result += item.marker + " " + item.seriesName + " : " + item.value + "千瓦时</br>";
            }
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
          itemStyle:{ 
            opacity:0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "电量",
          itemStyle:{ 
            opacity:0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "电量预测",
          itemStyle:{ 
            opacity:0,
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
        fontWeight: "500",
      },
    },
    yAxis: [
      {
        type: "value",
        name: '绿证价格(元)',
        position: 'left',
        nameTextStyle: {
          color: '#fff',
          padding: [0,0,0,30]
          // align: 'left'
        },
        splitLine: {
          show: !true,
          lineStyle: {
            color: "rgba(31,99,163,.2)",
          },
        },
        axisLine: {
          show: !true,
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

      {
            type: 'value',
            position: 'right',
            name: '电量(千瓦时)',
            nameTextStyle: {
                color: '#fff',
                // align: 'right'
            },
            alignTicks: true,
            axisLabel: {
                show: true,
                color: "#fff",
                // color: "#7EB7FD",
                fontWeight: "400",
            },
            axisLine: {
                show: true,
                lineStyle: {
                    // width: 2,
                    color: '#2B7BD6',
                },
            },
        }
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
          width: 2
        },
        areaStyle: {
          //右，下，左，上
          color: new graphic.LinearGradient(0, 0, 0, 1,
            [
              {
                offset: 0,
                color: "rgba(25, 181, 255, .7)",
              },
              {
                offset: 1,
                color: "rgba(25, 181, 255,.0)",
              },], false
          ),
        }
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
          data: [{xAxis: findNullIndex - 1}]
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
          type: 'dotted',
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
};
onMounted(() => {
  getData();
});
</script>

<template>
  <div style="width: 100%; height: 100%">
    <v-chart
      class="chart"
      autoresize
      style="width: 100%; height: 100%"
      :option="option"
      v-if="JSON.stringify(option) != '{}'"
    />
  </div>
</template>

<style scoped lang="scss"></style>
