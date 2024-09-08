<!--  InteractiveFactoryMap.vue -->
<template>
  <div ref="containerRef" class="video-container">
    <video
      ref="videoRef"
      class="video-js"
      preload="auto"
      muted
    >
      <source :src="videoSrc" type="video/webm" />
    </video>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed, watch, onUnmounted, nextTick } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';  // 重要：保留这行代码

export default defineComponent({
  name: 'headerWebm',
  props: {
    videoSrc: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // const containerRef = ref<HTMLDivElement | null>(null);
    const videoRef = ref<HTMLVideoElement | null>(null);
    // const isPlaying = ref(true);

  

    let player: videojs.Player | null = null;
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
    });
    onUnmounted(() => {
      if (player) {
        player.dispose();
      }
    });
    return {
      // containerRef,
      videoRef,
      // isPlaying,
    };
  }
});
</script>

<style scoped>
.video-js {
  width: 100% !important;
  height: 100% !important;
  background-color: #f0f8ff00;
  .vjs-loading-spinner {
    display: none !important;
  }
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
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

video, canvas {
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