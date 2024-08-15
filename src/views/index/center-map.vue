

<template>
  <div class="centermap">
    <div class="maptitle">
      <!-- <div class="zuo"></div>
      <span class="titletext">{{ title }}</span>
      <div class="you"></div> -->
    </div>
    <div class="mapwrap ">
      <!--  -->
      <div class="canvas-container">
        <!-- canvas 元素用于绘制图片和弹窗 -->
        <canvas ref="canvasRef"></canvas>
        <!-- 绝对定位的容器，用于包含弹窗 div -->
        <div ref="popupContainerRef" class="popup-container">
          <div 
            v-for="(popup, index) in popups" 
            :key="index"
            class="popup"
            style="padding: 24px"
            :style="getPopupStyle(popup, index)"
            @click.stop="handlePopupClick(popup)"
          >
            <div style="display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; height: 100%;">
              <div :style="{...popup.contenStyle}" style="margin-bottom: 6px;">{{ popup.content }}</div>
              <div :style="{ backgroundImage: popup.contenStyle.pop_bar_bg}" style="display: flex;width: 100%;background-repeat: no-repeat;">
                <div style="width: 16px; background-repeat: no-repeat; background-position: center;background-image: url('/src/assets/img/pop_bar_left_arrow.png');"></div>
                <div style="display: flex;flex-direction: row; justify-content: space-between; align-items: center; width: 100%;">
                  <div>碳排放量</div>
                  <div>{{ 12548 }}</div>
                </div>
              </div>
              <div :style="{ backgroundImage: popup.contenStyle.pop_bar_bg}" style="display: flex;width: 100%;background-repeat: no-repeat;">
                <div style="width: 16px; background-repeat: no-repeat; background-position: center;background-image: url('/src/assets/img/pop_bar_left_arrow.png');"></div>
                <div style="display: flex;flex-direction: row; justify-content: space-between; align-items: center; width: 100%;">
                  <div>能耗</div>
                  <div>{{ 12548 }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      <!--  -->
      <!-- <CoordinatePicker :imageSrc="'src/assets/img/centerimg.png'" /> -->
      <!-- <InteractiveImage
        :imageSrc="'src/assets/img/centerimg.png'"
        :markers="markers"
        @markerClick="handleMarkerClick"
        @tooltipButtonClick="handleTooltipButtonClick"
      /> -->
      <!-- <BorderBox13> -->
        <!-- <div class="centerimg"></div> -->
        <!-- <div class="quanguo" @click="getData('china')" v-if="code !== 'china'">中国</div> -->
        <!-- <v-chart
          class="chart"
          :option="option"
          ref="centerMapRef"
          @click="mapClick"
          v-if="JSON.stringify(option) != '{}'"
        /> -->
      <!-- </BorderBox13> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, nextTick, onMounted, onBeforeUnmount } from "vue";
import { centerMap, GETNOBASE } from "@/api";
import { registerMap, getMap } from "echarts/core";
import { optionHandle, regionCodes } from "./center.map";
import BorderBox13 from "@/components/datav/border-box-13";
import { ElMessage } from "element-plus";
import InteractiveImage from './InteractiveImage.vue';
import type { MapdataType } from "./center.map";
import CoordinatePicker from './CoordinatePicker.vue';
import { log } from "console";
// import CanvasImagePopup from './CanvasImagePopup.vue';
const option = ref({});
const code = ref("china"); //china 代表中国 其他地市是行政编码
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
      const container:any = popupContainerRef.value;
      container.style.width = `${image.width}px`;
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
  alert(`Popup clicked: ${popup.content}`);
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
    const ctx: any = ctxRef.value;
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, image.width, image.height);
      // drawPopupsWithCanvas();
    };
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

  onMounted( async  () => {
    await nextTick()
    window.addEventListener('resize', handleResize);
    const canvas = canvasRef.value;
    if (canvas) {
      console.log(111, canvas)
      // 接下来可以使用 ctx 进行绘图操作
      loadImage();
    }
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('resize', handleResize);
  });

/**
 * 
*/





withDefaults(
  defineProps<{
    // 结束数值
    title: number | string;
  }>(),
  {
    title: "地图",
  }
);

const dataSetHandle = async (regionCode: string, list: object[]) => {
  const geojson: any = await getGeojson(regionCode);
  let cityCenter: any = {};
  let mapData: MapdataType[] = [];
  //获取当前地图每块行政区中心点
  geojson.features.forEach((element: any) => {
    cityCenter[element.properties.name] = element.properties.centroid || element.properties.center;
  });
  //当前中心点如果有此条数据中心点则赋值x，y当然这个x,y也可以后端返回进行大点，前端省去多行代码
  list.forEach((item: any) => {
    if (cityCenter[item.name]) {
      mapData.push({
        name: item.name,
        value: cityCenter[item.name].concat(item.value),
      });
    }
  });
  await nextTick();

  option.value = optionHandle(regionCode, list, mapData);
};

const getData = async (regionCode: string) => {
  centerMap({ regionCode: regionCode })
    .then((res) => {
      console.log("中上--设备分布", res);
      if (res.success) {
        dataSetHandle(res.data.regionCode, res.data.dataList);
      } else {
        ElMessage.error(res.msg);
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
};
const getGeojson = (regionCode: string) => {
  return new Promise<boolean>(async (resolve) => {
    let mapjson = getMap(regionCode);
    if (mapjson) {
      mapjson = mapjson.geoJSON;
      resolve(mapjson);
    } else {
      mapjson = await GETNOBASE(`./map-geojson/${regionCode}.json`).then((data) => data);
      code.value = regionCode;
      registerMap(regionCode, {
        geoJSON: mapjson as any,
        specialAreas: {},
      });
      resolve(mapjson);
    }
  });
};
getData(code.value);

const mapClick = (params: any) => {
  // console.log(params);
  let xzqData = regionCodes[params.name];
  if (xzqData) {
    getData(xzqData.adcode);
  } else {
    window["$message"].warning("暂无下级地市");
  }
};



const markers = ref([
  { id: 'building1', x: 320, y: 535, tooltipContent: '建筑物 1' },
  { id: 'building2', x: 700, y: 400, tooltipContent: '建筑物 2' },
  { id: 'building3', x: 1010, y: 800, tooltipContent: '建筑物 3' }
  // { id: 'building1', x: 120, y: 135, tooltipContent: '建筑物 1' },
  // { id: 'building2', x: 300, y: 200, tooltipContent: '建筑物 2' },
  // { id: 'building3', x: 500, y: 250, tooltipContent: '建筑物 3' }
]);

const handleMarkerClick = (marker: any) => {
  console.log('Marker clicked:', marker);
};

const handleTooltipButtonClick = (marker: any) => {
  console.log('Tooltip button clicked:', marker);
};


</script>

<style scoped lang="scss">

.canvas-container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  canvas {
    display: block;
    width: 100%;
    height: auto;
  }

  
.popup-container {
  position: absolute;
  top: 0;
  left: 0;
}

.popup {
  position: absolute;
  /* 初始状态不可见，待计算位置后再显示 */
  // visibility: hidden;
}


.centerimg {
  height: 100%;
  background-image: url("@/assets/img/centerimg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}
.centermap {
  margin-bottom: 30px;

  .maptitle {
    height: 60px;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;

    .titletext {
      font-size: 28px;
      font-weight: 900;
      letter-spacing: 6px;
      background: linear-gradient(92deg, #0072ff 0%, #00eaff 48.8525390625%, #01aaff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin: 0 10px;
    }

    .zuo,
    .you {
      background-size: 100% 100%;
      width: 29px;
      height: 20px;
      margin-top: 8px;
    }

    .zuo {
      background: url("@/assets/img/xiezuo.png") no-repeat;
    }

    .you {
      background: url("@/assets/img/xieyou.png") no-repeat;
    }
  }

  .mapwrap {
    height: 580px;
    width: 100%;
    // padding: 0 0 10px 0;
    box-sizing: border-box;
    position: relative;

    .quanguo {
      position: absolute;
      right: 20px;
      top: -46px;
      width: 80px;
      height: 28px;
      border: 1px solid #00eded;
      border-radius: 10px;
      color: #00f7f6;
      text-align: center;
      line-height: 26px;
      letter-spacing: 6px;
      cursor: pointer;
      box-shadow: 0 2px 4px rgba(0, 237, 237, 0.5), 0 0 6px rgba(0, 237, 237, 0.4);
      z-index: 10;
    }
  }
}
</style>



