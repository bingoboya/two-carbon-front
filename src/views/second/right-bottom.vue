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
        let result = params[0].name + "<br>";
        params.forEach(function (item: any) {
          if (item.seriesName == "实际能耗") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(31, 254, 255, 1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          } else if (item.seriesName == "预测能耗") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(9,118,109,1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          } else if (item.seriesName == "预测上限") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(188,196,48,1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          }else if (item.seriesName == "预测下限") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(229,126,47,1);"></span>`
            item.marker = mark
            result += `${item.marker} ${item.seriesName} : ${item.value ? `${item.value}吨</br>` : '- </br>'}`;
          }else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      }
    },


    legend: {
      data: [
        {
          name: "实际能耗",
          itemStyle:{ 
            opacity:0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "预测能耗",
          itemStyle:{ 
            opacity:0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "预测上限",
          itemStyle:{ 
            opacity:0,
          },
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "预测下限",
          itemStyle:{ 
            opacity:0,
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
        name: '能耗(吨)',
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
        lineStyle: {
          color: "rgba(31, 254, 255, 1)",
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
      },
      {
        data: yData3,
        type: "line",
        yAxisIndex: 0,
        smooth: true,
        symbol: "none", //去除点
        name: "预测能耗",
        lineStyle: {
          type: 'dotted',
          color: "rgba(9,118,109,1)",
          width: 2
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
          color: "rgba(188,196,48,1)",
          type: 'dotted',
          width: 2
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
          color: "rgba(229,126,47,1)",
          type: 'dotted',
          width: 2
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
      autoresize
    style="width: 100%; height: 100%"
    :option="option"
    v-if="JSON.stringify(option) != '{}'"
  />
</div>
</template>

<style scoped lang="scss"></style>
