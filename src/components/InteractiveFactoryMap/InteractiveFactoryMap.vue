<!--  InteractiveFactoryMap.vue -->
<template>
  <div ref="containerRef" class="video-container">
    <video
      ref="videoRef"
      class="video-js"
      preload="auto"
      muted
    >
      <source :src="videoSrc" type="video/webm" />
    </video>
    <canvas ref="canvasRef"></canvas>
    <div v-if="selectedBuilding" class="info-card" :style="infoCardStyle">
      <h3>{{ selectedBuilding.name }}</h3>
      <p>{{ selectedBuilding.info }}</p>
    </div>
  </div>
  <!-- <div class="controls">
    <button @click="togglePlayPause">{{ isPlaying ? '暂停' : '播放' }}</button>
    <button @click="restart">重新开始</button>
  </div> -->
</template>

<script lang="ts">
import { createApp } from 'vue'
import { defineComponent, onMounted, ref, computed, watch, onUnmounted, nextTick } from 'vue';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';  // 重要：保留这行代码
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import BuildingLabel from './BuildingLabel.vue';
// import BuildingTooltip from './BuildingTooltip.vue';
import { useRouter } from 'vue-router'
interface Building {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  info: string;
  alwaysVisible?: boolean;
}

export default defineComponent({
  name: 'InteractiveFactoryMap',
  components: {
    BuildingLabel
  },
  props: {
    videoSrc: {
      type: String,
      required: true
    }
  },
  setup(props) {
    let labelRenderer: any;
    const router = useRouter()
    const containerRef = ref<HTMLDivElement | null>(null);
    const videoRef = ref<HTMLVideoElement | null>(null);
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const width = ref(0);
    const height = ref(0);
    const isPlaying = ref(true);
    const selectedBuilding = ref<Building | null>(null);

    const buildings: Building[] = [
      { id: 1, x: 310, y: 160, width: 100, height: 100, name: "电镀锌1", info: "这是主要办公区域", alwaysVisible: !true },
      { id: 2, x: 480, y: 210, width: 150, height: 80, name: "冷轧", info: "主要生产区域", alwaysVisible: !true },
      { id: 3, x: 740, y: 300, width: 120, height: 120, name: "热轧", info: "主要生产区域", alwaysVisible: !true }
    ];

    let player: videojs.Player | null = null;
    let scene: THREE.Scene;
    let camera: THREE.OrthographicCamera;
    let renderer: THREE.WebGLRenderer;
    let raycaster: THREE.Raycaster;
    let mouse: THREE.Vector2;
    let resizeObserver: any = null;
    const infoCardStyle = computed(() => ({
      left: `${selectedBuilding.value?.x}px`,
      top: `${selectedBuilding.value?.y}px`,
    }));

    const initThree = () => {
      if (!canvasRef.value) return;
      // 创建一个新的 Three.js 场景。场景是所有 3D 对象和灯光的容器。
      scene = new THREE.Scene();
      console.log('width.value', width.value, height.value)
      // 创建一个正交相机。参数分别是左、右、上、下边界，以及近平面和远平面。这里相机视口与 canvas 尺寸匹配。
      camera = new THREE.OrthographicCamera(0, width.value, 0, height.value, 0.1, 1000);
      // 创建一个正交相机。参数分别是左、右、上、下边界，以及近平面和远平面。这里相机视口与 canvas 尺寸匹配。 
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        alpha: true
      });
      // 设置渲染器的尺寸，匹配 canvas 的大小
      renderer.setSize(width.value, height.value);

      

      // 方法二 初始化 CSS2DRenderer
      labelRenderer = new CSS2DRenderer();
      labelRenderer.setSize(width.value, height.value);
      labelRenderer.domElement.style.position = 'absolute';
      labelRenderer.domElement.style.top = '0px';
      canvasRef.value.parentElement?.appendChild(labelRenderer.domElement);


      // 遍历预定义的 buildings 数组，为每个建筑创建一个 3D 对象。
      buildings.forEach(building => {
        // 为每个建筑创建一个平面几何体。尺寸由建筑的宽度和高度决定。
        const geometry = new THREE.PlaneGeometry(building.width, building.height);
        // 创建材质。颜色设为红色（0xff0000），启用透明度。如果 building.alwaysVisible 为 true，则设置半透明（opacity: 0.5），否则完全透明（opacity: 0）。
        const material = new THREE.MeshBasicMaterial({
          color: 'blue', // 0xff0000 红色
          transparent: true,
          opacity: building.alwaysVisible ? 0.5 : 0
        });
        // 使用几何体和材质创建网格（Mesh）。这是 Three.js 中表示 3D 对象的基本单位。
        const mesh = new THREE.Mesh(geometry, material);
        // 设置网格的位置。x 坐标是建筑左边界加上半个宽度（居中）。y 坐标需要注意：因为 Three.js 的坐标系 y 轴向上，而屏幕坐标系 y 轴向下，所以用 canvas 高度减去建筑的 y 坐标。z 坐标设为 0，因为是 2D 平面。
        mesh.position.set(building.x + building.width/2, height.value - (building.y + building.height/2), 0);
        // 将建筑信息存储在网格的 userData 属性中。这允许我们在后续的交互中获取建筑信息。
        mesh.userData = building;
        // 将创建的网格添加到场景中。
        scene.add(mesh);

        // 创建 Vue 组件实例
        const app = createApp(BuildingLabel, {
          name: building.name,
          info: building.info,
          positionX: building.x + building.width / 2,
          positionY: height.value - (building.y + building.height/2),
          onLabelClick: (name: string) => {
            console.log('标签被点击:', name);
            router.push({ path: 'second', query: { typename: building.name }})
            // 在这里添加你想要的标签点击处理逻辑
          }
        });
        // 创建一个 div 元素作为 Vue 组件的挂载点
        const container = document.createElement('div');
        app.mount(container);
        // 使用这个容器创建 CSS2DObject
        const textLabel = new CSS2DObject(container);
        
        // 这个位置是相对于mesh的相对位置
        textLabel.position.set(0, building.height / 2 + 10, 0);
        mesh.add(textLabel);


        // // 方法一 创建文本标签并添加到场景中
        // const textLabel = createTextLabel(building.name);
        // textLabel.position.set(building.x + building.width / 2, height.value - (building.y + building.height / 2) + 60, 0);
        // scene.add(textLabel);
        // 方法二 创建文本标签
        // const textDiv = document.createElement('div');
        // textDiv.textContent = building.name;
        // textDiv.style.backgroundColor = 'rgba(0,0,0,0.7)';
        // textDiv.style.color = 'white';
        // textDiv.style.padding = '2px 5px';
        // textDiv.style.borderRadius = '3px';
        // textDiv.style.fontSize = '12px';
        // const textLabel = new CSS2DObject(textDiv);
        // textLabel.position.set(0, building.height / 2 + 10, 0);
        // mesh.add(textLabel);
        // 为 textLabel 添加点击事件监听器
        // textDiv.addEventListener('click', (event) => {
        //   event.stopPropagation(); // 阻止事件冒泡
        //   console.log('Clicked on label:', building.name);
        //   // 在这里添加你想要的标签点击处理逻辑
        // });
      });

      // 设置相机的 z 位置。在正交相机中，这个值主要影响渲染顺序，而不影响物体大小。
      camera.position.z = 5;
      // 创建 raycaster 和鼠标向量，用于后续的鼠标交互检测。
      raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      // 添加 canvas 点击事件监听器
      canvasRef.value.style.zIndex = '1';
      canvasRef.value.addEventListener('click', onCanvasClick);
      
      // 启动动画循环，持续渲染场景。
      animate();
    };
    
    // 定义 canvas 点击事件处理函数
    const onCanvasClick = (event: MouseEvent) => {
      if (!canvasRef.value) return;
      console.log('onCanvasClick')
      // 计算鼠标在 canvas 中的位置， 这行获取canvas元素的边界矩形，包含其位置和尺寸信息。
      const rect = canvasRef.value?.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // 更新 raycaster
      raycaster.setFromCamera(mouse, camera);
      // 检查射线与哪些物体相交
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        // 获取第一个相交的物体
        const clickedObject = intersects[0].object;
        console.log('Clicked on mesh:', clickedObject.userData.name, intersects.length);
        // 在这里添加你想要的 mesh 点击处理逻辑
        // const building = intersects[0].object.userData as Building;
        // selectedBuilding.value = building;
        // if (!building.alwaysVisible) {
        //   (intersects[0].object as THREE.Mesh).material.opacity = 0.5;
        // }
        // if (building.name === '冷轧') {
        //   router.push({ path: 'second', query: { typename: building.name }})
        // }
      } else {
        console.log('intersects.length2', intersects.length)
        selectedBuilding.value = null;
        scene.children.forEach((child) => {
          if (child instanceof THREE.Mesh && !child.userData.alwaysVisible) {
            child.material.opacity = 0;
          }
        });
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };

    // const togglePlayPause = () => {
    //   if (player) {
    //     if (player.paused()) {
    //       player.play();
    //       isPlaying.value = true;
    //     } else {
    //       player.pause();
    //       isPlaying.value = false;
    //     }
    //   }
    // };

    // const restart = () => {
    //   if (player) {
    //     player.currentTime(0);
    //     player.play();
    //     isPlaying.value = true;
    //   }
    // };

    const updateSize = async () => {
      if (containerRef.value) {
        width.value = containerRef.value.clientWidth;
        height.value = containerRef.value.clientHeight;
      }
    };


    
    onMounted(async () => {
      console.log('onMounted------')
      await nextTick()
      if (videoRef.value) {
        player = videojs(videoRef.value, {
          controls: false,
          autoplay: true,
          loop: true,
          muted: true
        });
      }

      //TODO 使用 ResizeObserver 实现监听resize,和使用window.addEventListener('resize')两个方式有区别，ResizeObserver初次效果很好，但是切换路由再返回当前路由后，有bug，有时间再调试
      //  resizeObserver = new ResizeObserver((entries) => {
      //   for (let entry of entries) {
      //     updateSize();
      //     console.log('new ResizeObserver')
      //   }
      // });

      // if (containerRef.value) {
      //   console.log('new ResizeObserver2')
      //   resizeObserver.observe(containerRef.value);
      //   updateSize();
      // }

      window.addEventListener('resize', updateSize);
      window.addEventListener('resize', () => {
        if (labelRenderer) {
          labelRenderer.setSize(width.value, height.value);
        }
      });
      setTimeout(() => {
        // 要触发一下resize,重新获取 containerRef容器的宽高，重新设置three的宽高，撑满containerRef容器
        let myEvent = new Event('resize'); window.dispatchEvent(myEvent);
      });
      await initThree();

      if (canvasRef.value) {
        canvasRef.value.addEventListener('click', onCanvasClick);
      }
    });

    onUnmounted(() => {
      if (player) {
        player.dispose();
      }
      console.log('new ResizeObserver disconnect')
      // resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
      if (canvasRef.value) {
        canvasRef.value.removeEventListener('click', onCanvasClick);
      }
    });
    
    watch([width, height], () => {
      if (renderer && camera) {
        renderer.setSize(width.value, height.value);
        camera.right = width.value;
        camera.top = height.value;
        camera.updateProjectionMatrix();

        // 更新场景中所有对象的位置
        scene.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            const building = child.userData as Building;
            child.position.set(
              building.x + building.width / 2,
              height.value - (building.y + building.height / 2),
              0
            );
          }
        });
      }
      animate()
    });

    return {
      containerRef,
      videoRef,
      canvasRef,
      width,
      height,
      isPlaying,
      selectedBuilding,
      infoCardStyle,
      // togglePlayPause,
      // restart
    };
  }
});
</script>

<style scoped>
.video-js {
  width: 100% !important;
  height: 100% !important;
  background-color: #f0f8ff00;
}
.video-container {
  position: relative;
  width: 100%;
  height: 100%;
}

video, canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.info-card {
  position: absolute;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.controls {
  margin-top: 10px;

  z-index: 555;
    color: red;
    position: absolute;
    left: 700px;
}
</style>