import { ref, onMounted, onUnmounted, watch, Ref } from 'vue';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
// import { Building } from './types';
import { createApp } from 'vue';
import BuildingLabel from './BuildingLabel.vue';

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

export function useThreeJS(containerRef: Ref<HTMLDivElement | null>, buildings: Building[], width: Ref<number>, height: Ref<number>) {
  const scene = new THREE.Scene();
  const camera = ref<THREE.OrthographicCamera | null>(null);
  const renderer = ref<THREE.WebGLRenderer | null>(null);
  const labelRenderer = ref<CSS2DRenderer | null>(null);
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const initThree = () => {
    if (!containerRef.value) return;

    camera.value = new THREE.OrthographicCamera(0, width.value, 0, height.value, 0.1, 1000);
    renderer.value = new THREE.WebGLRenderer({
      canvas: containerRef.value.querySelector('canvas'),
      alpha: true
    });
    renderer.value.setSize(width.value, height.value);

    labelRenderer.value = new CSS2DRenderer();
    labelRenderer.value.setSize(width.value, height.value);
    labelRenderer.value.domElement.style.position = 'absolute';
    labelRenderer.value.domElement.style.top = '0px';
    containerRef.value.appendChild(labelRenderer.value.domElement);

    buildings.forEach(createBuilding);

    camera.value.position.z = 5;
  };

  const createBuilding = (building: Building) => {
    const geometry = new THREE.PlaneGeometry(building.width, building.height);
    const material = new THREE.MeshBasicMaterial({
      color: 'blue',
      transparent: true,
      opacity: building.alwaysVisible ? 0.5 : 0
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(building.x + building.width/2, height.value - (building.y + building.height/2), 0);
    mesh.userData = building;
    scene.add(mesh);

    const app = createApp(BuildingLabel, {
      name: building.name,
      onLabelClick: (name: string) => {
        console.log('Label clicked:', name);
      }
    });
    const container = document.createElement('div');
    app.mount(container);
    const textLabel = new CSS2DObject(container);
    textLabel.position.set(0, building.height / 2 + 10, 0);
    mesh.add(textLabel);
  };

  const animate = () => {
    requestAnimationFrame(animate);
    if (renderer.value && camera.value) {
      renderer.value.render(scene, camera.value);
    }
    if (labelRenderer.value && camera.value) {
      labelRenderer.value.render(scene, camera.value);
    }
  };

  const handleResize = () => {
    if (camera.value && renderer.value && labelRenderer.value) {
      camera.value.right = width.value;
      camera.value.top = height.value;
      camera.value.updateProjectionMatrix();
      renderer.value.setSize(width.value, height.value);
      labelRenderer.value.setSize(width.value, height.value);
    }
  };

  const handleClick = (event: MouseEvent) => {
    if (!containerRef.value || !camera.value) return;

    const rect = containerRef.value.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera.value);
    const intersects = raycaster.intersectObjects(scene.children);

    return intersects.length > 0 ? intersects[0].object.userData as Building : null;
  };

  onMounted(() => {
    initThree();
    animate();
    window.addEventListener('resize', handleResize);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    // Clean up Three.js resources
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        (object.material as THREE.Material).dispose();
      }
    });
    renderer.value?.dispose();
    labelRenderer.value?.dispose();
  });

  watch([width, height], handleResize);

  return {
    scene,
    camera,
    renderer,
    labelRenderer,
    handleClick
  };
}