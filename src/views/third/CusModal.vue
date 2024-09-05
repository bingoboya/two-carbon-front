<template>
  <Teleport v-if="mountedOnBody" to="body">
    <div class="modal-wrapper" v-if="visible" @click.self="closeModal">
      <div class="modal-container">
        <div class="modal-header">
          <h3>{{ title }}</h3>
          <button class="close-btn" @click="closeModal">×</button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </Teleport>
  <div v-if="visible" class="modal-wrapper" @click.self="closeModal">
    <div class="modal-container" style="border: 4px solid #4890f8a1">
      <div class="modal-header" style="position: relative">
        <div
          style="
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          "
        >
          <h3>{{ title }}</h3>
        </div>
        <div
          style="
            display: flex;
            gap: 16px;
            position: absolute;
            right: 12px;
            flex-direction: row;
            align-items: center;
          "
        >
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
      <div class="modal-body">
        <slot name="content"></slot>
      </div>
      <!-- <div class="modal-footer">
        <slot name="footer"></slot>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from "vue";
import CusTomSelect from "./CusTomSelect.vue";

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
const dataValue = ref("");

function openModal(titleval: any) {
  title.value = titleval;
  visible.value = true;
}
function closeModal() {
  visible.value = false;
}
const methods = {
  openModal,
  closeModal,
};

defineExpose({
  methods,
});
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index: 9999;
}

.modal-container {
  background: url("@/assets/img/bg.jpg");
  /* background-color: white; */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  max-width: 90%;

  /* width: 600px; */
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #e5e5e5;
}

.modal-body {
  padding: 10px;
  width: 1400px;
  height: 740px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: 1px solid #e5e5e5;
}

.close-btn {
  font-size: 20px;
  font-weight: bold;
  color: #999;
  background: none;
  border: none;
  cursor: pointer;
}
</style>

<style lang="scss" scoped>
:deep(.el-select__wrapper) {
  background-color: #0d60dea8;
}
</style>
