<template>

 <!-- 如果时teleport 需要在 content_wrapper 元素 外套上 scale-screen组件， 保证可以使用scale的逻辑 -->
<!-- <Teleport v-if="mountedOnBody && visible" to="body">
  <scale-screen
    :width="screenWidth"
    :height="screenHeight"
    style="    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;"
    :delay="500"
    :fullScreen="false"
    :boxStyle="{
      background: '#03050C',
      overflow: isScale ? 'hidden' : 'auto',
    }"
    :wrapperStyle="wrapperStyle"
    :autoScale="isScale"
  >
  <div class="content_wrapper">
    <div class="cusmodal_content_wrap">
    <div class="modal_wrapper" @click.self="closeModal">
      <div class="modal_container" style="border: 4px solid #4890f8a1">
        <div class="modal_header" style="position: relative">
          <div style=" flex: 1; display: flex; justify-content: center; align-items: center;">
            <h3>{{ title }}</h3>
          </div>
          <div style=" display: flex; gap: 16px; position: absolute; right: 12px; flex-direction: row; align-items: center;" >
            <div>
              <CusTomSelect
                v-model="selectedValue"
                :options="options"
                placeholder="请选择"
              />
            </div>
            <div><button class="close-btn" @click="closeModal">×</button></div>
          </div>
        </div>
        <div class="modal_body">
          <slot name="content"></slot>
        </div>
        <div v-if="false" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
    </div>
  </div>
  </scale-screen>
</Teleport> -->

  <div v-if="!mountedOnBody && visible" class="modal_wrapper" @click.self="closeModal">
    <div @click.self="closeModal" class="overlay"></div>
    <div class="modal_container">
      <!-- <div class="modal_header" > -->
        <div class="modal_header" >
          <div class="modal_title_wrap" >
            {{ title }}
          </div>
          <div style=" display: flex; gap: 16px; position: absolute; right: 36px; flex-direction: row; align-items: center;" >
            <div>
              <CusTomSelect
                v-model="selectedValue"
                :options="options"
                placeholder="请选择"
              />
            </div>
            <div class="close_btn" @click="closeModal">
              <!-- <button class="close-btn" @click="closeModal">×</button> -->
            </div>
          </div>
        </div>
      <!-- </div> -->
      <div class="modal_body">
        <slot name="content"></slot>
      </div>
      <div v-if="false" class="modal-footer">
        <slot name="footer"></slot>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import CusTomSelect from "@/components/CusTomSelect.vue";
// import ScaleScreen from "@/components/scale-screen";
import { useSettingStore } from "@/stores/index";
import { storeToRefs } from "pinia";
const screenWidth = 1980
const screenHeight = 1080
const settingStore = useSettingStore();
const { isScale } = storeToRefs(settingStore);
const wrapperStyle = {};

interface ModalProps {
  // visible: boolean;
  // title: string;
  mountedOnBody?: boolean;
}
const visible = ref(false);
const title = ref("");

const selectedValue: any = ref("");
const options = [
  { value: "option1", label: "2021" },
  { value: "option2", label: "2022" },
  { value: "option3", label: "2023" },
  { value: "option31", label: "2024" },
  { value: "option32", label: "2025" },
  { value: "option33", label: "2026" },
  { value: "option34", label: "2027" },
];

const props = defineProps<ModalProps>();

function openModal(titleval: any) {
  title.value = titleval;
  visible.value = true;
}
function closeModal() {
  visible.value = false;
}

defineExpose({
  openModal,
  closeModal
});
</script>
<style scoped>
.modal_title_wrap {
  flex: 1; display: flex; justify-content: center; align-items: center;
  font-size: 22px;
  font-weight: 600;
  background: url("src/assets/bgpng/弹框头部两边箭头.png");
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
}
.modal_header {
  margin-top: 23px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: url("src/assets/bgpng/弹框头部bg.png");
  background-repeat: round;
}

.close_btn {
  width: 24px;
  height: 24px;
  background: url("src/assets/bgpng/关闭icon.png");
  background-repeat: round;
  cursor: pointer;

}
.close-btn {
  font-size: 20px;
  font-weight: bold;
  color: #999;
  background: none;
  border: none;
  cursor: pointer;
}
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 300%;
  height: 300%;
  transform: translate(-20%, -140px);
  background-color: rgba(0, 0, 0, 0.5);
}
.modal_wrapper {user-select: none;
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.5); */
  top: 0;
  /* top: 60px; */
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 3;
}

.modal_container {
  display: flex;
  flex-direction: column;
  /* border: 4px solid #4890f8a1; */
  background: url("src/assets/bgpng/弹框bg.png");
  /* background: url("@/assets/img/bg.jpg"); */
  background-repeat: round;
  /* border-radius: 8px; */
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33); */
  width: 80%;
  height: 80%;
  position: relative;
}


.modal_body {
  padding: 36px;
  padding-top: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid #e5e5e5;
}


</style>

<style lang="scss" scoped>
:deep(.el-select__wrapper) {
  background-color: #0d60dea8;
}
</style>
<style lang="scss" scoped>
// .content_wrapper {
//   width: 100%;
//   height: 100%;
//   box-sizing: border-box;
//   background-image: url("@/assets/img/wholebg.jpg");
//   background-size: cover;
//   background-position: center center;
// }
// .cusmodal_content_wrap {
//   width: 100%;
//   height: 100%;
//   padding: 0px 16px 16px 16px;
//   box-sizing: border-box;
//   background: url("src/assets/bgpng/masklayer.png");
//   background-size: cover;
//   background-position: center center;
// }
</style>