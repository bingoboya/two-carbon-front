<template>
  <div class="container" @mouseenter="showTooltip" @mouseleave="hideTooltip">
    <div class="overlay"></div> <!-- 半透明遮罩层 -->
    <!-- <div v-show="isHover === false" style="position: relative;width: 180px; height: 50px;"> -->
      <video ref="videoRef" class="video-js" preload="auto" muted>
        <source :src="videoSrcPress" type="video/webm" />
      </video>
      <div @click="handleClick" class="tooltip_container"
        style="height: 100%;display: flex; justify-content: center;align-items: center;">
        <div v-if="isVisible" :style="tooltipStyle"  class="tooltip">
          <div>我是{{ name }}提示</div>
          <div>{{ 'asdasdasd2' }}</div>
          <div>{{ 'asdasdasd3' }}</div>
        </div>
        <div :style="labelStyle" class="label_style">
          {{ name }}
        </div>
      </div>
      <div class="arrow_wrapper" :style="{ backgroundImage: `url(${arrowPicSrc})` }"
        style="pointer-events: none !important;"></div>
      <!-- 打开下面的代码，是同时渲染两个video,通过ishover切换两个video组件，但是页面静置一段时间后，video会报错，没找到解决方案 -->
    <!-- <div v-show="isHover === true" style="position: relative;width: 180px; height: 50px;">
      <video ref="videoRef2" class="video-js" preload="auto" muted>
        <source :src="videoSrcPress" type="video/webm" />
      </video>

      <div @click="handleClick" class="tooltip_container"
        style="height: 100%;display: flex; justify-content: center;align-items: center;">
        <div v-if="isVisible" :style="tooltipStyle" class="tooltip">
          <div>我是{{ name }}提示</div>
          <div>{{ 'asdasdasd2' }}</div>
          <div>{{ 'asdasdasd3' }}</div>
        </div>
        <div :style="labelStyle" class="label_style">
          {{ name }}
        </div>
      </div>
      <div class="arrow_wrapper" :style="{ backgroundImage: `url(${arrowPicSrc})` }"
        style="pointer-events: none !important;">
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, nextTick, onMounted, onUnmounted, PropType, ref } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';  // 重要：保留这行代码

export default defineComponent({
  name: 'BuildingLabel',
  components: {
  },
  props: {
    arrowPicSrc: {
      type: String,
      default: '/src/assets/icon/gaoluarrow.png'
    },
    videoSrc: {
      type: String,
      required: true
    },
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
    const videoRef = ref<HTMLVideoElement | null>(null);
    const videoRef2 = ref<HTMLVideoElement | null>(null);
    const isVisible = ref(false);
    const isHover = ref(false)
    let player: any = null;
    let player2: any = null;
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
      isHover.value = true
      isVisible.value = true;
      // changeVideoSrc(player, props.videoSrc)
    };

    const hideTooltip = () => {
      isHover.value = false
      isVisible.value = false;
      // changeVideoSrc(player, props.videoSrcPress)
    };
    onMounted(async () => {
      await nextTick()
      if (videoRef.value) {
        player = videojs(videoRef.value, {
          controls: false,
          autoplay: true,
          loop: true,
          muted: true
        });
      }
      if (videoRef2.value) {
        player2 = videojs(videoRef2.value, {
          controls: false,
          autoplay: true,
          loop: true,
          muted: true
        });
      }
    });
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
    onUnmounted(() => {
      if (player) {
        player.dispose();
      }
      if (player2) {
        player2.dispose();
      }
    });
    return {
      videoRef,
      videoRef2,
      handleClick,
      showTooltip,
      isVisible, tooltipStyle, isHover,
      hideTooltip,
      labelStyle,
      ...props // 使用展开运算符返回所有 props
    };
  }
});
</script>

<style scoped>
.overlay {
    position: absolute; /* 绝对定位覆盖在容器上 */
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    width: 100%; /* 覆盖整个容器 */
    height: 80%;
    background-color: rgba(0, 0, 0, 0.2); /* 半透明黑色 */
    display: block; /* 初始隐藏 */
    z-index: 1;
}
.container{
  position: relative;width: 180px; height: 50px;
  &:hover .overlay {
    display: none; /* 鼠标悬停时显示遮罩层 */
  }
}

.arrow_wrapper {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 48px;
  height: 32px;
  background-size: cover;
  /* background-image: url('@/assets/icon/gaoluarrow.png'); */
  background-repeat: no-repeat;
}

.video-js {
  width: 100% !important;
  height: 100% !important;
  background-color: #f0f8ff00;
  position: absolute;
}
.vjs-loading-spinner { /* 设置加载圆圈 */
  display: none !important;
  font-size: 0em;
  width: 0em;
  height: 0em;
  border-radius: 0em;
  margin-top: -10000em;
  margin-left: -10000em;
}

.label_style {
  z-index: 2;
  /* font-size: 12px; */
  font-size: 22px;
  /* letter-spacing: 4px; */
  color: rgb(255, 255, 255);
  background-color: 'rgba(0,0,0,0.7)';
  color: 'white';
  padding: '2px 5px';
  border-color: '3px';
  font-style: '14px';
}

.tooltip_container {
  position: relative;
  display: inline-block;
  cursor: pointer;
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