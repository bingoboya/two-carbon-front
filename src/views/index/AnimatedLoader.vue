<template>
  <div class="wrapper" style="width: 60px; height: 60px;" ref="wrapperRef">
    <div class="content">
      <img :src="iconSrc" alt="">
    </div>
    <div class="loader">
      <div v-for="index in 6" :key="index" class="face">
        <div :class="['circle', { nocircle: index === 3 }]"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Props {
  iconSrc?: string;
}

const props = defineProps({
  iconSrc: {
    type: String,
    default: '/src/assets/newicon/co2_icon.png'
  },
});

const wrapperRef = ref<HTMLElement | null>(null);
</script>

<style scoped>
.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  position: absolute;
  width: 50%;
  height: 46%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
}

.content img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.loader {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader .face {
  position: absolute;
  border-radius: 50%;
  border-style: solid;
  border-width: 1px;
  animation: animate 5s linear infinite;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.loader .face:nth-child(1) {
  z-index: 1;
  width: 70%;
  height: 70%;
  color: gold;
  border-color: currentColor transparent transparent currentColor;
  border-width: 1px 1px 0 0;
  --deg: -45deg;
  animation-direction: normal;
}

.loader .face:nth-child(2) {
  /* color: rgb(0, 255, 106); */
  color: rgb(255 255 255 / 12%);
  border-color: currentColor;
  --deg: 0deg;
  animation-direction: reverse;
}

.loader .face:nth-child(3) {
  width: 70%;
  height: 70%;
  /* color: rgba(83, 83, 81, 0.568); */
  color: rgb(10 130 255 / 96%);
  border-color: currentColor;
  --deg: -115deg;
  animation-direction: normal;
}

.loader .face:nth-child(4),
.loader .face:nth-child(5),
.loader .face:nth-child(6) {
  /* color: rgb(0, 255, 106); */
  color: rgb(255 255 255 / 0%);
  border-color: currentColor;
  animation-direction: reverse;
}

.loader .face:nth-child(4) { --deg: 90deg; }
.loader .face:nth-child(5) { --deg: 180deg; }
.loader .face:nth-child(6) { --deg: 270deg; }

.loader .face .circle {
  position: absolute;
  width: 50%;
  height: 1px;
  top: 50%;
  left: 50%;
  background-color: transparent;
  transform: rotate(var(--deg));
  transform-origin: left;
}

.loader .face .circle::before {
  position: absolute;
  top: -3px;
  right: -3px;
  content: '';
  width: 4px;
  height: 4px;
  background-color: currentColor;
  border-radius: 50%;
  /* box-shadow: 0 0 12px,
              0 0 24px,
              0 0 36px,
              0 0 48px,
              0 0 60px,
              0 0 0 3px rgba(255, 255, 0, 0.1); */
}

.nocircle::before {
  display: none;
}

@keyframes animate {
  to {
    transform: rotate(1turn);
  }
}
</style>