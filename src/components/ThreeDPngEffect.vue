<script setup lang="ts">
/**
 * 1. 使用 requestAnimationFrame 进行连续绘制：
  在 draw 函数中，我们使用 requestAnimationFrame 来循环调用绘制函数。
  这确保了动画的流畅性，并且与浏览器的重绘周期同步，提高了性能。
  2. 分离鼠标移动逻辑和绘制逻辑：
  handleMouseMove 现在只更新 tiltX 和 tiltY 值。
  实际的变换应用在 draw 函数中进行，这减少了不必要的样式计算。
  3. 优化性能：
  由于使用了 requestAnimationFrame，我们不再需要在 CSS 中设置 transition，因为动画现在是逐帧计算的。
  这种方法可以提供更流畅的动画效果，特别是在处理复杂变换时。
  4. 适当的清理：
  在组件卸载时，我们现在会取消任何正在进行的动画帧请求，以防止内存泄漏。
  5. 响应式更新：
  当图片源改变时，组件会重新加载图片并重新开始动画循环。

  这个优化版本应该能提供更流畅的 3D 效果，尤其是在处理鼠标快速移动或在低性能设备上时。同时，它保持了之前版本的所有功能，包括自适应大小、可配置的最大倾斜角度等。
*/
import { ref, onMounted, onUnmounted, watch } from 'vue';

interface Props {
  imageSrc: string;
  maxTiltAngle?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxTiltAngle: 30
});

const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
let imgElement: HTMLImageElement | null = null;
let rafId: number | null = null;
let tiltX = 0;
let tiltY = 0;

const draw = () => {
  if (!canvasRef.value || !imgElement) return;
  const ctx = canvasRef.value.getContext('2d');
  if (!ctx) return;

  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.drawImage(imgElement, 0, 0, canvasRef.value.width, canvasRef.value.height);

  canvasRef.value.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

  rafId = requestAnimationFrame(draw);
};

const handleMouseMove = (e: MouseEvent) => {
  if (!containerRef.value) return;

  const rect = containerRef.value.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  tiltX = ((y / rect.height) - 0.5) * props.maxTiltAngle;
  tiltY = ((x / rect.width) - 0.5) * -props.maxTiltAngle;
};

const handleMouseLeave = () => {
  tiltX = 0;
  tiltY = 0;
};

const resizeCanvas = () => {
  if (!containerRef.value || !canvasRef.value) return;
  
  const { width, height } = containerRef.value.getBoundingClientRect();
  canvasRef.value.width = width;
  canvasRef.value.height = height;
};

onMounted(() => {
  if (!containerRef.value) return;

  imgElement = new Image();
  imgElement.src = props.imageSrc;
  imgElement.onload = () => {
    resizeCanvas();
    rafId = requestAnimationFrame(draw);
  };

  window.addEventListener('resize', resizeCanvas);
  containerRef.value.addEventListener('mousemove', handleMouseMove);
  containerRef.value.addEventListener('mouseleave', handleMouseLeave);
});

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas);
  if (containerRef.value) {
    containerRef.value.removeEventListener('mousemove', handleMouseMove);
    containerRef.value.removeEventListener('mouseleave', handleMouseLeave);
  }
  if (rafId !== null) {
    cancelAnimationFrame(rafId);
  }
});

watch(() => props.imageSrc, (newSrc) => {
  if (imgElement) {
    imgElement.src = newSrc;
  }
});
</script>

<template>
  <div ref="containerRef" class="png-3d-effect-container">
    <canvas ref="canvasRef" class="png-3d-effect-canvas"></canvas>
  </div>
</template>

<style scoped>
.png-3d-effect-container {
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.png-3d-effect-canvas {
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}
</style>