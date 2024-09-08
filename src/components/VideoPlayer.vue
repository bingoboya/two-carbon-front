<template>
    <!-- <div> -->
        <!-- <video ref="videoPlayer" class="video-js"></video> -->
        <video ref="videoPlayer" class="video-js" style="position: absolute; width: 100% !important;
                height: 100% !important; background-color: #f0f8ff00 !important;" preload="auto" muted>
            <source :src="videoSrc" type="video/webm" />
        </video>
    <!-- </div> -->
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';  // 重要：保留这行代码


const props = defineProps({
    videoSrc: {
        type: String,
        default: '/src/assets/webm/e顶部卡片长背景.webm'
    },
    options: {
        type: Object,
        default() {
            return {
                fluid: true,
                controls: false,
                autoplay: true,
                loop: true,
                muted: true
            };
        }
    }
})

const videoPlayer: any = ref<HTMLVideoElement | null>(null);
let player: any = null;

onMounted(async () => {
    await nextTick()
    if (videoPlayer.value) {
        player = videojs(videoPlayer.value, {
            ...props.options,
            fluid: true,
            controls: false,
            autoplay: true,
            loop: true,
            muted: true
            },
            function onPlayerReady() {
                console.log('onPlayerReady', this);
            }
        );
    }
})

onUnmounted(() => {
  if (player) {
    player.dispose();
  }
});

</script>
<style scoped lang="scss">
.video-js {
  // width: 100% !important;
  // height: 100% !important;
  // background-color: #f0f8ff00;
  // position: absolute;
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
</style>
