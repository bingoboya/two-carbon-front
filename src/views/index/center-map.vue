<template>
  <div class="centermap" style="position: relative;">
    <div class="interactivefactorymap_wrap">
    <!-- <div style="width: 100%; height: 100%; background-color: #836d6d73;"> -->
      <!-- ./mapdemo.webm 是public文件夹中的文件路径 -->
      <InteractiveFactoryMap :videoSrc="'./mapdemo.webm'"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, nextTick, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from 'vue-router'
import InteractiveFactoryMap from '@/components/InteractiveFactoryMap';
const router = useRouter()
/**
 * 
*/
// 引用图片资源
const imageUrl = '/src/assets/img/centerimg.png'; // 替换为实际图片路径
// 引用 canvas 元素和绘图上下文
const canvasRef = ref(null);
const ctxRef = ref(null);
const popupContainerRef = ref(null); // 添加对 popup-container 的引用
// 存储弹窗数据，包括位置和内容
const popups = ref([
  {
    id: 'popup1',
    x: 1.5, // 相对于图片宽度的x坐标
    y: 0.6, // 相对于图片高度的y坐标
    content: '冷轧',
    style: {
      width: '220px', // 弹窗宽度
      height: '136px', // 弹窗高度
      backgroundImage: `url(${'/src/assets/img/blue_bg.png'})`,
      cursor: 'pointer'
    },
    contenStyle: {
      'borderBottom': '4px solid #28d4ff',
      'paddingBottom': '2px',
      'display': 'inline-block',
      // 'backgroundImage': `url(${'/src/assets/img/green_pop_bar.png'})`,
      pop_bar_bg: `url(${'/src/assets/img/blue_pop_bar.png'})`
    },
    onClick: () => alert('弹窗1被点击')
  },
  // 可以添加更多弹窗
  {
    id: 'popup2',
    x: 0.5, // 相对于图片宽度的x坐标
    y: 1.6, // 相对于图片高度的y坐标
    content: '电镀锌',
    style: {
      width: '220px', // 弹窗宽度
      height: '136px', // 弹窗高度
      backgroundImage: `url(${'/src/assets/img/green_bg.png'})`,
      cursor: 'pointer'
    },
    contenStyle: {
      'borderBottom': '4px solid #28d4ff', 'paddingBottom': '2px', display: 'inline-block',
      pop_bar_bg: `url(${'/src/assets/img/green_pop_bar.png'})`
    },
    onClick: () => alert('弹窗22被点击')
  },
  {
    id: 'popup3',
    x: 1.5, // 相对于图片宽度的x坐标
    y: 1.6, // 相对于图片高度的y坐标
    content: '热轧',
    style: {
      width: '220px', // 弹窗宽度
      height: '136px', // 弹窗高度
      backgroundImage: `url(${'/src/assets/img/yellow_bg.png'})`,
      cursor: 'pointer'
    },
    contenStyle: {
      'borderBottom': '4px solid #ffc57a', 'paddingBottom': '2px', display: 'inline-block',
      pop_bar_bg: `url(${'/src/assets/img/yellow_pop_bar.png'})`
    },
    onClick: () => alert('弹窗3被点击')
  },
]);


// 加载并显示图片
function loadImage() {
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
    // 设置 popup-container 大小
    const container: any = popupContainerRef.value;
    // container.style.width = `${image.width}px`;
    // container.style.width = `135%`;
    // container.style.height = `123%`;
    container.style.width = `100%`;
    container.style.height = `${image.height}px`;
    // 初始显示弹窗 图片加载完成后，计算并设置弹窗位置
    popups.value.forEach(popup => {
      setPopupPosition(popup);
    });
  };
  image.src = imageUrl;
}


function setPopupPosition(popup: any) {
  // 根据 canvas 的尺寸和 popup 的相对位置计算实际位置
  // 并设置到对应的弹窗 div 上
  const popupElement: any = document.querySelector(`.popup[data-index="${popup.index}"]`);
  if (popupElement) {
    const style: any = getPopupStyle(popup);
    popupElement.style.left = style.left;
    popupElement.style.top = style.top;
  }
}

function handlePopupClick(popup: any) {
  // 处理弹窗点击事件
  router.push({ path: 'second', query: { typename: popup.content } })
}


// 使用canvas绘制所有弹窗
function drawPopupsWithCanvas() {
  const ctx: any = ctxRef.value;
  popups.value.forEach(popup => {
    const { x, y, content, width, height, style } = popup;
    const image: any = canvasRef.value;
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
  const canvas: any = canvasRef.value;
  if (canvas) {
    console.log(111, canvas)
    // 接下来可以使用 ctx 进行绘图操作
    loadImage();
  }
}


function getPopupStyle(popup: any, index?: any) {
  // 这里我们使用 index 而不是 id 来选择元素，因为直接使用 id 作为 data 属性可能不安全
  const canvas: any = canvasRef.value;
  if (canvas) {
    const baseX = canvas.width * popup.x;
    const baseY = canvas.height * popup.y;
    // const left = `150px` // 假设弹窗宽度为100px，这里减去一半
    // const top = `100px` // 假设弹窗高度为50px，这里减去一半
    const left = `${baseX - 50}px` // 假设弹窗宽度为100px，这里减去一半
    const top = `${baseY - 25}px` // 假设弹窗高度为50px，这里减去一半
    console.log(3333, left, top)
    return {
      'left': left, // 假设弹窗宽度为100px，这里减去一半
      'top': top, // 假设弹窗高度为50px，这里减去一半
      ...popup.style,
    };
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
.interactivefactorymap_wrap {
  width: 120%; height: 120%; position: absolute; left: 50%;transform: translateX(-50%); 
  // background-color: #836d6d73;
}
</style>
