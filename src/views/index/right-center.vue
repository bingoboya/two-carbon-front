<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  installationPlan()
    .then((res) => {
      console.log("中下--安装计划", res);
      if (res.success) {
        setOption(res.data);
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
const setOption = async (newData: any) => {
  option.value = {
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
            if (item.seriesName == "同比") {
              result += item.marker + " " + item.seriesName + " : " + item.value + "%</br>";
            } else {
              result += item.marker + " " + item.seriesName + " : " + item.value + "个</br>";
            }
          } else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      },
    },
    legend: {
      data: ["碳排放量", "同比"],
      textStyle: {
        color: "#B4B4B4",
      },
      top: "0",
    },
    grid: {
      left: "50px",
      right: "50px",
      bottom: "30px",
      top: "50px",
    },
    xAxis: {
      data: newData.category,
      axisLine: {
        lineStyle: {
          color: "#B4B4B4",
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        name: '碳排放量(万吨)',
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        axisLabel: {
          formatter: "{value}",
        },
      },
      {
        name: '同比',
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: "#B4B4B4",
          },
        },
        axisLabel: {
          formatter: "{value}% ",
        },
      },
    ],
    series: [
      {
        name: "碳排放量",
        type: "bar",
        barWidth: 10,
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#956FD4" },
            { offset: 1, color: "#3EACE5" },
          ]),
        },
        data: newData.barData,
      },
      
      {
        name: "同比",
        type: "line",
        smooth: true,
        showAllSymbol: true,
        symbol: "emptyCircle",
        symbolSize: 8,
        yAxisIndex: 1,
        itemStyle: {
          color: "#F02FC2",
        },
        data: newData.rateData,
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
