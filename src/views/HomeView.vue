

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
  <div class="content_wrapper">
    <div class="content_wrap"  :style="{ backgroundImage: curPath === '/index'  ? `` : `url(${bgSrc2})` }">
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
import { ref, computed } from "vue";
const router = useRouter()
// console.log(11111, router.currentRoute.value.path)
const curPath = computed(() => {
  return router.currentRoute.value.path
})
const screenWidth = 1980
const screenHeight = 1080
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
const bgSrc = ref('src/assets/bgpng/masklayer.png')
const bgSrc2 = ref('src/assets/bgpng/整体底部bg.jpg')
</script>
<style lang="scss" scoped>
.content_wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: url("@/assets/img/房子.jpg");
  // background-image: url("@/assets/img/wholebg.jpg");
  background-size: cover;
  background-position: center center;
}
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 0px 16px 16px 16px;
  box-sizing: border-box;
  // background: url("src/assets/bgpng/masklayer.png");
  // background: url("src/assets/bgpng/整体底部bg.jpg");

  background-size: cover;
  background-position: center center;
}
</style>
