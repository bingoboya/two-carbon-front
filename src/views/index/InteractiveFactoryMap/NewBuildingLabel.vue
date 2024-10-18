<template>
  <div class="container" :class="isHover ? 'container_style_large' : 'container_style_small'"
     @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <div class="overlay" :class="isHover ? 'hidden_overlay' : 'show_overlay'"></div>
    <div @click="handleClick" class="tooltip_container">
      <div :style="tooltipStyle" class="tooltip">
        <div class="tooltip_content_wrap">
          <div>碳排放量</div>
          <div>{{ building.carbonEmission }}</div>
          <div>万吨</div>
        </div>
        <div class="tooltip_content_wrap">
          <div>能耗</div>
          <div>{{ building.energyConsumption }}</div>
          <div>万吨标准煤</div>
        </div>
        <div class="tooltip_content_wrap">
          <div>用电量</div>
          <div>{{ building.power }}</div>
          <div>万千瓦时</div>
        </div>
      </div>
      <div class="label_style" :style="{ backgroundImage: `url(${building.bgPicSrc})`, width: `${building.width}px`, height: `${building.height}px` }">
        {{ building.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  building: {
    type: Object,
    default: () => { }
  }
})
const isHover = ref(false);
console.log('props.building', props.building);
// const isVisible = ref(false);
const handleClick = () => {
  // props.building.onLabelClick(props.building.name);
};
const showTooltip = () => {
  isHover.value = true;
  // isVisible.value = true;
  // changeVideoSrc(player, props.videoSrc)
};

const hideTooltip = () => {
  isHover.value = false;
  // isVisible.value = false;
};
const tooltipStyle = computed(() => ({
  backgroundImage: `url(${props.building.toolTipBg})`,
  // left: `${props.positionX}px`,
  // top: `${props.positionY + 20}px`,

}));
/**
 * @params 调用当前建筑物的name属性
 * @type 'enter': 鼠标划入
 *       'leave'：鼠标划出
 */
 const funabc = (params: any, type: string) => {
  console.log("funabc", params, type);
  if (type === "enter") {
    showTooltip();
  } else if (type === "leave") {
    hideTooltip();
  }
};
defineExpose({
  funabc,
  // updateValues,
  // name: props.name
});
</script>

<style lang="scss" scoped>
.container {
  background-size: contain;
  background-repeat: round;
  position: relative;
  // width: 210px;
  // width: 146px;
  height: 40px;
  will-change: transform;

  /* &:hover .overlay {
    display: none;
  } */

  /* &:hover {
    transform: scale(1.05);
  } */
}

.label_style {
  z-index: 2;
  font-size: 16px;
  letter-spacing: 4px;
  color: rgb(255, 255, 255);
  /* background-color: rgba(0,0,0,0.7); */
  padding: 2px 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.tooltip_content_wrap {
  display: flex;
  flex-direction: row;
  gap: 10px;

  > :nth-child(1) {
    width: 54px;
    text-align-last: justify;
    text-align: justify;
  }
}

.arrow_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  pointer-events: none !important;
}

.arrow_item_line {
  width: 2px;
  height: 66px;
  // transform: rotate(180deg);
  background-repeat: round;
  // opacity: 0;
  // animation: fadeInOut var(--animation-duration) infinite;
}

.arrow_item {
  width: 30px;
  height: 30px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 5px;
  opacity: 0;
  animation: fadeInOut var(--animation-duration) infinite;
}

.arrow_item:nth-child(2) {
  animation-delay: calc(var(--animation-duration) / 3);
}

.arrow_item:nth-child(3) {
  animation-delay: calc(var(--animation-duration) / 3 * 2);
}

@keyframes fadeInOut {

  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
}

.overlay {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  height: 80%;
  background-color: rgba(0, 0, 0, 0.2);
  display: block;
  z-index: 1;
}

.container_style_large {
  animation: floatlarge 3s ease-in-out infinite;
  opacity: 1;
}

.container_style_small {
  animation: float 3s ease-in-out infinite;
  opacity: 1;
}

.hidden_overlay {
  display: none;
}

.show_overlay {
  display: block;
}

@keyframes floatlarge {

  0%,
  100% {
    transform: translateY(0) scale(1.2);
  }

  50% {
    transform: translateY(-15px) scale(1.2);
  }
}

@keyframes float {

  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-6px);
  }
}

.arrow_wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  /* width: 48px;
  height: 32px;
  background-size: cover;
  background-repeat: no-repeat; */
}

.arrow_item {
  /* position: absolute; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  width: 40px;
  height: 24px;
  background-size: cover;
  background-repeat: no-repeat;
}

.tooltip_container {
  position: relative;
  // display: inline-block;
  cursor: pointer;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.tooltip {
  position: absolute;
  background-repeat: round;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(0, -90%);
  // background-image: url('@/assets/bgpng/高炉框.png');
}
</style>
