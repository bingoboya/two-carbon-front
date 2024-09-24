<template>
  <scale-screen
    :width="screenWidth"
    :height="screenHeight"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >

  <div class="content_wrapper"
    :style="{ backgroundImage: curPath === '/index'  ? `url(${bgSrc2})` : `url(${bgSrc3})`  }"
  >
    <div ref="wrapperRef" class="content_wrap"  :style="{ backgroundImage: curPath === '/index'  ? `url(${bgSrc3})` : `url(${bgSrc2})` }">
    <!-- <div class="content_wrap"  :style="{ backgroundImage: curPath === '/index'  ? `url(${bgSrc})` : `url(${bgSrc2})` }"> -->
      <Headers />
      <RouterView />
    </div>
  </div>
  </scale-screen>
  <Setting />
</template>
<script setup lang="ts">
import { RouterView , useRouter} from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import Setting from "./setting.vue";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
import { ref, computed, nextTick, onMounted, watch, onUnmounted } from "vue";
import { gsap } from 'gsap';
const router = useRouter()
const wrapperRef = ref<HTMLDivElement | null>(null);
const intervalId = ref<ReturnType<typeof setInterval> | null>(null);
const curPath = computed(() => {
  return router.currentRoute.value.path
})
const screenWidth = 1980
const screenHeight = 1080
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
// const bgSrc = ref('src/assets/bgpng/masklayer.png')
const bgSrc2 = '/src/assets/bgpng/整体bg.jpg'
const bgSrc3 = '/src/assets/img/房子.jpg'

watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
  if (newValue === '/second' && oldValue === '/index') {
    // gsap.fromTo('.content_wrap', { opacity: 0 }, { opacity: 1, duration: 22 });
  } 
  if (newValue === '/index' && oldValue === '/second') {
    // gsap.fromTo('.content_wrap', { opacity: 0 }, { opacity: 1, duration: 22 });
  } 
})

</script>
<style lang="scss" scoped>
.content_wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-size: cover;
  background-position: center center;
}
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 0px 16px 16px 16px;
  box-sizing: border-box;
  background-size: cover;
  background-position: center center;
}
</style>
