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
/**
 * TODO  该版本： 大概效果实现，但是当页面中使用video组件超过7个（不论大小），就会出现bug,
 * 1. 在浏览器运行当前项目，切换浏览器tab页签，再返回到当前页面，页面中的video组件会报错：该浏览器不支持video格式。
 * 2. 浏览器运行该页面，静置长时间后，video组件会出现loading,项目中使用 setInterval 简单处理该问题，但不是根本解决方案
 * 目前项目中运行后，只保留显示7个video组件，上面的问题是不存在的
*/

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
let timer: any = null
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
                // console.log('onPlayerReady', this);
            }
        );
    // }


            // 添加错误监听器
    // player.on('error', (error: any) => {
    //   console.error('Video.js error:', error)
    //   console.error('Error details:', player.error())
    // })

    // // 添加其他事件监听器
    // player.on('loadedmetadata', () => {
    //   console.log('Video metadata loaded')
    // })

    // player.on('loadeddata', () => {
    //   console.log('Video data loaded')
    // })

    // player.on('canplay', () => {
    //   console.log('Video can play')
    // })



    timer = setInterval(async () => {
        if (player) {
            // console.log('player', player,  player.pause)
            await player.pause()
            await nextTick()
            player.play()
            console.log('reload')
        }
    }, 20000);
    
})

onUnmounted(() => {
  if (player) {
    console.log('销毁', `video-player-${props.elId}`)
    player.dispose();
  }
  console.log('timer', timer)
  if (timer) {
      clearInterval(timer)
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
