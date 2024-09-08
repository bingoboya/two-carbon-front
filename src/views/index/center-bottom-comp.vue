<template>
  <div ref="centerBottomCompRef" style="height:120px;background-color: rgb(0,0,0,0);">
    <div style="position: relative;width: 120%; height: 100%;left: 50%; transform: translateX(-50%);">
      <VideoPlayer :elId="4" :videoSrc="'/src/assets/webm/d底部背景动效.webm'" />
    </div>
    <div class="bottom_item_wrapper">
      <div @click="routerGo('高炉')" class="bottom_item" style="position: relative;">
          <VideoPlayer :elId="5" class="bottom_webm" :videoSrc="'/src/assets/webm/g高炉按钮_press.webm'" style="bottom: -20px;" />
      </div>
      <div @click="routerGo('炼钢')" class="bottom_item" style="position: relative;">
          <VideoPlayer :elId="6" class="bottom_webm" :videoSrc="'/src/assets/webm/g炼钢按钮_press.webm'" style="bottom: -20px;"/>
      </div>
      <div @click="routerGo('热轧')" class="bottom_item" style="position: relative;">
          <VideoPlayer :elId="7" class="bottom_webm" :videoSrc="'/src/assets/webm/g热轧按钮_press.webm'" style="bottom: -20px;"/>
      </div>
      <div @click="routerGo('冷轧')" class="bottom_item" style="position: relative;">
          <VideoPlayer :elId="8" class="bottom_webm" :videoSrc="'/src/assets/webm/g冷轧按钮_press.webm'" style="bottom: -20px;"/>
      </div>
      <div @click="routerGo('电镀锌')" class="bottom_item" style="position: relative;">
          <VideoPlayer :elId="9" class="bottom_webm" :videoSrc="'/src/assets/webm/g电镀锌按钮_press.webm'" style="bottom: -20px;"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer  from '@/components/VideoPlayer.vue';
import { gsap } from 'gsap';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router'
const router = useRouter()

const routerGo = (name: any) => {
  router.push({ path: 'second', query: { typename: name }})
}
const centerBottomCompRef = ref<HTMLDivElement | null>(null)

const animateDivs = () => {
  if (centerBottomCompRef.value) {
    const height = centerBottomCompRef.value.getBoundingClientRect().height; // x: -458

    gsap.from(centerBottomCompRef.value, { y: height, duration: 2 });


  }
};
onMounted(() => {
  animateDivs();
});
</script>

<style lang="scss" scoped>
.bottom_item_wrapper {
  width: 100%;
  height: 60%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -30%);
  .bottom_item{
    width: 176px;
    height: 90px;
    cursor: pointer;
    &:hover{
      .bottom_webm {
        // display: none;
        bottom: -15px !important;
      }
      // display: none;
    }
  }
}
</style>