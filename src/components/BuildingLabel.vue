<template>
  <div class="container" :style="{ backgroundImage: `url(${bgPicSrc})` }" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <div class="overlay"></div> <!-- 半透明遮罩层 -->
    <!-- <VideoPlayer :elId="`2-${name}`" :videoSrc="videoSrcPress" /> -->
    <div @click="handleClick" class="tooltip_container"
      style="height: 100%;display: flex; justify-content: center;align-items: center;">
      <div v-if="isVisible" :style="tooltipStyle"  class="tooltip">
        <div>我是{{ name }}提示</div>
        <div>我是{{ name }}提示</div>
        <div>我是{{ name }}提示</div>
      </div>
      <div :style="labelStyle" class="label_style">
        {{ name }}
      </div>
    </div>
    <div class="arrow_wrapper" :style="{ backgroundImage: `url(${arrowPicSrc})` }"
      style="pointer-events: none !important;">
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue';
// import VideoPlayer  from '@/components/VideoPlayer.vue';

export default defineComponent({
  name: 'BuildingLabel',
  components: {
  },
  props: {
    bgPicSrc: {
      type: String,
      default: '/src/assets/bgpng/电镀锌弹框_default.png'
    },
    arrowPicSrc: {
      type: String,
      default: '/src/assets/icon/gaoluarrow.png'
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
  },
  setup(props: any) {
    const isVisible = ref(false);
    const isHover = ref(false)
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
    const changeVideoSrc=(target: any, src: any) => {
      // 切换视频可以，但是切换速度慢，不适用当前场景
      const data = {
        src: src,
        type: 'video/webm',
      };
      if (videoRef.value) {
        target.pause();
        target.src(data);
        target.load(data);
        // 动态切换poster
        // target.posterImage.setSrc('xxx.jpg');
        target.play();
      }

    }
    return {
      handleClick,
      showTooltip,
      isVisible, tooltipStyle, isHover,
      hideTooltip,
      labelStyle,
      ...props
    };
  }
});
</script>

<style scoped>
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
.container{
  background-size: contain;
  background-repeat: no-repeat;
  position: relative;width: 180px; height: 50px;
  &:hover .overlay {
    display: none;
  }
  &:hover  {
    transform: scale(1.05);
  }
}

.arrow_wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 32px;
  background-size: cover;
  background-repeat: no-repeat;
}

.label_style {
  z-index: 2;
  font-size: 22px;
  letter-spacing: 4px;
  color: rgb(255, 255, 255);
  background-color: 'rgba(0,0,0,0.7)';
  color: 'white';
  padding: 2px 5px;
  border-color: 3px;
  font-style: 14px;
}

.tooltip_container {
  position: relative;
  display: inline-block;
  cursor: pointer;
  font-size: 22px;
  padding: 10px;
}

.tooltip {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.5);
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