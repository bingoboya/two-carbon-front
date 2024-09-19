<!--  InteractiveFactoryMap.vue -->
<template>
  <div ref="containerRef" class="video-container">
    <!-- 这个canvas元素显示的话，点击canvas时，img元素会出现光标 -->
    <canvas v-show="false" ref="canvasRef"></canvas>
    <div v-if="backgroundImageSrc" class="pic_wrap">
      <div class="process_overlay">
        <div class="process_top" @click="aaaaaa">
          <div style="position: absolute; left: 0;">
            <img src="/src/assets/bgpng/1.png" alt="">
          </div>
          <div style="writing-mode: vertical-lr;letter-spacing: 16px;color: gray;">酸轧</div>
          <div style="position: absolute; right: 0;">
            <img src="/src/assets/bgpng/1-1.png" alt="">
          </div>
        </div>
        <div class="process_center">
          <div style="position: absolute; left: 0;">
            <img src="/src/assets/bgpng/2.png" alt="">
          </div>
          <div style=" writing-mode: vertical-lr; letter-spacing: 16px; color: gray;">连退</div>
          <div style="position: absolute; right: 0;">
            <img src="/src/assets/bgpng/2-2.png" alt="">
          </div>
        </div>
        <div class="process_bottom">
          <div style="position: absolute; left: 0;">
            <img src="/src/assets/bgpng/3.png" alt="">
          </div>
          <div style="display: flex;flex-direction: column; align-items: center;color: gray;">
            <div>电</div>
            <div>镀</div>
            <div style="writing-mode: vertical-lr;padding-left: 2px;">(</div>
            <div>精</div>
            <div>整</div>
            <div style="writing-mode: vertical-lr;padding-left: 2px;">)</div>
          </div>
          <div style="position: absolute; right: 0;">
            <img src="/src/assets/bgpng/3-3.png" alt="">
          </div>
        </div>
      </div>
      <div class="pic_wrapper">
        <img :src="backgroundImageSrc" alt="">
      </div>
    </div>
    <div v-if="selectedBuilding" class="info-card" :style="infoCardStyle">
      <h3>{{ selectedBuilding.name }}</h3>
      <p>{{ selectedBuilding.info }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { createApp } from 'vue'
import { onMounted, ref, computed, watch, onUnmounted, nextTick } from 'vue';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import BuildingLabel from '@/components/BuildingLabel.vue';
interface Building {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  name: string;
  info: string;
  alwaysVisible?: boolean;
  videoSrc?: String,
  arrowPicSrc?: String,
  videoSrcPress?: String
  bgPicSrc?: String
}
const emits = defineEmits(['callBackFunction'])

const props = defineProps({
  backgroundImageSrc: {
    type: String,
    default: ''
  },
  videoSrc: {
    type: String,
  },
  buildingArr: {
    type: Array,
    default: []
  }
})
let labelRenderer: any;
let appList: any = []

const buildingRefs = ref<{ [key: string]: any }>({});
const containerRef = ref<HTMLDivElement | null>(null);
const canvasRef = ref<HTMLCanvasElement | null>(null);
const width = ref(0);
const height = ref(0);
const selectedBuilding = ref<Building | null>(null);
const buildings: any[] = props.buildingArr
let scene: THREE.Scene;
let camera: THREE.OrthographicCamera;
let renderer: THREE.WebGLRenderer;
let raycaster: THREE.Raycaster;
let mouse: THREE.Vector2;
const backgroundImage = ref<HTMLImageElement | null>(null);
const infoCardStyle = computed(() => ({
  left: `${selectedBuilding.value?.x}px`,
  top: `${selectedBuilding.value?.y}px`,
}));

const aaaaaa = () => {
  alert(1)
}
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
    mesh.position.set(building.x + building.width / 2, height.value - (building.y + building.height / 2), 0);
    // 将建筑信息存储在网格的 userData 属性中。这允许我们在后续的交互中获取建筑信息。
    mesh.userData = building;
    // 将创建的网格添加到场景中。
    scene.add(mesh);

    // 创建 Vue 组件实例
    const app = createApp(BuildingLabel, {
      // videoSrc: building.videoSrc,
      // videoSrcPress: building.videoSrcPress,
      arrowPicSrc: building.arrowPicSrc,
      bgPicSrc: building.bgPicSrc,
      name: building.name,
      info: building.info,
      positionX: building.x + building.width / 2,
      positionY: height.value - (building.y + building.height / 2),
      onLabelClick: (name: string) => {
        // console.log('标签被点击:', name);
        emits('callBackFunction', name)
        // router.push({ path: 'second', query: { typename: building.name }})
        // 在这里添加你想要的标签点击处理逻辑
      }
    });
    appList.push(app)
    // 创建一个 div 元素作为 Vue 组件的挂载点
    const container = document.createElement('div');
    app.mount(container);


    // 将组件实例存储在buildingRefs中
    buildingRefs.value[building.name] = app._instance?.exposed;


    // 使用这个容器创建 CSS2DObject
    const textLabel = new CSS2DObject(container);

    // 这个位置是相对于mesh的相对位置
    textLabel.position.set(0, building.height / 2 + 10, 0);
    mesh.add(textLabel);
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


// 调用特定建筑的 funabc 函数
const callFunabcForBuilding = (buildingName: string, type: string) => {
  const buildingRef = buildingRefs.value[buildingName];
  if (buildingRef && typeof buildingRef.funabc === 'function') {
    buildingRef.funabc(buildingName, type);
  } else {
    console.error(`未找到建筑${buildingName}的funabc函数`);
  }
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


const updateSize = async () => {
  if (containerRef.value) {
    width.value = containerRef.value.clientWidth;
    height.value = containerRef.value.clientHeight;
  }
};

const initFunc = async ()=> {
  window.addEventListener('resize', updateSize);
  window.addEventListener('resize', () => {
    if (labelRenderer) {
      labelRenderer.setSize(width.value, height.value);
    }
  });
  await initThree();
  if (canvasRef.value) {
    canvasRef.value.addEventListener('click', onCanvasClick);
  }
  setTimeout(() => {
    // 确保所有组件都已挂载
    //TODO callFunabcForBuilding('电镀锌', 'enter');
    // 要触发一下resize,重新获取 containerRef容器的宽高，重新设置three的宽高，撑满containerRef容器
    let myEvent = new Event('resize'); window.dispatchEvent(myEvent);
  }, 0);
}

onMounted(async () => {
  await nextTick()
  // await initFunc()
});

onUnmounted(() => {


  // TODO 需要销毁创建的 BuildingLabel
  appList.forEach((app: any) => {
    app.unmount()
  })
  window.removeEventListener('resize', updateSize);
  if (canvasRef.value) {
    canvasRef.value.removeEventListener('click', onCanvasClick);
  }

  if (backgroundImage.value) {
    backgroundImage.value.onload = null;
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
defineExpose({
  callFunabcForBuilding
})
</script>
<style lang="scss" scoped>
.process_top {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-left: 14px;
  flex: 60;
  border: 1px solid rgba(0, 229, 255, 1);
  background:
    linear-gradient(to bottom,
      rgba(0, 229, 255, 0.2) 0%,
      transparent 20px,
      transparent calc(100% - 20px),
      rgba(0, 229, 255, 0.2) 100%),
    radial-gradient(circle at center,
      transparent 0%,
      transparent 80%,
      rgba(0, 229, 255, 0.2) 100%);
  overflow: hidden;
}

.process_top:hover {
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.5),
    0 0 20px rgba(0, 229, 255, 0.3),
    0 0 30px rgba(0, 229, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
        rgba(0, 229, 255, 0.2) 0%,
        transparent 70%);
    pointer-events: none;
  }
}

.process_center {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-left: 14px;
  flex: 60;
  border: 1px solid rgba(31, 173, 255, 1);
  background:
    linear-gradient(to bottom,
      rgba(31, 173, 255, 0.2) 0%,
      transparent 20px,
      transparent calc(100% - 20px),
      rgba(31, 173, 255, 0.2) 100%),
    radial-gradient(circle at center,
      transparent 0%,
      transparent 80%,
      rgba(31, 173, 255, 0.2) 100%);
  overflow: hidden;
}

.process_center:hover {
  box-shadow: 0 0 10px rgba(31, 173, 255, 0.5),
    0 0 20px rgba(31, 173, 255, 0.3),
    0 0 30px rgba(31, 173, 255, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
        rgba(31, 173, 255, 0.2) 0%,
        transparent 70%);
    pointer-events: none;
  }
}

.process_bottom {
  cursor: pointer;
  flex: 100;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-left: 14px;
  border: 1px solid rgba(156, 143, 252, 1);
  background:
    linear-gradient(to bottom,
      rgba(156, 143, 252, 0.2) 0%,
      transparent 20px,
      transparent calc(100% - 20px),
      rgba(156, 143, 252, 0.2) 100%),
    radial-gradient(circle at center,
      transparent 0%,
      transparent 80%,
      rgba(156, 143, 252, 0.2) 100%);
  position: relative;
  overflow: hidden;
}

.process_bottom:hover {
  box-shadow: 0 0 4px rgba(156, 143, 252, 0.5),
    0 0 10px rgba(156, 143, 252, 0.3),
    0 0 20px rgba(156, 143, 252, 0.1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
        rgba(156, 143, 252, 0.2) 0%,
        transparent 70%);
    pointer-events: none;
  }
}

.process_overlay {
  font-size: 22px;
  z-index: 111;
  display: flex;
  gap: 12px;
  flex-direction: column;
  // background: rgba(128, 128, 128, 0.329);
  width: 100%;
  height: 100%;
  position: absolute;
}

.pic_wrap {
  z-index: 111;

  position: absolute;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: calc(100% - 200px);
  transform: translateY(28%);

  .pic_wrapper {
    width: 100%;
    height: 100%;
    padding: 10px 10px 10px 60px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.video-container {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

video,
canvas {
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
