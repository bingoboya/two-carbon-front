<template>
    <div class="canvas-container">
      <!-- canvas 元素用于绘制图片和弹窗 -->
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, onBeforeUnmount, ref, watchEffect } from 'vue';
  
  // 引用图片资源
  const imageUrl = 'src/assets/img/centerimg.png'; // 替换为实际图片路径
  
  // 引用 canvas 元素和绘图上下文
  const canvasRef = ref(null);
  const ctxRef = ref(null);
  
  // 存储弹窗数据，包括位置和内容
  const popups = ref([
    {
      id: 'popup1',
      x: 0.3, // 相对于图片宽度的x坐标
      y: 0.6, // 相对于图片高度的y坐标
      content: '弹窗1',
      style: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        border: '1px solid #000',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer'
      },
      onClick: () => alert('弹窗1被点击')
    },
    // 可以添加更多弹窗
  ]);
  
  // 加载并显示图片
  function loadImage() {
    const image = new Image();
    image.onload = () => {
      const canvas = canvasRef.value;
      const ctx = canvas.getContext('2d');
      ctxRef.value = ctx;
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      drawPopups();
    };
    image.src = imageUrl;
  }
  
  // 绘制所有弹窗
  function drawPopups() {
    const ctx = ctxRef.value;
    popups.value.forEach(popup => {
      const { x, y, content, width, height, style } = popup;
      const image = canvasRef.value;
      const posX = (image.width * x) - (width / 2);
      const posY = (image.height * y) - (height / 2);
  
      // 绘制弹窗背景和边框
      ctx.fillStyle = style.backgroundColor;
      ctx.fillRect(posX, posY, width, height);
      ctx.strokeStyle = style.border;
      ctx.lineWidth = 1;
      ctx.strokeRect(posX, posY, width, height);
  
      // 绘制弹窗内容
      ctx.fillStyle = '#000'; // 文字颜色
      ctx.font = '16px Arial'; // 文字样式
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(content, posX + width / 2, posY + height / 2);
    });
  }
  
  // 监听窗口大小变化，重新绘制弹窗
  function handleResize() {
    const canvas = canvasRef.value;
    const ctx = ctxRef.value;
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      drawPopups();
    };
  }
  
  onMounted(() => {
    const canvas = canvasRef.value;
    window.addEventListener('resize', handleResize);
    loadImage();
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });
  </script>
  
  <style scoped>
  .canvas-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: auto;
  }
  </style>