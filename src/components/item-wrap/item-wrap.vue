<template>
  <BorderBox13>
    <div class="item_title" style="" :style="{ backgroundImage: `url(${titlebg})` }" v-if="title !== ''">
      {{ title }}
      <!-- 六个光标 -->
      <div v-if="titlebg === '/src/assets/bgpng/头部2.png'" class="svg_wrapper_six" style="">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200">
          <!-- 第一个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="25" y="85" transform="rotate(30, 30, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
          </rect>

          <!-- 第二个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="75" y="85" transform="rotate(30, 80, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.2"></animate>
          </rect>

          <!-- 第三个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="125" y="85" transform="rotate(30, 130, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
          </rect>

          <!-- 第四个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="175" y="85" transform="rotate(30, 180, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin=".2"></animate>
          </rect>

          <!-- 第五个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="225" y="85" transform="rotate(30, 230, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin=".4"></animate>
          </rect>

          <!-- 第六个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="275" y="85" transform="rotate(30, 280, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin=".6"></animate>
          </rect>
        </svg>
      </div>
      <!-- 三个光标 -->
      <div v-else class="svg_wrapper_three" style="">

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 200">
          <!-- 第一个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="25" y="85" transform="rotate(30, 30, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="-.4"></animate>
          </rect>

          <!-- 第二个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="45" y="85" transform="rotate(30, 50, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin="0"></animate>
          </rect>

          <!-- 第三个矩形 -->
          <rect fill="rgba(255,255,255,0.699)" stroke="rgba(255,255,255,0.699)" stroke-width="0" width="10" height="30"
            x="65" y="85" transform="rotate(30, 70, 100)">
            <animate attributeName="opacity" calcMode="spline" dur="3.7" values="1;0;1;"
              keySplines=".5 0 .5 1;.5 0 .5 1" repeatCount="indefinite" begin=".4"></animate>
          </rect>
        </svg>

      </div>
    </div>
    <div style="flex:1; width: 100%;padding: 12px;overflow: hidden;">
      <slot></slot>
    </div>
  </BorderBox13>
</template>
<script setup lang="ts">
import BorderBox13 from "@/components/datav/border-box-13";

const props = defineProps({
  title: {
    type: [Number, String],
    default: '1'
  },
  titlebg: {
    type: String,
    default: '/src/assets/bgpng/头部2.png'
  }
})
</script>
<style scoped lang="scss">
$item-title-height: 56px;
$item_title_content-height: calc(100% - 56px);

.svg_wrapper_six {
  width: 58px;
  height: 31px;
  position: absolute;
  bottom: 0;
  right: 122px;
}

.svg_wrapper_three {
  width: 30px;
  height: 36px;
  position: absolute;
  bottom: 6px;
  right: 22px;
}

.item_title {
  position: relative;
  font-size: 22px;
  padding-left: 42px;
  padding-bottom: 14px;
  height: $item-title-height;
  line-height: $item-title-height;
  width: 100%;
  background-repeat: round;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
