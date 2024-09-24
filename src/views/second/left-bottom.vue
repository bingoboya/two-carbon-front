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
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { installationPlan } from "@/api";
import { ElMessage } from "element-plus";

const option = ref({});
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
  option.value = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
      backgroundColor: "rgba(0,0,0,.6)",
      borderColor: "rgba(147, 235, 248, .8)",
      textStyle: {
        color: "#FFF",
      },
    },
    series: {
      type: 'sankey',
      layout: 'none',
      layoutIterations:0,
      draggable: false,
      left: '1',
      right: '1',
      bottom: '1',
      top: '1',
      emphasis: {
        focus: 'adjacency'
      },
      data: [
        {
          name: '电力',
          itemStyle: {
            color: '#49dddd'
          }
        },
        {
          name: '热力',
          itemStyle: {
            color: '#49dddd'
          }
        },
        {
          name: '高炉煤气',
          itemStyle: {
            color: '#d2cd3d'
          }
        },
        {
          name: '焦炉煤气',
          itemStyle: {
            color: '#d2cd3d'
          }
        },
        {
          name: '二级除盐水',
          itemStyle: {
            color: '#49dddd'
          }
        },
        {
          name: '其他',
          itemStyle: {
            color: '#99e8ff'
          }
        },
        {
          name: '酸轧',
          label: {
            position: 'left'
          },
          itemStyle: {
            color: "#3598eb"
          }
        },
        {
          name: '连退',
          label: {
            position: 'left'
          },
          itemStyle: {
            color: "#33a2a3"
          }
        },
        {
          name: '电镀锌(精整)',
          label: {
            position: 'left'
          },
          itemStyle: {
            color: "purple"
          }
        }
      ],
      links: [
        {
          source: '电力',
          target: '酸轧',
          value: .5
        },
        {
          source: '电力',
          target: '连退',
          value: .5
        },
        {
          source: '热力',
          target: '酸轧',
          value: .5
        },
        {
          source: '热力',
          target: '连退',
          value: .5
        },
        {
          source: '焦炉煤气',
          target: '连退',
          value: .5
        },
        {
          source: '其他',
          target: '连退',
          value: .5
        },
        
        {
          source: '二级除盐水',
          target: '连退',
          value: .5
        },
        {
          source: '二级除盐水',
          target: '酸轧',
          value: .5
        },
        {
          source: '高炉煤气',
          target: '连退',
          value: 0.5
        },
        {
          source: '焦炉煤气',
          target: '连退',
          value: 0.5
        },
        {
          source: '高炉煤气',
          target: '连退',
          value: 0.5
        },
        {
          source: '电力',
          target: '电镀锌(精整)',
          value: 0.5
        },
        {
          source: '电力',
          target: '电镀锌(精整)',
          value: 0.5
        },
        {
          source: '电力',
          target: '电镀锌(精整)',
          value: 0.5
        },
        
        
        
      ],
      label: {
        color: '#fff',
        fontSize: 12
      },
      lineStyle: {
        color: 'source',
        curveness: 0.5
      }
    },
  };
};
onMounted(() => {
  getData();
});
</script>



<style scoped lang="scss"></style>
