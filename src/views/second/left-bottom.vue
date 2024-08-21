
<template>
  <v-chart class="chart" :option="option" />
</template>
<script setup lang="ts">
import { ref, reactive } from "vue";
import { graphic } from "echarts/core";
import { countUserNum } from "@/api";
import {ElMessage} from "element-plus"

let colors = ["#0BFC7F", "#A0A0A0", "#F48C02", "#F4023C"];
const option = ref({});
const state: any = reactive({
  lockNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  alarmNum: 0,
  totalNum: 0,
  chartData: [],
  data: []
});
const echartsGraphic = (colors: string[]) => {
  return new graphic.LinearGradient(1, 0, 0, 0, [
    { offset: 0, color: colors[0] },
    { offset: 1, color: colors[1] },
  ]);
};
const getData = () => {
  countUserNum().then((res) => {
    console.log("左中--用户总览",res);
    if (res.success) {
      state.lockNum = res.data.lockNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
      state.alarmNum = res.data.alarmNum;
      const data = [{
          value: 16,
          name: '预处理',
          unit: '%',
          num: 2541
        },
        {
          value: 11,
          name: '电镀锌',
          unit: '%',
          num: 25
        },
        {
          value: 21,
          name: '后处理',
          unit: '%',
          num: 22354
        },
        {
          value: 8,
          name: '干燥',
          unit: '%',
          num: 254
        }
      ]
      state.data = data
      state.chartData = data.map(item => {
        return {
            name: item.name,
            value: item.value,
            // itemStyle: {
            //   color: echartsGraphic(["#0BFC7F", "#A3FDE0"]),
            //   // color: echartsGraphic(["#A0A0A0", "#DBDFDD"]),
            //   // color: echartsGraphic(["#F48C02", "#FDDB7D"]),
            //   // color: echartsGraphic(["#F4023C", "#FB6CB7"])
            // }
        }
      })
      setOption();
    }else{
      ElMessage.error(res.msg)
    }
  }).catch(err=>{
    ElMessage.error(err)
  });
};
getData();
const setOption = () => {
  option.value = {
    title: {
      show: false, // TODO 
      top: "38%",
      left: "24%",
      text: [`{name|总数}`, `{value|${state.totalNum}}`, "{unit|万吨}"].join("\n"),
      textStyle: {
        rich: {
          name: {
            color: "#ffffff",
            fontSize: 20,
            lineHeight: 24,
            align: 'center',
          },
          value: {
            color: "#ffffff",
            fontSize: 24,
            fontWeight: "bold",
            lineHeight: 20,
            padding:[14,0,14,0],
            align: 'center'
          },
          unit: {
            color: "#ffffff",
            lineHeight: 20,
            align: 'center'
          },
        },
      },
    },
    tooltip: {
      trigger: "item",
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    legend: {
      orient: 'vertical',
      // right: 20,
      left: '60%',
      top: 'center',
      textStyle: {
        color: "#ffffff",
        rich: {
          name: {
            fontSize: 16,
            color: "gray",
            width: 60,
            padding: [0, 0, 0, 0]//上，右，下，左
          },
          value: {
            fontSize: 16,
            align: 'right',
            width: 22,
            padding: [0, 0, 0, 0],
          },
          unit: {
            fontSize: 16,
            // width: 36,
            align: 'right',
            color: "#fff",
            padding: [0, 10, 0, 0],
          },
          num: {
            fontSize: 16,
            width: 64,
            align: 'right',
            color: "#fff",
          },
        },
      },
      //格式化图例文本
      formatter(name: any) {
          let tarValue, tarUnit, tarNum
          for (let i = 0; i < state.data.length; i++) {
            if (state.data[i].name == name) {
              tarValue = state.data[i].value;
              tarUnit = state.data[i].unit;
              tarNum = state.data[i].num;
            }
          }
          const v = tarValue;
          const unit = tarUnit
          console.log('v', v);
          return [
            `{name|${name}} {value|${v}}{unit|${unit}}`,
          ].join('');
        }
    },
    series: [
      {
        name: "能源结构占比",
        type: "pie",
        radius: ["40%", "70%"],
        // avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 6,
          borderColor: "rgba(255,255,255,0)",
          borderWidth: 2,
        },
        color: colors,
        label: {
          show: !true,
          formatter: "   {b|{b}}   \n   {c|{c}个}   {per|{d}%}  ",
          //   position: "outside",
          rich: {
            b: {
              color: "#fff",
              fontSize: 12,
              lineHeight: 26,
            },
            c: {
              color: "#31ABE3",
              fontSize: 14,
            },
            per: {
              color: "#31ABE3",
              fontSize: 14,
            },
          },
        },
        emphasis: {
          show: false,
        },
        legend: {
          show: !false,
        },
        tooltip: { show: true },
        labelLine: {
          show: true,
          length: 20, // 第一段线 长度
          length2: 36, // 第二段线 长度
          smooth: 0.2,
          lineStyle: {},
        },
        center: ['30%', '50%'],
        data: state.chartData
        // data: [
        //   {
        //     value: state.onlineNum,
        //     name: "在线",
        //     itemStyle: {
        //       color: echartsGraphic(["#0BFC7F", "#A3FDE0"]),
        //     },
        //   },
        //   {
        //     value: state.offlineNum,
        //     name: "离线",
        //     itemStyle: {
        //       color: echartsGraphic(["#A0A0A0", "#DBDFDD"]),
        //     },
        //   },
        //   {
        //     value: state.lockNum,
        //     name: "锁定",
        //     itemStyle: {
        //       color: echartsGraphic(["#F48C02", "#FDDB7D"]),
        //     },
        //   },
        //   {
        //     value: state.alarmNum,
        //     name: "异常",
        //     itemStyle: {
        //       color: echartsGraphic(["#F4023C", "#FB6CB7"]),
        //     },
        //   },
        // ],
      },
    ],
  };
};
</script>

<style scoped lang="scss"></style>
