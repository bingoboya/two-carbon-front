<template>
    <div class="tooltip-container" style="">
      <div v-if="isVisible" :style="tooltipStyle" class="tooltip">
        <div>我是{{ name }}提示</div>
        <div>{{ 'asdasdasd2' }}</div>
        <div>{{ 'asdasdasd3' }}</div>
      </div>
      <div
        @click="handleClick"
        :style="labelStyle"
        class="label_style"
        @mouseenter="showTooltip"
        @mouseleave="hideTooltip"
      >
        {{ name }}
      </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
interface BuildingLabelProps {
  name: string;
  info: string;
  positionX: number;
  positionY: number;
  onLabelClick: (name: string) => void;
}

export default defineComponent({
  name: 'BuildingLabel',
  components: {
  },
  props: {
    name: {
      type: String,
      required: true
    },
    info: {
      type: String,
      required: true
    },
    positionX: {
      type: Number,
      required: true
    },
    positionY: {
      type: Number,
      required: true
    },
    onLabelClick: {
      type: Function as PropType<(name: string) => void>,
      required: true
    }
  },
  setup(props: BuildingLabelProps) {

    const isVisible = ref(false);

    const tooltipStyle = computed(() => ({
      // left: `${props.positionX}px`,
      // top: `${props.positionY + 20}px`,
    }));
    const handleClick = () => {
      console.log('positionX', props.positionX, props.positionY)
      props.onLabelClick(props.name);
    };

    const labelStyle = {
      // backgroundColor: 'rgba(0,0,0,0.7)',
      // cursor: 'pointer',
    };

    const showTooltip = () => {
      console.log('showTooltip', tooltipStyle)
      isVisible.value = true;
    };

    const hideTooltip = () => {
      isVisible.value = false;
    };

    return {
      handleClick,
      showTooltip,
      isVisible,tooltipStyle,
      hideTooltip,
      labelStyle,
      ...props // 使用展开运算符返回所有 props
    };
  }
});
</script>

<style scoped>
.label_style {
  font-size: 22px;
  color: red;
  background-color: 'rgba(0,0,0,0.7)';
  color: 'white';
  padding: '2px 5px';
  border-color: '3px';
  font-style: '14px';
  cursor: 'pointer';
}
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 14px;
  z-index: 1000;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(-25%, -100%);
  margin-top: -10px;
}
</style>