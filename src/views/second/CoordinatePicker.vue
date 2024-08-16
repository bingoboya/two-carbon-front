<template>
    <div class="coordinate-picker">
      <div class="image-container" ref="imageContainer" @click="handleClick">
        <img :src="imageSrc" @load="onImageLoad" ref="image" />
        <div
          v-for="(marker, index) in markers"
          :key="index"
          class="marker"
          :style="{ left: `${marker.x}px`, top: `${marker.y}px` }"
        ></div>
      </div>
      <div class="coordinates-list">
        <h3>标记坐标：</h3>
        <ul>
          <li v-for="(marker, index) in markers" :key="index">
            标记 {{ index + 1 }}: x: {{ marker.x }}, y: {{ marker.y }}
          </li>
        </ul>
        <button @click="copyToClipboard">复制坐标到剪贴板</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'CoordinatePicker',
    props: {
      imageSrc: {
        type: String,
        required: true
      }
    },
    setup() {
      const imageContainer = ref(null);
      const image = ref(null);
      const markers = ref([]);
      const imageLoaded = ref(false);
  
      const handleClick = (event) => {
        if (!imageLoaded.value) return;
  
        const rect = imageContainer.value.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
  
        markers.value.push({ x: Math.round(x), y: Math.round(y) });
      };
  
      const onImageLoad = () => {
        imageLoaded.value = true;
      };
  
      const copyToClipboard = () => {
        const coordsText = markers.value
          .map((marker, index) => `{ id: 'building${index + 1}', x: ${marker.x}, y: ${marker.y}, tooltipContent: '建筑物 ${index + 1}' }`)
          .join(',\n');
        
        navigator.clipboard.writeText(`[\n${coordsText}\n]`)
          .then(() => alert('坐标已复制到剪贴板'))
          .catch(err => console.error('复制失败:', err));
      };
  
      return {
        imageContainer,
        image,
        markers,
        handleClick,
        onImageLoad,
        copyToClipboard
      };
    }
  };
  </script>
  
  <style scoped>
  .coordinate-picker {
    display: flex;
    gap: 20px;
  }
  
  .image-container {
    position: relative;
    cursor: crosshair;
  }
  
  .image-container img {
    max-width: 100%;
    height: auto;
  }
  
  .marker {
    position: absolute;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    transform: translate(-50%, -50%);
  }
  
  .coordinates-list {
    min-width: 200px;
  }
  </style>