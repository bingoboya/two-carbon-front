

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
    <div class="content_wrap">
      <Headers />
      <RouterView />
      <!-- message 挂载在 window 方便与在js中使用 -->
      <!-- <MessageContent /> -->
    </div>
  </scale-screen>
  <Setting />
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { RouterView } from "vue-router";
import ScaleScreen from "@/components/scale-screen";
import Headers from "./header.vue";
import Setting from "./setting.vue";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
// import MessageContent from "@/components/Plugins/MessageContent";

// const screenWidth = 4000
// const screenHeight = 857
const screenWidth = 1980
const screenHeight = 1080
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};



</script>
<style lang="scss" scoped>
.content_wrap {
  width: 100%;
  height: 100%;
  padding: 0px 16px 16px 16px;
  box-sizing: border-box;
  background-image: url("@/assets/img/bg.jpg");
  // background-image: url("@/assets/img/pageBg.png");
  background-size: cover;
  background-position: center center;
}
</style>
