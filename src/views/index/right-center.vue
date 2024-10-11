<template>
  <div style="width: 100%; height: 100%">
    <EchartsUI ref="EchartContainerRef" />
  </div>
</template>
<script setup lang="ts">
import { EchartsUI, useEcharts } from "@/utils/echarts";
import { graphic } from "echarts/core";
const EchartContainerRef = ref(); //组件实例
const { renderEcharts, getchartInstance } = useEcharts(EchartContainerRef);
const option: any = ref({});
const curInstance: any = ref(null);
const props = defineProps({
  dataList: {
    type: Object,
    default: () => {},
  },
});
//
const offsetX = 6;
const offsetY = 3;
// 绘制左侧面
const CubeLeft = graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape) {
    // 会canvas的应该都能看得懂，shape是从custom传入的
    const xAxisPoint = shape.xAxisPoint;
    // console.log(shape);
    const c0 = [shape.x, shape.y];
    const c1 = [shape.x - offsetX, shape.y - offsetY];
    const c2 = [xAxisPoint[0] - offsetX, xAxisPoint[1] - offsetY];
    const c3 = [xAxisPoint[0], xAxisPoint[1]];
    ctx
      .moveTo(c0[0], c0[1])
      .lineTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .closePath();
  },
});
// 绘制右侧面
const CubeRight = graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape) {
    const xAxisPoint = shape.xAxisPoint;
    const c1 = [shape.x, shape.y];
    const c2 = [xAxisPoint[0], xAxisPoint[1]];
    const c3 = [xAxisPoint[0] + offsetX, xAxisPoint[1] - offsetY];
    const c4 = [shape.x + offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
// 绘制顶面
const CubeTop = graphic.extendShape({
  shape: {
    x: 0,
    y: 0,
  },
  buildPath: function (ctx: any, shape) {
    const c1 = [shape.x, shape.y];
    const c2 = [shape.x + offsetX, shape.y - offsetY]; //右点
    const c3 = [shape.x, shape.y - offsetX];
    const c4 = [shape.x - offsetX, shape.y - offsetY];
    ctx
      .moveTo(c1[0], c1[1])
      .lineTo(c2[0], c2[1])
      .lineTo(c3[0], c3[1])
      .lineTo(c4[0], c4[1])
      .closePath();
  },
});
// 注册三个面图形
graphic.registerShape("CubeLeft", CubeLeft);
graphic.registerShape("CubeRight", CubeRight);
graphic.registerShape("CubeTop", CubeTop);

const VALUE = [365, 352, 373, 369, 357, 375, 351, 364, null, null, null, null];
const LineVALUE = [
  0.1,
  0.13,
  0.12,
  0.15,
  0.14,
  0.13,
  0.1,
  0.12,
  null,
  null,
  null,
  null,
];

const getData = () => {
  const data = {
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
          if (item.seriesName == "生产产量") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(33, 162, 163, 1);"></span>`;
            item.marker = mark;
            result += `${item.marker} ${item.seriesName} : ${
              item.value ? `${item.value}万吨</br>` : "- </br>"
            }`;
          } else if (item.seriesName == "单位产品碳排放量") {
            const mark = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:rgba(255, 131, 21, 1);"></span>`;
            item.marker = mark;
            result += `${item.marker} ${item.seriesName} : ${
              item.value ? `${item.value}</br>` : "- </br>"
            }`;
          } else {
            result += item.marker + " " + item.seriesName + " :  - </br>";
          }
        });
        return result;
      },
    },
    legend: {
      top: -4,
      data: [
        {
          name: "生产产量",
          textStyle: {
            color: "#fff",
          },
        },
        {
          name: "单位产品碳排放量",
          itemStyle: {
            opacity: 0,
          },
          textStyle: {
            color: "#fff",
          },
        },
      ],
    },
    grid: {
      left: "0px",
      right: "10px",
      bottom: "0px",
      top: "50px",
      containLabel: true,
      borderColor: "#1F63A3",
    },
    xAxis: {
      type: "category",
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月",
      ],
      boundaryGap: !false, // 不留白，从原点开始
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
        interval: 0, // 设置成 0 强制显示所有标签
      },
    },
    yAxis: [
      {
        type: "value",
        name: "生产产量(万吨)",
        position: "left",
        nameTextStyle: {
          color: "#fff",
          padding: [0, 0, 0, 30],
          // align: 'left'
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
      },
      {
        type: "value",
        position: "right",
        name: "单位产品碳排放量",
        alignTicks: true,
        nameTextStyle: {
          color: "#fff",
          // align: 'right'
          padding: [0, 60, 0, 0],
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
      },
    ],
    series: [
      {
        type: "custom",
        name: "生产产量",
        yAxisIndex: 0,
        renderItem: (params: any, api: any) => {
          const location = api.coord([api.value(0), api.value(1)]);
          return {
            type: "group",
            children: [
              {
                type: "CubeLeft",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "rgba(33, 162, 163, 1)" },
                    { offset: 1, color: "rgba(33, 162, 163, 0.4)" },
                    // { offset: 0, color: "#0d7d7e" },
                    // { offset: 1, color: "#0d7d7e" },
                    // { offset: 0, color: "#956FD4" },
                    // { offset: 1, color: "#3EACE5" },
                  ]),
                },
              },
              {
                type: "CubeRight",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#34c7c8" },
                    { offset: 1, color: "#34c7c8" },
                    // { offset: 0, color: "rgba(65, 221, 221, 1)" },
                    // { offset: 1, color: "rgba(65, 221, 221, 1)" },
                    // { offset: 0, color: "#956FD4" },
                    // { offset: 1, color: "#3EACE5" },
                  ]),
                },
              },
              {
                type: "CubeTop",
                shape: {
                  api,
                  xValue: api.value(0),
                  yValue: api.value(1),
                  x: location[0],
                  y: location[1],
                  xAxisPoint: api.coord([api.value(0), 0]),
                },
                style: {
                  fill: new graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: "#a1feff" },
                    { offset: 1, color: "#a1feff" },
                    // { offset: 0, color: "RGBA(179, 231, 210, 1)" },
                    // { offset: 1, color: "RGBA(179, 231, 210, 1)" },
                    // { offset: 0, color: "#956FD4" },
                    // { offset: 1, color: "#3EACE5" },
                  ]),
                },
              },
            ],
          };
        },
        data: VALUE,
        // 碳排放量legend背景样式设置
        itemStyle: {
          borderRadius: 5,
          color: new graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "rgba(33, 162, 163, 1)" },
            { offset: 1, color: "rgba(33, 162, 163, 1)" },
          ]),
        },
      },
      {
        name: "单位产品碳排放量",
        type: "line",
        yAxisIndex: 1,
        symbol: "none", //去除点
        // showAllSymbol: true,
        // symbolSize: 4,
        itemStyle: {
          color: "#fff",
          shadowColor: "rgba(255, 131, 21, 1)",
          shadowBlur: 20,
          borderColor: "rgba(255, 131, 21, 1)",
          borderWidth: 5,
        },
        lineStyle: {
          width: 2,
          color: "rgba(255, 131, 21, 1)",
          shadowColor: "rgba(255, 131, 21, 1)",
          shadowBlur: 20,
        },
        data: LineVALUE,
        // areaStyle: { //区域填充样式
        //     color: new graphic.LinearGradient(0, 0, 0, 1, [{
        //             offset: 0,
        //             color: "rgba(255, 131, 21, 0.7)"
        //         },
        //         {
        //             offset: 1,
        //             color: "rgba(255, 131, 21, 0)"
        //         }
        //     ], false),
        //     // shadowColor: 'rgba(255, 131, 21, 0)', //阴影颜色
        //     // shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
        // },
        areaStyle: {
          //右，下，左，上
          //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
          color: new graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "rgba(255, 131, 22, .7)",
              },
              {
                offset: 1,
                color: "rgba(255, 131, 22, 0)",
              },
            ],
            false
          ),
        },
      },
    ],
  };
  setOption(data);
};
const setOption = async (newData: any) => {
  option.value = newData;
  /** 初始化图表 */
  renderEcharts(toRaw(option.value));
};

onMounted(async () => {
  await nextTick();
  getData();
});
</script>
<style scoped lang="scss"></style>
