
<template>
  <div class="left_top_wrap">
    <div class="left_top_item_wrap" >
      <div class="left_top_item_cont">
        <div style="width: 50px;height: 50px;"><img style="width:100%;" :src="icon1" alt=""></div>
        <div>
          <div>总碳排放量</div>
          <div style="display: flex;gap: 10px;">
            <div><CountUp style="color: yellow;" :endVal="99.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            <div style="color: gray">万吨</div>
          </div>
          <div style="display: flex;">
            <div>同比</div>
            <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
              <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
              <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
              <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            </div>
            <div style="color: gray">%</div>
          </div>
        </div>
      </div>
      <div class="splitshort" style="height: 100%; width: 1px;"></div>
      <div class="left_top_item_cont">
        <div style="width: 50px;height: 50px;"><img style="width:100%;" :src="icon2" alt=""></div>
        <div>
          <div>总能耗</div>
          <div style="display: flex;gap: 10px;">
            <div><CountUp style="color: yellow;" :endVal="199" :duration="duration" /></div>
            <div style="color: gray">亿吨标准煤</div>
          </div>
          <div style="display: flex; ">
            <div>同比</div>
            <div :style="{color: !true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
              <img style="height: 14px;" v-if="!true" :src="arrow_top_icon" alt="">
              <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
              <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            </div>
            <div style="color: gray">%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="splitlong"  style="height: 1px; width: 100%;"></div>

    <div class="left_top_item_wrap" >
      <div class="left_top_item_cont">
        <div style="width: 50px;height: 50px;"><img style="width:100%;" :src="icon3" alt=""></div>
        <div>
          <div>环境保护投入</div>
          <div style="display: flex;gap: 10px;">
            <div><CountUp style="color: yellow;" :endVal="99" :duration="duration" /></div>
            <div style="color: gray">亿元</div>
          </div>
          <div style="display: flex; ">
            <div>同比</div>
            <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
              <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
              <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
              <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            </div>
            <div style="color: gray">%</div>
          </div>
        </div>
      </div>
      <div class="splitshort" style="height: 100%; width: 1px;"></div>
      <div class="left_top_item_cont">
        <div style="width: 50px;height: 50px;"><img style="width:100%;" :src="icon4" alt=""></div>
        <div>
          <div>安全生产投入</div>
          <div style="display: flex;gap: 10px;">
            <div><CountUp style="color: yellow;" :endVal="99" :duration="duration" /></div>
            <div style="color: gray">亿元</div>
          </div>
          <div style="display: flex;">
            <div>同比</div>
            <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
              <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
              <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
              <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            </div>
            <div style="color: gray">%</div>
          </div>
        </div>
      </div>
    </div>

    <div class="splitlong"  style="height: 1px; width: 100%;"></div>

    <div class="left_top_item_wrap" >
      <div class="left_top_item_cont">
        <div style="width: 50px;height: 50px;"><img style="width:100%;" :src="icon5" alt=""></div>
        <div>
          <div>生产产量</div>
          <div style="display: flex;gap: 10px;">
            <div><CountUp style="color: yellow;" :endVal="99" :duration="duration" /></div>
            <div style="color: gray">万吨</div>
          </div>
          <div style="display: flex;">
            <div>同比</div>
            <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
              <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
              <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
              <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            </div>
            <div style="color: gray">%</div>
          </div>
        </div>
      </div>
      <div class="splitshort" style="height: 100%; width: 1px;"></div>
      <div class="left_top_item_cont">
        <div style="width: 50px;height: 50px;"><img style="width:100%;" :src="icon6" alt=""></div>
        <div>
          <div style="display: flex; gap: 6px;">
            <div style="text-wrap: nowrap;">季度能耗</div>
            <div style="display: flex; align-items: center;">
              <!-- <select class="custom-select">
                <option value="option1">2023-Q1</option>
                <option value="option2">2023-Q2</option>
                <option value="option3">2023-Q3</option>
                <option value="option4">2023-Q4</option>
              </select> -->

              <CusTomSelect 
                v-model="selectedValue"
                :options="options"
                placeholder="请选择"
              />

            </div>
          </div>
          <div style="display: flex;gap: 10px;">
            <div><CountUp style="color: yellow;" :endVal="99" :duration="duration" /></div>
            <div style="color: gray">亿标准煤万元</div>
          </div>
          <div style="display: flex;">
            <div>同比</div>
            <div :style="{color: true ?  'red': 'green'}" style="display: flex; align-items: center;gap: 4px; padding-left: 8px;">
              <img style="height: 14px;" v-if="true" :src="arrow_top_icon" alt="">
              <img style="height: 14px;" v-else :src="arrow_down_icon" alt="">
              <div><CountUp :endVal="1.23" :duration="duration" :options="{decimalPlaces: 3}"/></div>
            </div>
            <div style="color: gray">%</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { countDeviceNum } from "@/api";

import CountUp from "@/components/count-up";
import {ElMessage} from "element-plus"
import icon1 from '@/assets/icon/safe_product.png'
import icon2 from '@/assets/icon/icon2.png'
import icon3 from '@/assets/icon/icon3.png'
import icon4 from '@/assets/icon/icon4.png'
import icon5 from '@/assets/icon/icon5.png'
import icon6 from '@/assets/icon/icon6.png'
import arrow_down_icon from '@/assets/icon/arrow_down_icon.png'
import arrow_top_icon from '@/assets/icon/arrow_top_icon.png'
import CusTomSelect from './CusTomSelect.vue'
document.addEventListener('DOMContentLoaded', function() {
  const selectElement: any = document.querySelector('.custom-select');
  
  // 监听选项变化事件
  selectElement.addEventListener('change', (value: any) => {
    console.log('选中的值：', value);
    // 这里可以添加更多的交互逻辑
  });
});


const selectedValue = ref('');
const options = [
  { value: 'option1', label: '2021' },
  { value: 'option2', label: '2022' },
  { value: 'option3', label: '2023' },
  { value: 'option31', label: '2024' },
  { value: 'option32', label: '2025' },
  { value: 'option33', label: '2026' },
  { value: 'option34', label: '2027' },
];

const duration = ref(2);
const state = reactive({
  alarmNum: 0,
  offlineNum: 0,
  onlineNum: 0,
  totalNum: 0,
  iconList: [
    {
      iconName: '总碳排放量',
      unit: '万吨',
      num: 66,
      percent: 1.52,
      iconSrc: '/assets/icon/safe_product.png'
    }

  ]
});


const getData = () => {
  countDeviceNum().then((res) => {
    if (res.success) {
      state.alarmNum = res.data.alarmNum;
      state.offlineNum = res.data.offlineNum;
      state.onlineNum = res.data.onlineNum;
      state.totalNum = res.data.totalNum;
    }else{
      ElMessage.error(res.msg)
    }
  }).catch(err=>{
    ElMessage.error(err)
  });;
};
getData();
</script>

<style scoped lang="scss">
.left_top_wrap {
  display: flex; flex-direction: column;justify-content: space-around;align-items: center;width: 100%; height: 100%;
}
.left_top_item_wrap {
  flex: 1;display: flex; flex-direction: row; justify-content: space-between;width: 100%;align-items: center;
}
.left_top_item_cont {
  flex: 1;display: flex; 
  flex-direction: row; 
  align-items: center;gap: 10px;padding-left: 10px;
}
/* 下拉选项容器样式 */


/* 下拉选项样式 */
.custom-select option {
  background-color: #0ba4e1;
  color: #333;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  border: none; /* 移除默认的边框 */
  box-shadow: none; /* 移除默认的阴影 */
}

/* 鼠标悬停在选项上时的样式 */
.custom-select option:hover {
  background-color: #f1f1f1;
}

/* 当 select 被聚焦时的边框颜色变化 */
.custom-select:focus {
  border-color: #4CAF50;
}

/* 隐藏浏览器默认的下拉箭头 */
.custom-select option:after {
  content: none;
}
/* 自定义下拉框样式 */
.custom-select {
  font-size: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #255dc0;
  appearance: none; /* 移除默认样式 */
  width: 52px; /* 指定宽度 */
  cursor: pointer;
  position: relative; /* 使伪元素绝对定位 */
  overflow: hidden; /* 隐藏溢出的内容 */
  transition: border-color 0.3s ease; /* 边框颜色变化动画 */
}

/* 添加自定义箭头 */
.custom-select::after {
  content: '▼';
  position: absolute;
  top: 50%;
  right: 0px;
  transform: translateY(-50%);
  pointer-events: none; /* 防止点击箭头时触发其他事件 */
}



.splitshort {
  background-repeat: no-repeat;
  background-image: url('@/assets/img/split_line_short.png')
}
.splitlong {
  background-repeat: no-repeat;
  background-image: url('@/assets/img/split_line_long.png')
}
.grid-container {
  display: grid;
  grid-template-rows: 1fr 1fr 1fr; /* 定义三行，每行高度相等 */
  grid-template-columns: 1fr 1fr; /* 定义两列，每列宽度相等 */
  grid-gap: 10px; /* 定义行和列之间的间距 */
}

.grid-item {
  /* 网格项的样式，例如背景色 */
  background-color: rgba(255, 255, 255, 0.8);
  padding: 14px;
  text-align: center;
}

.left-top {
  width: 100%;
  height: 100%;
}

.user_Overview {
  li {
    flex: 1;

    p {
      text-align: center;
      height: 16px;
      font-size: 16px;
    }

    .user_Overview_nums {
      width: 100px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      font-size: 22px;
      margin: 50px auto 30px;
      background-size: cover;
      background-position: center center;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      &.bgdonghua::before {
        animation: rotating 14s linear infinite;
      }
    }

    .allnum {
      &::before {
        background-image: url("@/assets/img/left_top_lan.png");
      }
    }

    .online {
      &::before {
        background-image: url("@/assets/img/left_top_lv.png");
      }
    }

    .offline {
      &::before {
        background-image: url("@/assets/img/left_top_huang.png");
      }
    }

    .laramnum {
      &::before {
        background-image: url("@/assets/img/left_top_hong.png");
      }
    }
  }
}
</style>
