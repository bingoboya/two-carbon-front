<script setup lang="ts">
import { ref, onMounted } from "vue";
import { graphic } from "echarts/core";
// import { alarmNum } from "@/api";
// import { ElMessage } from "element-plus";

const option = ref({});
const getData = () => {
  const data = {
    dateList: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    numList2: [3623.25, 2829.57, 3692.25, 3209.1, 3036.61, 3036.61, 3278.19, 3174.67, 3174.67, null, null, null], // 实际
    numList: [null, null, null, null, null, null, null, null, 4105.68, 4278.19, 4347.25, 4899.35],
    numList3: [null, null, null, null, null, null, null, null, 3105.68, 3278.19, 3347.25, 3899.35], // 预测碳排
    numList4: [null, null, null, null, null, null, null, null, 2105.68, 2278.19, 2347.25, 2899.35],
  }

  setOption(data.dateList, data.numList, data.numList2, data.numList3, data.numList4);
  // alarmNum()
  //   .then((res) => {
  //     if (res.success) {
  //       res.data = {
  //         dateList: ['1月', '2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
  //         numList2: [ 3623.25,2829.57,3692.25,3209.1,3036.61,3036.61,3278.19,3174.67,3174.67, null, null, null ], // 实际
  //         numList: [ null, null, null, null, null, null, null, null, 4105.68,4278.19,4347.25,4899.35 ],
  //         numList3: [null, null, null, null,null,null, null, null, 3105.68,3278.19,3347.25,3899.35], // 预测碳排
  //         numList4: [null, null, null, null, null, null, null, null, 2105.68,2278.19,2347.25,2899.35 ],
  //       }

  //       setOption(res.data.dateList, res.data.numList, res.data.numList2, res.data.numList3, res.data.numList4);
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
        let result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.seriesName == "实际碳排") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255,136,30,1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          } else if (item.seriesName == "预测碳排") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(253,253,30, 1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          } else if (item.seriesName == "预测上限") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(13,255,198, 1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          } else if (item.seriesName == "预测下限") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(31,254,255, 1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
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
          name: "实际碳排",
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
        {
          name: "预测上限",
          itemStyle: {
            opacity: 0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "预测下限",
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
        name: '碳排(吨)',
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
        name: "实际碳排",
        lineStyle: {
          color: "rgba(255,136,30,1)",
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
        data: yData3,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "预测碳排",
        lineStyle: {
          color: "rgba(253,253,30, 1)",
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
        lineStyle: {
          color: "rgba(13,255,198, 1)",
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
        lineStyle: {
          color: "rgba(31,254,255, 1)",
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

<template>
  <div style="width: 100%; height: 100%">
    <v-chart class="chart" autoresize style="width: 100%; height: 100%" :option="option"
      v-if="JSON.stringify(option) != '{}'" />
  </div>
</template>

<style scoped lang="scss"></style>
