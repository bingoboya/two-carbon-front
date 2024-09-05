

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
import { ref, reactive, onMounted, nextTick } from "vue";
import { installationPlan } from "@/api";
import { graphic } from "echarts/core";
import { ElMessage } from "element-plus";

const option: any = ref({});

// 
const offsetX = 14;
const offsetY = 6;
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
        ctx.moveTo(c0[0], c0[1]).lineTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).closePath();
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
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
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
        ctx.moveTo(c1[0], c1[1]).lineTo(c2[0], c2[1]).lineTo(c3[0], c3[1]).lineTo(c4[0], c4[1]).closePath();
    },
});
// 注册三个面图形
graphic.registerShape('CubeLeft', CubeLeft);
graphic.registerShape('CubeRight', CubeRight);
graphic.registerShape('CubeTop', CubeTop);

const VALUE = [100, 200, 300, 300, 300, 200, 100, 220, 120, 80, 300, 100];
const LineVALUE = [200, 300, 200, 100, 200, 200, 100, 120, 220, 180, 30, 200];

const newOption = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
        formatter: function (params: any, ticket: any, callback: any) {
            const item = params[1];
            return item.name + ' : ' + item.value;
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
      left: "10px",
      right: "10px",
      bottom: "30px",
      top: "50px",
      containLabel: true,
    },
    // grid: {
    //     left: '10%',
    //     right: '10%',
    //     top: '15%',
    //     bottom: '10%',
    //     containLabel: true,
    // },
    xAxis: {
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        axisLine: {
            show: true,
            lineStyle: {
                width: 2,
                color: '#2B7BD6',
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            fontSize: 14,
        },
    },
    yAxis: {
        type: 'value',
        axisLine: {
            show: true,
            lineStyle: {
                width: 2,
                color: '#2B7BD6',
            },
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#153D7D',
            },
        },
        axisTick: {
            show: false,
        },
        axisLabel: {
            fontSize: 14,
        },
        // boundaryGap: ['20%', '20%'],
    },
    series: [
        {
            type: 'custom',
            renderItem: (params: any, api: any) => {
                const location = api.coord([api.value(0), api.value(1)]);
                return {
                    type: 'group',
                    children: [
                        {
                            type: 'CubeLeft',
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
                                    {
                                        offset: 0,
                                        color: '#33BCEB',
                                    },
                                    {
                                        offset: 1,
                                        color: '#337CEB',
                                    },
                                ]),
                            },
                        },
                        {
                            type: 'CubeRight',
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
                                    {
                                        offset: 0,
                                        color: '#28A2CE',
                                    },
                                    {
                                        offset: 1,
                                        color: '#1A57B7',
                                    },
                                ]),
                            },
                        },
                        {
                            type: 'CubeTop',
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
                                    {
                                        offset: 0,
                                        color: '#43C4F1',
                                    },
                                    {
                                        offset: 1,
                                        color: '#28A2CE',
                                    },
                                ]),
                            },
                        },
                    ],
                };
            },
            data: VALUE,
        },
        {
          type: 'bar',
          name: '碳排放量',
          label: {
            show: !true,
            position: 'top',
            formatter: (e: any) => {
                return e.value + '次';
                /*console.log(e)
                switch (e.name) {
                    case '1001':
                        return e.value;
                    case '1002':
                        return VALUE[1];
                    case '1003':
                        return VALUE[2];
                }*/
            },
            fontSize: 12,
            color: '#43C4F1',
            offset: [0, -25],
          },
          itemStyle: {
            color: 'transparent',
          },
          tooltip: {
            show: true, // 显示提示信息
          },
          data: VALUE,
        },
        {
          name: '同比',
          type: 'line', // 设置类型为 'line'
          smooth: true,
          showSymbol: false,
          // symbol: 'circle', // 标记点为圆形
          // symbolSize: 10, // 标记点的大小
          data: LineVALUE,
          label: {
            show: !true, // 显示数据标签
            position: 'top', // 标签位置
            fontSize: 12, // 字体大小
            color: '#333', // 字体颜色
          },
          lineStyle: {
            color: '#FFA321', // 线条颜色
            width: 2, // 线条宽度
          },
          itemStyle: {
            color: '#FFA321', // 标记点颜色
          },
          tooltip: {
            show: true, // 显示提示信息
          },
        }
    ],
}



// 

const getData = () => {
  installationPlan()
    .then((res) => {
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
  option.value = newOption
  };





onMounted(() => {
  getData();
});
</script>
<style scoped lang="scss"></style>
