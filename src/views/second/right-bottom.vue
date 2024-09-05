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
          numList: [ 12, 32, 23, 53, 12, 33, 44, 11, 66, 34, 23, 15 ],
          numList2: [ 32, 11, 13, 43, 22, 31, 51, 26, null, null, null, null ],
          numList3: [ 34, 22, 44, 11, 4, 6, 23, 46, 16, 5, 33, 45 ],
          numList4: [ 14, 12, 14, 21, 34, 26, 13, 26, 36, 15, 13, 25 ],
        }

        setOption(res.data.dateList, res.data.numList, res.data.numList2, res.data.numList3, res.data.numList4);
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
const setOption = async (xData: any[], yData: any[], yData2: any[], yData3: any[], yData4: any[]) => {
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
        var result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.value) {
            if (item.seriesName == "电量") {
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
      data: ["实际能耗", '预测能耗', '预测上限', '预测下限'],
      textStyle: {
        color: "#fff",
      },
    //   top: "0",
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
        fontWeight: "500",
      },
    },
    yAxis: [
      {
        type: "value",
        name: '碳排放量(吨)',
        position: 'left',
        nameTextStyle: {
          color: '#fff',
          align: 'left'
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
        data: yData2,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "实际能耗",
        color: "rgba(252,144,16,.7)",
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
        data: yData3,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "预测能耗",
        color: "rgba(122,63,46,.7)",
        lineStyle: {
          type: 'dotted'
        },
      },
      {
        data: yData,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "预测上限",
        color: "rgba(852,44,16,.7)",
        lineStyle: {
          type: 'dotted'
        },
      },
      {
        data: yData4,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "预测下限",
        color: "rgba(52,144,6,.7)",
        lineStyle: {
          type: 'dotted'
        },
      },
    ],
  };
};
onMounted(() => {
  getData();
});
</script>

<template><div style="width: 100%; height: 100%">
  <v-chart
    class="chart"
    style="width: 100%; height: 100%"
    :option="option"
    v-if="JSON.stringify(option) != '{}'"
  />
</div>
</template>

<style scoped lang="scss"></style>
