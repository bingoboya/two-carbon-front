

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
    <div class="content_wrap">
      <Headers />
      <RouterView />
    </div>
  </div>
  </scale-screen>
  <Setting />
</template>
<script setup lang="ts">
import { RouterView } from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import Setting from "./setting.vue";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
const screenWidth = 1980
const screenHeight = 1080
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};
</script>
<style lang="scss" scoped>
.content_wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-image: url("@/assets/img/wholebg.jpg");
  background-size: cover;
  background-position: center center;
}
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 0px 16px 16px 16px;
  box-sizing: border-box;
  background-image: url("@/assets/img/masklayer.png");
  background-size: cover;
  background-position: center center;
}
</style>
