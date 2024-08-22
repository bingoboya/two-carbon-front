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
            <el-select
            class="custom-select" 
              v-model="dataValue"
              placeholder="Select"
              size="small"
              style="width: 80px"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
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
import { ref, defineProps} from "vue";

interface ModalProps {
  // visible: boolean;
  // title: string;
  mountedOnBody?: boolean;
}
const visible = ref(false);
const title = ref("");

const props = defineProps<ModalProps>();
const dataValue = ref("");

const options = [
  {
    value: "Option1",
    label: "2021年",
  },
  {
    value: "Option2",
    label: "2022年",
  },
  {
    value: "Option3",
    label: "2023年",
  },
  {
    value: "Option4",
    label: "2024年",
  },
  {
    value: "Option5",
    label: "2025年",
  },
];

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
  padding: 20px;width: 1000px; height: 600px;
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