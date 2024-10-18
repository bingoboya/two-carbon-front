<template>
  <div  class="video-container">
    <div class="pic_wrap">
      <div class="center_title">
        {{ "电镀锌(精整)" }}
      </div>
      <div class="process_overlay">
        <div style="flex: 100; display: flex; flex-direction: row; gap: 10px">
          <div class="process_top" :class="curBuildingName === '本浦冷轧2#重卷机组' ? 'process_top_hover' : ''"
            @click="clickItem('本浦冷轧2#重卷机组', '机组1无阴影')">
            <div style="position: absolute; left: 0">
              <img src="/src/assets/bgpng/1.png" alt="" />
            </div>
            <div class="process_bgimg">
              <img src="/src/assets/bgpng/机组1无阴影.png" alt="" />
            </div>
            <div class="card_title">本浦冷轧2#重卷机组</div>
            <div class="process_info_wrapper">
              <div class="process_info card_info_label1">
                <div style="font-weight: 300">碳排放量：</div>
                <div style="font-size: 14px">{{ getData('本浦冷轧2#重卷机组', 'carbonEmissions') }}</div>
                <div style="font-weight: 300">&nbsp; 万吨</div>
              </div>
              <div class="process_info card_info_label1">
                <div style="font-weight: 300">用电量：</div>
                <div style="font-size: 14px">{{ getData('本浦冷轧2#重卷机组', 'energyConsumption') }}</div>
                <div style="font-weight: 300">&nbsp; 万千瓦时</div>
              </div>
            </div>
            <div style="position: absolute; right: 0">
              <img src="/src/assets/bgpng/1-1.png" alt="" />
            </div>
          </div>
          <div class="process_center" :class="curBuildingName === '本浦冷轧3#重卷机组'
            ? 'process_top_hover'
            : ''
            " @click="clickItem('本浦冷轧3#重卷机组', '机组2无阴影')">
            <div style="position: absolute; left: 0">
              <img src="/src/assets/bgpng/2.png" alt="" />
            </div>
            <div class="process_bgimg">
              <img src="/src/assets/bgpng/机组2无阴影.png" alt="" />
            </div>
            <div class="card_title">本浦冷轧3#重卷机组</div>
            <div class="process_info_wrapper">
              <div class="process_info card_info_label2">
                <div style="font-weight: 300">碳排放量：</div>
                <div style="font-size: 14px">{{ getData('本浦冷轧3#重卷机组', 'carbonEmissions') }}</div>
                <div style="font-weight: 300">&nbsp; 万吨</div>
              </div>
              <div class="process_info card_info_label2">
                <div style="font-weight: 300">用电量：</div>
                <div style="font-size: 14px">{{ getData('本浦冷轧3#重卷机组', 'energyConsumption') }}</div>
                <div style="font-weight: 300">&nbsp; 万千瓦时</div>
              </div>
            </div>
            <div style="position: absolute; right: 0">
              <img src="/src/assets/bgpng/2-2.png" alt="" />
            </div>
          </div>
        </div>
        <div class="process_bottom" :class="curBuildingName === '电镀锌机组' ? 'process_top_hover' : ''"
          @click="clickItem('电镀锌机组', '电镀锌无阴影')">
          <div style="position: absolute; left: 0">
            <img src="/src/assets/bgpng/3.png" alt="" />
          </div>
          <div class="process_bgimg">
            <img src="/src/assets/bgpng/电镀锌无阴影.png" alt="" />
          </div>
          <div class="card_title">电镀锌机组</div>
          <div class="process_info_wrapper">
            <div class="process_info card_info_label3">
              <div style="font-weight: 300">碳排放量：</div>
              <div style="font-size: 14px">{{ getData('电镀锌机组', 'carbonEmissions') }}</div>
              <div style="font-weight: 300">&nbsp; 万吨</div>
            </div>
            <div class="process_info card_info_label3">
              <div style="font-weight: 300">用电量：</div>
              <div style="font-size: 14px">{{ getData('电镀锌机组', 'energyConsumption') }}</div>
              <div style="font-weight: 300">&nbsp; 万千瓦时</div>
            </div>
          </div>
          <div style="position: absolute; right: 0">
            <img src="/src/assets/bgpng/3-3.png" alt="" />
          </div>
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
const curBuildingName = ref("");

const getData = (param: any = "本浦冷轧2#重卷机组", tagName: any = 'carbonEmissions') => {
  const res: any = toRaw(props.dataList).find((item: any) => item.name === param);
  if (res) {
    return res[tagName];
  }
}
const buildingRefs = ref<{ [key: string]: any }>({});
const backgroundImage = ref<HTMLImageElement | null>(null);


const clickItem = (name: any, departmentImgName: any) => {
  console.log("click", name, departmentImgName);

  emits("callBackFunction", name, departmentImgName);
};

// 调用特定建筑的 funabc 函数
const callFunabcForBuilding = (buildingName: string, type: string) => {
  console.log("call--FunabcForBuilding", buildingName, type);
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




onUnmounted(() => {

  if (backgroundImage.value) {
    backgroundImage.value.onload = null;
  }
});


defineExpose({
  callFunabcForBuilding,
});
</script>
<style lang="scss" scoped>
.card_title {
  position: absolute;
  top: 6px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.process_bgimg {
  position: absolute;
  width: 94%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 98%;
    height: 74%;
  }
}

.card_info_label1 {
  background: linear-gradient(to right, rgba(113, 190, 297, 0.9), transparent);
}

.card_info_label2 {
  background: linear-gradient(to right, rgba(73, 177, 218, 0.9), transparent);
}

.card_info_label3 {
  background: linear-gradient(to right, rgba(119, 125, 230, 0.9), transparent);
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
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 10px;
  position: absolute;
  bottom: 6px;
  // right: 10px;
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
  flex: 60;
  border: 1px solid rgba(0, 229, 255, 1);
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
  flex: 60;
  border: 1px solid rgba(31, 173, 255, 1);
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
  border: 1px solid rgba(156, 143, 252, 1);
  background: linear-gradient(to bottom,
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
    0 0 10px rgba(156, 143, 252, 0.3), 0 0 20px rgba(156, 143, 252, 0.1);

  &::before {
    content: "";
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

.process_bottom_hover {
  box-shadow: 0 0 4px rgba(156, 143, 252, 0.5),
    0 0 10px rgba(156, 143, 252, 0.3), 0 0 20px rgba(156, 143, 252, 0.1);

  &::before {
    content: "";
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
  font-size: 16px;
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
  height: calc(100% - 170px);
  transform: translateY(24%);

  .pic_wrapper {
    width: 100%;
    height: 100%;
    // padding: 10px 10px 10px 100px;
    padding: 68px 30px 30px 70px;
  }

  img {
    width: 94%;
    height: 72%;
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
