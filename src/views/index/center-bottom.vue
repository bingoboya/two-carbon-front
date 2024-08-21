<script setup lang="ts">
import { ref, onMounted } from "vue";
import { alarmNum } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  alarmNum()
    .then((res) => {
      console.log("右上--报警次数 ", res);
      if (res.success) {
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
  option.value = {
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
    yAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: "rgba(31,99,163,.2)",
        },
      },
      axisLine: {
        lineStyle: {
          color: "rgba(31,99,163,.1)",
        },
      },
      axisLabel: {
        color: "#7EB7FD",
        fontWeight: "500",
      },
    },
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    legend: {
      textStyle: {
        color: '#fff',
      }
    },
    grid: {
      //布局
      show: true,
      left: "10px",
      right: "30px",
      bottom: "10px",
      top: "32px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    series: [
      {
        data: yData,
        type: "line",
        smooth: true,
        symbol: "none", //去除点
        name: "绿证价格",
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
                color: "rgba(252,144,16,.0)",
              },
            ],
            false
          ),
        }
      },
      {
        data: yData2,
        type: "line",
        smooth: true,
        symbol: "none", //去除点
        name: "电量",
        color: "rgba(9,202,243,.7)",
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
        smooth: true,
        symbol: "none", //去除点
        name: "电量预测",
        // color: "rgba(9,202,243,.7)",
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
  <v-chart class="chart" :option="option" v-if="JSON.stringify(option) != '{}'" />
</template>

<style scoped lang="scss"></style>
