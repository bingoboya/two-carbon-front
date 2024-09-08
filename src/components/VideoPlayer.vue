<template>
    <!-- TODO video组件设置id,设置ref时会出现页面静置一段时间后，video停止播放 -->
        <!-- ref="videoPlayer" -->
        <!-- :ref="`video-player-${elId}`" -->
    <video 
            :id="`video-player-${elId}`"
            class="video-js" style="position: absolute; width: 100% !important;
            height: 100% !important; background-color: #f0f8ff00 !important;" preload="auto" muted>
        <source :src="videoSrc" type="video/webm" />
    </video>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';  // 重要：保留这行代码


const props = defineProps({
    elId: {
        type: [Number, String],
        default: '1'
    },
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
// 生成唯一ID的函数
const generateUniqueId = (() => {
  let id = 0;
  return () => `video-player-${props.elId}`;
})();

const uniqueId = generateUniqueId();

// const videoPlayer: any = ref<any>(null);
let player: any = null;
// 使用函数设置ref
// const setVideoRef: any = (el: HTMLVideoElement | null) => {
//   if (el) {
//     videoPlayer.value = el;
//   }
// };
onMounted(async () => {
    await nextTick()
    // if (videoPlayer.value) {
        player = videojs(`video-player-${props.elId}`, {
            ...props.options,
            },
            function onPlayerReady() {
                console.log('onPlayerReady', this);
            }
        );
    // }
})

onUnmounted(() => {
  if (player) {
    console.log('销毁', `video-player-${props.elId}`)
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
