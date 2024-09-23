<template>
  <div class="equipment_wrap">
    <div style="flex:418; z-index: 2;display: flex;">
      <ItemWrap title="运行参数情况" titlebg='/src/assets/bgpng/头部2.png' >
        <div style="width: 100%; height: 100%; display: flex; flex-direction: column; gap: 6px;">
          <div class="params_wrapper">
            <div class="params_title" >当前参数</div>
            <div class="params_wrap">
              <div class="params_item">
                <div class="temp_item">
                  <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                    <div style="color: RGBA(95, 249, 255, 1); font-size: 22px; font-weight: 600;">150</div>
                    <div>°C</div>
                  </div>
                </div>
                <div style="flex: 1; margin-top: 4px;">温度</div>
              </div>
              <div class="params_item">
                <div class="temp_item">
                  <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                    <div style="color: RGBA(95, 249, 255, 1); font-size: 22px; font-weight: 600;">15</div>
                    <div>分钟</div>
                  </div>
                </div>
                <div style="flex: 1; margin-top: 4px;">加热时间</div>
              </div>
              <div style="display: flex;flex: 1;align-items: center;" class="params_item ">
                <div class="temp_item" style="color: RGBA(95, 249, 255, 1); font-size: 22px; font-weight: 600;">
                  <div style="display: flex; flex-direction: row; justify-content: center; align-items: center;">
                    良好
                  </div>
                </div>
                <div style="flex: 1; margin-top: 4px;">状态</div>
              </div>
            </div>
          </div>
          <div class="my_table" >
            <div class="table_th">
              <div class="table_content_left">日期</div>
              <div class="table_content_center">温度(°C)</div>
              <div class="table_content_right">加热时间(分钟)</div>
            </div>
            <vue3-seamless-scroll :list="TableData.data" direction="up" :hover="true" :limitScrollNum="14"
              :openWatch="true" :step="0.2" :wheel="true" :isWatch="true" class="scroll" >
              <div class="item" v-for="(item, index) in TableData.data" :key="index">
                <div class="scroll_item_left">{{ item.date }}</div>
                <div class="scroll_item_center">{{ item.title }}</div>
                <div class="scroll_item_right">{{ 10 }}</div>
              </div>
            </vue3-seamless-scroll>
            <!-- <CustomeScroll /> -->
          </div>
        </div>
      </ItemWrap>
    </div>
    <div style="flex:546; display: flex; flex-direction: column;">
      <div class="model_wrapper">
        <ThreeDPngEffect :image-src="'/src/assets/bgpng/department1.png'" :max-tilt-angle="30" />
      </div>
      <ItemWrap titlebg='/src/assets/bgpng/二级标题头部长bg.png' style="height: 315px;" title="维护记录">
        <div class="my_table">
          <div class="table_th">
            <div class="table_content_left">日期</div>
            <div class="table_content_center">维护记录</div>
            <div class="table_content_right">故障说明</div>
          </div>
          <!-- 开启数据实时监控刷新dom  -->
          <vue3-seamless-scroll :list="TableData.data" direction="up" :hover="true" :limitScrollNum="7"
            :openWatch="true" :step="0.2" :wheel="true" :isWatch="true" class="scroll">
            <div class="item" v-for="(item, index) in TableData.data" :key="index">
              <div class="scroll_item_left">{{ item.date }}</div>
              <div class="scroll_item_center">{{ item.title }}</div>
              <div class="scroll_item_right">{{ 10 }}</div>
            </div>
          </vue3-seamless-scroll>
        </div>
      </ItemWrap>
    </div>
    <div style="flex:418;display: flex; flex-direction: column;gap: 20px; z-index: 2;">
      <ItemWrap title="碳排放情况">
        <EquipmentLeftTop />
      </ItemWrap>
      <ItemWrap title="电量情况">
        <EquipmentRightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<script setup lang="ts">
// import CustomeScroll from './CustomeScroll.vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
// import { BorderBox8 as DvBorderBox8, ScrollBoard } from '@kjgl77/datav-vue3'
import ThreeDPngEffect from '@/components/ThreeDPngEffect.vue';
import ItemWrap from "@/components/item-wrap";
import EquipmentLeftTop from "@/components/EquipmentLeftTop.vue";
import EquipmentRightBottom from "@/components/EquipmentRightBottom.vue";
import { onMounted, reactive, ref } from "vue";

const TableData: any = reactive({
  data: [
    {
      num: (Math.random()).toFixed(3),
      title: "第1条",
      date: '202401',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第2条",
      date: '202402',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第3条",
      date: '202403',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第4条",
      date: '202404',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第5条",
      date: '202405',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第6条",
      date: '202406',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第7条",
      date: '202407',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第8条",
      date: '202408',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第9条",
      date: '202409',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第10条",
      date: '202406',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第11条",
      date: '202407',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第12条",
      date: '202408',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第13条",
      date: '202409',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第14条",
      date: '202409',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第15条",
      date: '202409',
    },
    {
      num: (Math.random()).toFixed(3),
      title: "第16条",
      date: '202409',
    },

  ]
}

);
</script>
<style scoped lang="scss">
.model_wrapper {
  width: 100%; height: 100%;
  background-image: url('src/assets/bgpng/机组两边点缀bg.png');
  background-repeat: round;
}
.params_title {
  text-indent: 10px;
  background-image: url('src/assets/bgpng/当前参数文字bg.png');
  background-repeat: no-repeat;
}
.temp_item {
  width: 75px;
  height: 64px;
  // align-items: center;
  justify-content: center;
  background-image: url('src/assets/bgpng/当前参数图标bg.png');
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}

.params_wrapper {
  padding: 10px;
  background-image: url('src/assets/bgpng/当前参数bg.png');
  background-repeat: round;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.params_wrap {
  height: 100%;
  padding: 20px 0px;
  width: 100%;
  gap: 4px;
  align-items: center;
  justify-content: space-around;
  display: flex;
  flex-direction: row;
}

.params_item {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  // background-color: #454545a8;
  justify-content: center;
  align-items: center;
}

.table_content_left {
  flex: 15;
  text-align: center;
  padding: 6px 0;
  border-bottom: 1px solid #2ac8ee;
}

.table_content_center {
  flex: 20;
  text-align: center;
  border: 1px solid #2ac8ee;
  border-top: none;
  padding: 6px 0;
}

.table_content_right {
  flex: 30;
  text-align: center;
  padding: 6px 0;
  border-bottom: 1px solid #2ac8ee;
}

.scroll_item_left {
  flex: 15;
  text-align: center;
  border-bottom: 1px solid #2ac8ee;
  padding: 6px 0;
}

.scroll_item_center {
  flex: 20;
  text-align: center;
  border: 1px solid #2ac8ee;
  border-top: none;
  padding: 6px 0;
}

.scroll_item_right {
  flex: 30;
  text-align: center;
  border-bottom: 1px solid #2ac8ee;
  padding: 6px 0;
}

.my_table {
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.table_th {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  border: 2px solid RGBA(42, 182, 255, 1);
  border-bottom: none;
  background: RGBA(8, 111, 206, 1);
}

.scroll {
  //   margin: 100px auto;
  border: 2px solid RGBA(42, 182, 255, 1);
  border-top: none;
  width: 100%;
  overflow: hidden;
}

.scroll>div>div>div:nth-child(2n) {
  background-color: rgba(6, 50, 122, 0.336);
}

.scroll>div>div>div:nth-child(2n + 1) {
  background-color: rgba(7, 62, 140, 0.644);
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.equipment_wrap {
  overflow: hidden;
  display: flex;
  /* min-height: calc(100% - 64px); */
  justify-content: space-between;
  width: 100%;
  height: 100%;
  // background: #5154565c;
  gap: 20px;
}

//左边 右边 结构一样
.contetn_left,
.contetn_right {
  z-index: 1;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  gap: 10px;
  position: relative;
  width: 140px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.contetn_center {
  flex: 1;
  margin: 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  .contetn_center-bottom {
    // height: 315px;
    flex: 1;
  }
}
</style>
