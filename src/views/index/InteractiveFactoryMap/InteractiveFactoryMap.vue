<template>
  <div ref="containerRef" class="video-container">
    <div class="overlay_wrapper">
      <div class="overlay_item_wrap" :style="{ top: item.top + 'px', left: item.left + 'px' }"
        v-for="(item) in props.buildingArr" :key="item.name" @click="onLabelClick(item.name)">
        <NewBuildingLabel :ref="(el: any) => { customItems[item.name] = el }" :building="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NewBuildingLabel from './NewBuildingLabel.vue';
const emits = defineEmits(['callBackFunction'])

const props: any = defineProps({
  buildingArr: {
    type: Array,
    default: []
  }
})
const customItems: any = ref([])
const containerRef = ref<HTMLDivElement | null>(null);

const onLabelClick = (name: string) => {
  if (name === '电镀锌') {
    emits('callBackFunction', name)
  }
  // router.push({ path: 'second', query: { typename: building.name }})
  // 在这里添加你想要的标签点击处理逻辑
}

// 调用特定建筑的 funabc 函数
const callFunabcForBuilding = (buildingName: string, type: string) => {
  customItems.value[buildingName]?.funabc(buildingName, type) // 调用第一个 customItem 组件实例的 myMethod 方法
};

defineExpose({
  callFunabcForBuilding
})
</script>

<style scoped>
.overlay_item_wrap {
  position: absolute;
}

.overlay_wrapper {
  /* background: rgba(0, 0, 0, 0.7); */
  position: absolute;
  width: 100%;
  height: 100%;
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

video,
canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.info-card {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.controls {
  margin-top: 10px;

  z-index: 555;
  color: red;
  position: absolute;
  left: 700px;
}
</style>
