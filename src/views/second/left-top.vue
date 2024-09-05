
<template><div style="width: 100%; height: 100%">
  <v-chart
    class="chart"
    style="width: 100%; height: 100%"
    :option="option"
    v-if="JSON.stringify(option) != '{}'"
  />
</div>
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
    if (res.success) {
      state.lockNum = res.data.lockNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
      state.alarmNum = res.data.alarmNum;
      const data = [{
          value: 41,
          name: '钝化剂',
          unit: '%',
          num: 2541
        },
        {
          value: 31,
          name: '电力',
          unit: '%',
          num: 25
        },
        {
          value: 21,
          name: '天然气',
          unit: '%',
          num: 22354
        },
        {
          value: 18,
          name: '锌锭',
          unit: '%',
          num: 254
        },
        {
          value: 16,
          name: '洗剂',
          unit: '%',
          num: 254
        },
        {
          value: 14,
          name: '板材消耗量',
          unit: '%',
          num: 254
        },
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
          return [
            `{name|${name}} {value|${v}}{unit|${unit}}`,
          ].join('');
        }
    },
    series: [
      // {
      //   name: "能源结构占比",
      //   type: "pie",
      //   // avoidLabelOverlap: false,
      //   roseType: 'area',
      //   itemStyle: {
      //     borderRadius: 6,
      //     borderColor: "rgba(255,255,255,0)",
      //     borderWidth: 2,
      //   },
      //   color: colors,
      //   label: {
      //     show: false,
      //   },
      //   // emphasis: {
      //   //   show: false,
      //   // },
      //   legend: {
      //     show: !false,
      //   },
      //   tooltip: { show: true },
      //   center: ['30%', '50%'],
      //   data: state.chartData
      // },
      {
      name: '能源结构占比',
      type: 'pie',
      radius: [20, 130],
      center: ['30%', '50%'],
      roseType: 'area',

      label: {
        show: false
      },
      data: state.chartData
    }
    ],
  };
};
</script>

<style scoped lang="scss"></style>
