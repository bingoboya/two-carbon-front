<template>
  <div class="equipment_wrap">
    <div style="flex: 418; z-index: 2; display: flex">
      <ItemWrap title="运行参数情况" :backgroundImg="底部长bg" titlebg="headImg" :titleImg="headImg">
        <div style=" width: 100%; height: 100%; display: flex; flex-direction: column; gap: 6px;">
          <div class="params_wrapper">
            <div class="params_title">当前参数</div>
            <div class="params_wrap">
              <div class="params_item">
                <div class="temp_item">
                  <div class="item_wrap">
                    {{ WholeRunningTime }}
                  </div>
                </div>
                <div style="flex: 1; margin-top: 4px">运行总时长(h)</div>
              </div>
              <div class="params_item">
                <div class="temp_item">
                  <div class="item_wrap">
                    {{ curRatedPower }}
                  </div>
                </div>
                <div style="flex: 1; margin-top: 4px">运行功率(kw)</div>
              </div>
              <div style="display: flex; flex: 1; align-items: center" class="params_item">
                <div class="temp_item">
                  <div class="item_wrap">
                    良好
                  </div>
                </div>
                <div style="flex: 1; margin-top: 4px">状态</div>
              </div>
            </div>
          </div>
          <div class="my_table">
            <div class="table_th">
              <div class="table_content_left">日期</div>
              <div class="table_content_center">运行时长(h)</div>
              <div class="table_content_right">运行功率(kw)</div>
            </div>
            <vue3-seamless-scroll :list="state.operatingParameterList" direction="up" :hover="true" :limitScrollNum="11"
              :openWatch="true" :step="0.2" :wheel="true" :isWatch="true" class="scroll">
              <div class="item" v-for="(item, index) in state.operatingParameterList" :key="index">
                <div class="scroll_item_left">{{ item.date }}</div>
                <div class="scroll_item_center">{{ item.runningTime }}</div>
                <div class="scroll_item_right">{{ item.ratedPower }}</div>
              </div>
            </vue3-seamless-scroll>
            <!-- <CustomeScroll /> -->
          </div>
        </div>
      </ItemWrap>
    </div>
    <div style="flex: 546; display: flex; flex-direction: column">
      <div class="model_wrapper">
        <ThreeDPngEffect :image-src="getImageUrl()" :max-tilt-angle="30" />
      </div>
      <ItemWrap titlebg="titleHeadBg" :backgroundImg="底部长bg" :titleImg="titleHeadBg" style="height: 315px" title="维护记录">
        <div class="my_table">
          <div class="table_th">
            <div class="table_content_left">日期</div>
            <div class="table_content_center">维护记录</div>
            <div class="table_content_right">故障说明</div>
          </div>
          <!-- 开启数据实时监控刷新dom  -->
          <vue3-seamless-scroll :list="state.maintainRecordList" direction="up" :hover="true" :limitScrollNum="7"
            :openWatch="true" :step="0.2" :wheel="true" :isWatch="true" class="scroll">
            <div class="item" v-for="(item, index) in state.maintainRecordList" :key="index">
              <div class="scroll_item_left">{{ item.date }}</div>
              <div class="scroll_item_center">{{ item.maintainRecord }}</div>
              <div class="scroll_item_right">{{ item.faultDescription }}</div>
            </div>
          </vue3-seamless-scroll>
        </div>
      </ItemWrap>
    </div>
    <div style=" flex: 418; display: flex; flex-direction: column; gap: 20px; z-index: 2;">
      <ItemWrap titlebg="headImg" :backgroundImg="底部长bg" :titleImg="headImg" title="碳排放量情况">
        <EquipmentRightTop :dataList="state.carbonEmission" />
      </ItemWrap>
      <ItemWrap titlebg="headImg" :backgroundImg="底部长bg" :titleImg="headImg" title="用电量情况">
        <EquipmentRightBottom :dataList="state.powerQuantity" />
      </ItemWrap>
    </div>
  </div>
</template>
<script setup lang="ts">
import { bengangfourthpage } from "@/api";
import 底部长bg from "@/assets/bgpng/底部长bg.png";
import headImg from "/src/assets/bgpng/头部2.png";
import titleHeadBg from "/src/assets/bgpng/二级标题头部长bg.png";
// import CustomeScroll from './CustomeScroll.vue'
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
// import { BorderBox8 as DvBorderBox8, ScrollBoard } from '@kjgl77/datav-vue3'
import ThreeDPngEffect from "@/components/ThreeDPngEffect.vue";
import ItemWrap from "@/components/item-wrap";
import EquipmentRightTop from "@/components/EquipmentLeftTop.vue";
import EquipmentRightBottom from "@/components/EquipmentRightBottom.vue";

const props = defineProps({
  departmentImgName: {
    type: String,
    default: "电镀锌机组",
  },
  departmentUrl: {
    type: String,
    default: "电镀锌机组",
  },
});
// 当前月份的运行时长
const WholeRunningTime = ref(10);
// 当前月份的额定功率
const curRatedPower = ref(30);
const state = reactive({
  carbonEmission: {}, // 碳排放量情况,
  operatingParameterList: <any>[], // 运行参数情况,
  powerQuantity: {}, // 用电情况,
  maintainRecordList: <any>[], // 维护记录,
})
const getData = async () => {
  const res = await bengangfourthpage({ name: props.departmentUrl });
  if (res.code === 0) {
    console.log(res);
    const { carbonEmission, operatingParameterList, powerQuantity, maintainRecordList } = res.data
    state.carbonEmission = carbonEmission
    state.operatingParameterList = operatingParameterList;
    state.powerQuantity = powerQuantity;
    state.maintainRecordList = maintainRecordList;
    WholeRunningTime.value = operatingParameterList.reduce((prev: any, cur: any) => Number(prev) + Number(cur.runningTime), 0)
    curRatedPower.value = operatingParameterList.reduce((prev: any, cur: any) => prev + parseFloat(cur.ratedPower), 0) / operatingParameterList.length;
  } else {
    console.log(res.msg);
  }
};

const getImageUrl = (name: any = props.departmentImgName) => {
  // name = '电镀锌无阴影'
  // name = '机组2无阴影'
  // 注意URL里面不能是纯变量，那样就会报错了 详细的报错 你可以去试试看 https://cn.vitejs.dev/guide/assets.html#new-url-url-import-meta-url
  const a = new URL(`/src/assets/bgpng/${name}.png`, import.meta.url).href;
  console.log(name);
  console.log(a);
  return a;
};

onMounted(() => {
  getData();
});

</script>
<style scoped lang="scss">
.item_wrap {
  color: RGBA(95, 249, 255, 1);
  font-size: 22px;
  font-weight: 600;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.model_wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background-image: url("/src/assets/bgpng/机组两边点缀bg.png");
  background-repeat: round;
}

.params_title {
  text-indent: 10px;
  background-image: url("/src/assets/bgpng/当前参数文字bg.png");
  background-repeat: no-repeat;
}

.temp_item {
  width: 75px;
  height: 64px;
  // align-items: center;
  justify-content: center;
  background-image: url("/src/assets/bgpng/当前参数图标bg.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: bottom;
}

.params_wrapper {
  padding: 10px;
  background-image: url("/src/assets/bgpng/当前参数bg.png");
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
</style>
