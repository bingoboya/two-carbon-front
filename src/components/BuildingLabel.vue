<template>
  <div class="container" :class="isHover ? 'container_style_large' : 'container_style_small'"
    :style="{ 'backgroundImage': `url(${bgPicSrc})` }" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <div class="overlay" :class="isHover ? 'hidden_overlay' : 'show_overlay'"></div> <!-- 半透明遮罩层 -->
    <!-- <VideoPlayer :elId="`2-${name}`" :videoSrc="videoSrcPress" /> -->
    <div @click="handleClick" class="tooltip_container"
      style="height: 100%;display: flex; justify-content: center;align-items: center;">
      <div v-if="isVisible" :style="tooltipStyle" class="tooltip">
        <div>我是{{ name }}提示</div>
        <div>我是{{ name }}提示</div>
        <div>我是{{ name }}提示</div>
      </div>
      <div :style="labelStyle" class="label_style">
        {{ name }}
      </div>
    </div>
    <div class="arrow_wrapper" :style="{ '--animation-duration': `${animationDuration}s` }"
      style="pointer-events: none !important;">
      <div v-for="(_, index) in 3" :key="index" class="arrow_item" :style="{ backgroundImage: `url(${arrowPicSrc})` }">
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';

const props = defineProps({
  bgPicSrc: {
    type: String,
    default: '/src/assets/bgpng/电镀锌弹框_default.png'
  },
  arrowPicSrc: {
    type: String,
    default: '/src/assets/icon/gaoluarrow.png'
  },
  speed: {
    // 'slow' | 'normal' | 'fast'
    type: String,
    default: 'normal'

  },

  // videoSrc: {
  //   type: String,
  //   required: true
  // },
  videoSrcPress: {
    type: String,
    default: '/src/assets/icon/gaoluarrowpress.png'
  },
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
})
const isVisible = ref(false);
const isHover = ref(false)
const tooltipStyle = computed(() => ({
  // left: `${props.positionX}px`,
  // top: `${props.positionY + 20}px`,
}));

const animationDuration = computed(() => {
  switch (props.speed) {
    case 'slow':
      return 4.5;
    case 'fast':
      return 1.5;
    default:
      return 3;
  }
})

const handleClick = () => {
  console.log('positionX', props.positionX, props.positionY)
  props.onLabelClick(props.name);
};

const labelStyle = {
  // backgroundColor: 'rgba(0,0,0,0.7)',
  // cursor: 'pointer',
};

const showTooltip = () => {
  isHover.value = true
  isVisible.value = true;
  // changeVideoSrc(player, props.videoSrc)
};

const hideTooltip = () => {
  isHover.value = false
  isVisible.value = false;
  // changeVideoSrc(player, props.videoSrcPress)
};
// 动态切换视频
// const changeVideoSrc=(target: any, src: any) => {
//   // 切换视频可以，但是切换速度慢，不适用当前场景
//   const data = {
//     src: src,
//     type: 'video/webm',
//   };
//   if (videoRef.value) {
//     target.pause();
//     target.src(data);
//     target.load(data);
//     // 动态切换poster
//     // target.posterImage.setSrc('xxx.jpg');
//     target.play();
//   }
// }

/**
 * @params 调用当前建筑物的name属性
 * @type 'enter': 鼠标划入 
 *       'leave'：鼠标划出
*/
const funabc = (params: any, type: string) => {
  console.log('funabc', params, type)
  if (type === 'enter') {
    showTooltip()
  } else if (type === 'leave') {
    hideTooltip()
  }
}
defineExpose({
  funabc
})
</script>



<style scoped>
.arrow_wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  opacity: 0.8;
}

.hidden_overlay {
  display: none;
}

.show_overlay {
  display: block;
}
@keyframes floatlarge {
  0%, 100% {
    transform: translateY(0) scale(1.2);
  }
  50% {
    transform: translateY(-15px) scale(1.2);
  }
}
@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}
.container {
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;
  width: 146px;
  height: 40px;
  will-change: transform;


  /* &:hover .overlay {
    display: none;
  } */

  /* &:hover {
    transform: scale(1.05);
  } */
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

.label_style {
  z-index: 2;
  font-size: 16px;
  letter-spacing: 4px;
  color: rgb(255, 255, 255);
  /* background-color: rgba(0,0,0,0.7); */
  padding: 2px 5px;
}

.tooltip_container {
  position: relative;
  display: inline-block;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.8);
  border: 1px solid #fff;
  color: white;
  padding: 10px;
  border-radius: 4px;
  font-size: 14px;
  white-space: nowrap;
  pointer-events: none;
  transform: translate(0, -90%);
}
</style>