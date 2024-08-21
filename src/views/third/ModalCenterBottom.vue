<!-- ModalCenterBottom -->
<template>
    <div style="position: relative;">
        <div class="canvas-container">
            <!-- canvas 元素用于绘制图片和弹窗 -->
            <canvas ref="canvasRef"></canvas>
        </div>
    </div>

</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

// 引用图片资源
const imageUrl = '/src/assets/img/big-data/center-details-data4.png'; // 替换为实际图片路径
const canvasRef = ref(null);
const ctxRef = ref(null);


// 加载并显示图片
const loadImage = async () => {
    const image = new Image();
    console.log('image', image)
    image.onload = () => {
        const canvas: any = canvasRef.value;
        const ctx = canvas.getContext('2d');
        ctxRef.value = ctx;
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        // drawPopupsWithCanvas();
    };
    image.src = imageUrl;
}

// 监听窗口大小变化，重新绘制弹窗
function handleResize() {
    const canvas: any = canvasRef.value;
    if (canvas) {
        console.log(111, canvas)
        // 接下来可以使用 ctx 进行绘图操作
        loadImage();
    }
}

onMounted(async () => {
    await nextTick()
    window.addEventListener('resize', handleResize);
    handleResize()
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
});



</script>

<style scoped lang="scss">
.canvas-container {
    position: absolute;
    width: 140%;
    height: 120%;
    left: 50%;
    transform: translateX(-50%);
    background: url('@/assets/img/centerimg.png');
    background-repeat: round;
    //   position: relative;
    //   width: 100%;
    //   height: 100%;
    // overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

canvas {
    position: absolute;
    display: block;
    width: 40%;
    height: 40%; // auto
    top: 50%;
    transform: translateY(-50%);
}
</style>