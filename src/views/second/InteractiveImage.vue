<template>
    <div class="interactive-image-container" ref="containerRef">
      <img :src="imageSrc" alt="Interactive image" @load="onImageLoad" ref="imageRef" />
      <div
        v-for="(marker, index) in markers"
        :key="index"
        class="marker"
        :style="getMarkerStyle(marker)"
        @click="onMarkerClick(marker)"
        @mouseenter="activeMarker = marker"
        @mouseleave="activeMarker = null"
      >
        <div v-if="activeMarker === marker" class="tooltip" :style="getTooltipStyle(marker)">
          <div :class="`tooltip-content tooltip-${marker.id}`">
            {{ marker.tooltipContent }}
            <button @click.stop="onTooltipButtonClick(marker)">详情</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, reactive, onMounted, onUnmounted } from 'vue';
//   import imageSrc from '@/assets/img/centerimg.png'
  export default {
    name: 'InteractiveImage',
    props: {
      imageSrc: {
        type: String,
        required: true
      },
      markers: {
        type: Array,
        required: true
      }
    },
    setup(props, { emit }) {
      const containerRef = ref(null);
      const imageRef = ref(null);
      const activeMarker = ref(null);
      const imageLoaded = ref(false);
  
      const onImageLoad = () => {
        imageLoaded.value = true;
        updateMarkerPositions();
      };
  
      const updateMarkerPositions = () => {
        if (!imageLoaded.value || !containerRef.value || !imageRef.value) return;
  
        const containerRect = containerRef.value.getBoundingClientRect();
        const imageRect = imageRef.value.getBoundingClientRect();
        const scaleX = imageRect.width / imageRef.value.naturalWidth;
        const scaleY = imageRect.height / imageRef.value.naturalHeight;
  
        props.markers.forEach(marker => {
          marker.scaledX = marker.x * scaleX;
          marker.scaledY = marker.y * scaleY;
        });
      };
  
      const getMarkerStyle = (marker) => {
        return {
          left: `${marker.scaledX}px`,
          top: `${marker.scaledY}px`
        };
      };
  
      const getTooltipStyle = (marker) => {
        const containerRect = containerRef.value.getBoundingClientRect();
        const left = marker.scaledX > containerRect.width / 2 ? 'auto' : '100%';
        const right = marker.scaledX > containerRect.width / 2 ? '100%' : 'auto';
        return { left, right };
      };
  
      const onMarkerClick = (marker) => {
        emit('markerClick', marker);
      };
  
      const onTooltipButtonClick = (marker) => {
        emit('tooltipButtonClick', marker);
      };
  
      onMounted(() => {
        window.addEventListener('resize', updateMarkerPositions);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', updateMarkerPositions);
      });
  
      return {
        // imageSrc,
        containerRef,
        imageRef,
        activeMarker,
        onImageLoad,
        getMarkerStyle,
        getTooltipStyle,
        onMarkerClick,
        onTooltipButtonClick
      };
    }
  };
  </script>
  
  <style scoped>
  .interactive-image-container {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .interactive-image-container img {
    width: 100%;
    height: auto;
    display: block;
    background-position: center;
  }
  
  .marker {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgba(255, 0, 0, 0.5);
    border-radius: 50%;
    cursor: pointer;
    transform: translate(-50%, -50%);
  }
  
  .tooltip {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    z-index: 10;
    min-width: 150px;
  }
  
  .tooltip-content {
    font-size: 14px;
  }
  
  /* 自定义每个标记的样式 */
  .tooltip-building1 {
    background-color: #f0f8ff;
  }
  
  .tooltip-building2 {
    background-color: #fff0f5;
  }
  
  .tooltip-building3 {
    background-color: #f0fff0;
  }
  </style>