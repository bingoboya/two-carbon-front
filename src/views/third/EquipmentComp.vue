<template>
    <div class="equipment_wrap" style="">
        <div style="flex:1;    z-index: 2;">
            <ItemWrap title="运行参数情况">
                <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
                    <div>
                        <div style="background: rgb(67 133 156 / 21%);">当前参数</div>
                        <div style="padding: 20px;width: 100%; align-items: center; justify-content: space-around; display: flex; flex-direction: row;">
                            <div>温度</div>
                            <div>加热时间</div>
                            <div>状态</div>
                        </div>
                    </div>
                    <div class="my-table">
                        <div class="table_th">
                            <span>日期</span>
                            <span>温度(°C)</span>
                            <span>加热时间(分钟)</span>
                        </div>
                        <vue3-seamless-scroll
                            :list="TableData.data"
                            direction="up"
                            :hover="true"
                            :limitScrollNum="1"
                            :step="0.2"
                            class="scroll seamless-warp2"
                            >
                            <div class="table_td item"
                                v-for="(item, index) in TableData.data"
                                :key="index"
                            >
                                <span>{{item.date}}</span>
                                <span>{{item.title}}</span>
                                <span>{{10}}</span>
                            </div>
                        </vue3-seamless-scroll>
                    </div>
                </div>
            </ItemWrap>
        </div>
        <div style="flex:1; display: flex; flex-direction: column;">
            <ModalCenterBottom title="弹窗中间模块" style="flex: 1;"/>
            <ItemWrap style="height: 315px;" title="维护记录">
                <div class="my-table">
                        <div class="table_th">
                            <span>日期</span>
                            <span>温度(°C)</span>
                            <span>加热时间(分钟)</span>
                        </div>
                        <vue3-seamless-scroll
                            :list="TableData.data"
                            direction="up"
                            :hover="true"
                            :limitScrollNum="1"
                            :step="0.2"
                            class="scroll seamless-warp2"
                            >
                            <div class="table_td item"
                                v-for="(item, index) in TableData.data"
                                :key="index"
                            >
                                <span>{{item.date}}</span>
                                <span>{{item.title}}</span>
                                <span>{{10}}</span>
                            </div>
                        </vue3-seamless-scroll>
                    </div>
            </ItemWrap>
        </div>
        <div style="flex:1;display: flex; flex-direction: column;gap: 20px;    z-index: 2;">
            <ItemWrap title="碳排放情况">
                <LeftTop />
            </ItemWrap>
            <ItemWrap title="电量情况">
                <RightBottom />
            </ItemWrap>
        </div>
    </div>
</template>

<script setup lang="ts">
import { LeftTop, RightBottom, ModalCenterBottom } from "./index";
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";


import ItemWrap from "@/components/item-wrap";
import { reactive, ref } from "vue";

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
     
    ]
}
    
);
</script>
<style scoped lang="scss">
.my-table {
    overflow: hidden;
}
.table_th {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
}

.scroll {
  height: 100%;
  width: 100%;
//   margin: 100px auto;
  overflow: hidden;
}

.scroll .item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 0;
}

.equipment_wrap {
  width: 100%;
  display: flex;
  /* min-height: calc(100% - 64px); */
  justify-content: space-between;
  width: 100%;
  height: 100%;
  background: #5154565c;
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
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  // height: 310px;
  flex: 1;
}
</style>

