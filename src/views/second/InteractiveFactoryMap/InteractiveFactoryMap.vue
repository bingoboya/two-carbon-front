<template>
  <div class="video_container">
    <!-- 这个canvas元素显示的话，点击canvas时，img元素会出现光标 -->
    <div v-if="backgroundImageSrc" class="pic_wrap">
      <div class="center_title">{{ "电镀锌工艺" }}</div>
      <div class="process_overlay">
        <div class="process_top" :class="curBuildingName === '酸轧' ? 'process_top_hover' : ''" @click="clickItem('酸轧')">
          <div class="process_info_wrapper">
            <div class="process_info card_info_label1">
              <div style="font-weight: 300">碳排放量：</div>
              <div style="font-size: 14px">{{ getData('酸轧', 'carbonEmissions') }}</div>
              <div style="font-weight: 300">&nbsp; 万吨</div>
            </div>
            <div class="process_info card_info_label1">
              <div style="font-weight: 300">用电量：</div>
              <div style="font-size: 14px">{{ getData('酸轧', 'energyConsumption') }}</div>
              <div style="font-weight: 300">&nbsp; 万千瓦时</div>
            </div>
          </div>
          <div style="position: absolute; left: 0">
            <img src="/src/assets/bgpng/1.png" alt="" />
          </div>
          <div style="writing-mode: vertical-lr; letter-spacing: 16px; color: #fff">
            酸轧
          </div>
          <div style="position: absolute; right: 0">
            <img src="/src/assets/bgpng/1-1.png" alt="" />
          </div>
        </div>
        <div class="process_center" :class="curBuildingName === '连退' ? 'process_center_hover' : ''"
          @click="clickItem('连退')">
          <div class="process_info_wrapper">
            <div class="process_info card_info_label2">
              <div style="font-weight: 300">碳排放量：</div>
              <div style="font-size: 14px">{{ getData('连退', 'carbonEmissions') }}</div>
              <div style="font-weight: 300">&nbsp; 万吨</div>
            </div>
            <div class="process_info card_info_label2">
              <div style="font-weight: 300">用电量：</div>
              <div style="font-size: 14px">{{ getData('连退', 'energyConsumption') }}</div>
              <div style="font-weight: 300">&nbsp; 万千瓦时</div>
            </div>
          </div>
          <div style="position: absolute; left: 0">
            <img src="/src/assets/bgpng/2.png" alt="" />
          </div>
          <div style="writing-mode: vertical-lr; letter-spacing: 16px; color: #fff">
            连退
          </div>
          <div style="position: absolute; right: 0">
            <img src="/src/assets/bgpng/2-2.png" alt="" />
          </div>
        </div>
        <div class="process_bottom" :class="curBuildingName === '电镀锌(精整)' ? 'process_bottom_hover' : ''
          " @click="clickItem('电镀锌(精整)')">
          <div class="process_info_wrapper">
            <div class="process_info card_info_label3">
              <div style="font-weight: 300">碳排放量：</div>
              <div style="font-size: 14px">{{ getData('电镀锌(精整)', 'carbonEmissions') }}</div>
              <div style="font-weight: 300">&nbsp; 万吨</div>
            </div>
            <div class="process_info card_info_label3">
              <div style="font-weight: 300">用电量：</div>
              <div style="font-size: 14px">{{ getData('电镀锌(精整)', 'energyConsumption') }}</div>
              <div style="font-weight: 300">&nbsp; 万千瓦时</div>
            </div>
          </div>
          <div style="position: absolute; left: 0">
            <img src="/src/assets/bgpng/青色左边.png" alt="" />
          </div>
          <div style="
              display: flex;
              flex-direction: column;
              align-items: center;
              color: #fff;
            ">
            <div>电</div>
            <div>镀</div>
            <div style="writing-mode: vertical-lr; padding-left: 2px">(</div>
            <div>精</div>
            <div>整</div>
            <div style="writing-mode: vertical-lr; padding-left: 2px">)</div>
          </div>
          <div style="position: absolute; right: 0">
            <img src="/src/assets/bgpng/青色右边.png" alt="" />
          </div>
        </div>
      </div>
      <div class="pic_wrapper">
        <div style="position: relative;width: 120%; height: 100%;left: 50%; transform: translateX(-50%);">
          <video v-if="showVideo" autoplay loop muted width="100%" style="position: absolute; width: 100% !important;">
            <source src="/src/assets/webm/processall.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const emits = defineEmits(["callBackFunction"]);
const props = defineProps({
  dataList: {
    type: Array,
    default: [],
  },
  backgroundImageSrc: {
    type: String,
    default: "",
  },
  videoSrc: {
    type: String,
  },
  buildingArr: {
    type: Array,
    default: [],
  },
});
const showVideo = ref(true)
const getData = (param: any = "酸轧", tagName: any = 'carbonEmissions') => {
  const res: any = toRaw(props.dataList).find((item: any) => item.name === param);
  if (res) {
    return res[tagName];
  }
}
const curBuildingName = ref("");
const buildingRefs = ref<{ [key: string]: any }>({});
const backgroundImage = ref<HTMLImageElement | null>(null);
const clickItem = (name: any) => {
  if (name === "电镀锌(精整)") {
    emits("callBackFunction", name);
  }
};

// 调用特定建筑的 funabc 函数
const callFunabcForBuilding = (buildingName: string, type: string) => {
  // console.log("call--FunabcForBuilding", buildingName, type);
  if (type === "enter") {
    curBuildingName.value = buildingName;
  } else if (type === "leave") {
    curBuildingName.value = "";
  }
  const buildingRef = buildingRefs.value[buildingName];
  if (buildingRef && typeof buildingRef.funabc === "function") {
    buildingRef.funabc(buildingName, type);
  } else {
    console.error(`未找到建筑${buildingName}的funabc函数`);
  }
};

const returnPlaying = async () => {
  if (document.hidden) {
    showVideo.value = false
  } else {
    showVideo.value = true
  }
}
onMounted(async () => {
  await nextTick();
  document.addEventListener('visibilitychange', async () => {
    if (document.hidden) {
      showVideo.value = false
    } else {
      showVideo.value = true
    }
  });
});

onUnmounted(() => {
  if (backgroundImage.value) {
    backgroundImage.value.onload = null;
  }
  document.removeEventListener('visibilitychange', returnPlaying);
});

defineExpose({
  callFunabcForBuilding,
});
</script>
<style lang="scss" scoped>
.card_info_label1 {
  background: linear-gradient(to right, rgba(116, 189, 195, 0.9), transparent);
}

.card_info_label2 {
  background: linear-gradient(to right, rgba(75, 176, 217, 0.9), transparent);
}

.card_info_label3 {
  background: linear-gradient(to right, rgba(122, 172, 150, 0.9), transparent);
}

.center_title {
  position: absolute;
  top: 0;
  font-size: 20px;
  line-height: 46px;
  color: #fff;
}

.process_info_wrapper {
  color: #fff;
  display: flex;
  flex-direction: row;
  gap: 10px;
  position: absolute;
  top: 6px;
  right: 10px;
  font-size: 12px;

  .process_info {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    background-repeat: round;
    padding: 0px 8px;
  }
}

.process_top {
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border-radius: 20px;
  padding-left: 14px;
  // background: rgba(255, 192, 203, 0.445);
  // border: 1px solid RGBA(0, 229, 255, 1);
  flex: 140;
  border: 1px solid rgba(0, 229, 255, 1);
  // box-shadow: 0 0 10px rgba(0, 229, 255, 0.3),
  //             // 0 0 20px rgba(0, 229, 255, 0.3),
  //             0 0 30px rgba(0, 229, 255, 0.1);
  background: linear-gradient(to bottom,
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
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3),
    0 0 30px rgba(0, 229, 255, 0.1);

  &::before {
    content: "";
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

.process_top_hover {
  box-shadow: 0 0 10px rgba(0, 229, 255, 0.5), 0 0 20px rgba(0, 229, 255, 0.3),
    0 0 30px rgba(0, 229, 255, 0.1);

  &::before {
    content: "";
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
  //   background: rgba(204, 44, 84, 0.445);
  //   border: 1px solid RGBA(31, 173, 255, 1);
  flex: 150;
  border: 1px solid rgba(31, 173, 255, 1);
  // box-shadow: 0 0 10px rgba(31, 173, 255, 0.5),
  //             0 0 20px rgba(31, 173, 255, 0.3),
  //             0 0 30px rgba(31, 173, 255, 0.1);
  background: linear-gradient(to bottom,
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
  box-shadow: 0 0 10px rgba(31, 173, 255, 0.5), 0 0 20px rgba(31, 173, 255, 0.3),
    0 0 30px rgba(31, 173, 255, 0.1);

  &::before {
    content: "";
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

.process_center_hover {
  box-shadow: 0 0 10px rgba(31, 173, 255, 0.5), 0 0 20px rgba(31, 173, 255, 0.3),
    0 0 30px rgba(31, 173, 255, 0.1);

  &::before {
    content: "";
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
  border: 1px solid rgba(125, 235, 190, 1);
  // box-shadow: 0 0 4px rgba(125, 235, 190, 0.3),
  //             // 0 0 10px rgba(125, 235, 190, 0.3),
  //             0 0 20px rgba(125, 235, 190, 0.1);
  background: linear-gradient(to bottom,
      rgba(125, 235, 190, 0.2) 0%,
      transparent 20px,
      transparent calc(100% - 20px),
      rgba(125, 235, 190, 0.2) 100%),
    radial-gradient(circle at center,
      transparent 0%,
      transparent 80%,
      rgba(125, 235, 190, 0.2) 100%);
  position: relative;
  overflow: hidden;
}

.process_bottom:hover {
  box-shadow: 0 0 4px rgba(125, 235, 190, 0.5),
    0 0 10px rgba(125, 235, 190, 0.3), 0 0 20px rgba(125, 235, 190, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
        rgba(125, 235, 190, 0.2) 0%,
        transparent 70%);
    pointer-events: none;
  }
}

.process_bottom_hover {
  box-shadow: 0 0 4px rgba(125, 235, 190, 0.5),
    0 0 10px rgba(125, 235, 190, 0.3), 0 0 20px rgba(125, 235, 190, 0.1);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center,
        rgba(125, 235, 190, 0.2) 0%,
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
  padding: 50px 20px 20px 20px;
}

.pic_wrap {
  z-index: 111;
  background-image: url("/src/assets/bgpng/电镀锌工艺背景.png");
  background-repeat: round;
  position: absolute;
  width: 100%;
  // height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: calc(100% - 284px);
  transform: translateY(24%);

  .pic_wrapper {
    width: 100%;
    height: 100%;
    padding: 68px 30px 30px 70px;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.video_container {
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
