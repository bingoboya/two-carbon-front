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
import { graphic } from "echarts/core";
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
      triggerOn: 'mousemove'
    },
    series: {
      type: 'sankey',
      layout: 'none',
      left: '1',
      right: '1',
      bottom: '1',
      top: '1',
      emphasis: {
        focus: 'adjacency'
      },
      data: [
        {
          name: '电力'
        },
        {
          name: '天然气'
        },
        {
          name: '锌锭'
        },
        {
          name: '清洁剂'
        },
        {
          name: '钝化剂'
        },
        {
          name: '板材'
        },
        {
          name: '电镀锌板材',
          label: {
            position: 'left'
          }
        },
        {
          name: '废锌液',
          label: {
            position: 'left'
          }
        },
        {
          name: '废清洗剂',
          label: {
            position: 'left'
          }
        },
        {
          name: '废气',
          label: {
            position: 'left'
          }
        }
      ],
      links: [
      {
          source: '电力',
          target: '废锌液',
          value: 2
        },
        {
          source: '天然气',
          target: '电镀锌板材',
          value: 1
        },
        {
          source: '清洁剂',
          target: '废气',
          value: 1
        },
        {
          source: '锌锭',
          target: '废清洗剂',
          value: 1
        },
        
        {
          source: '钝化剂',
          target: '废气',
          value: 1
        },
        {
          source: '板材',
          target: '废清洗剂',
          value: 1
        },
        
        
        
      ],
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
