<template>
  <div class="adaptive-select" :style="{width: width}">
    <div class="select-header" @click="toggleDropdown">
      <span>{{ selectedOption ? selectedOption.label : placeholder }}</span>
      <i class="arrow-icon" :class="{ 'arrow-up': isOpen }"></i>
    </div>
    <transition name="fade">
      <ul v-if="isOpen" class="options-list">
        <li
          v-for="option in options"
          :key="option.value"
          @click="selectOption(option)"
          :class="{ 'selected': option.value === selectedOption?.value }"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch  } from 'vue';

const props = defineProps({
  width: {
    type: String,
    default: '64px'
  },
  options: {
    type: Array,
    required: true
  },
  placeholder: {
    type: String,
    default: '请选择'
  },
  modelValue: {
    type: [String, Number],
    default: ''
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const selectedOption = ref(null);
const containerStyle = ref({});

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option) => {
  selectedOption.value = option;
  emit('update:modelValue', option.value);
  isOpen.value = false;
};

const updateSize = () => {
  const vw = window.innerWidth / 100;
  // containerStyle.value = {
  //   fontSize: `${1.5 * vw}px`,
  //   width: `${20 * vw}px`
  // };
};

onMounted(() => {
  updateSize();
  window.addEventListener('resize', updateSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateSize);
});

// 监听modelValue的变化
watch(() => props.modelValue, (newValue) => {
  selectedOption.value = props.options.find(option => option.value === newValue) || null;
}, { immediate: true });
</script>

<style scoped>
.adaptive-select {
  position: relative;
  user-select: none;font-size: 10px; z-index: 9999;background: #2973cf;
}

.select-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5em 1em;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.3em;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-header:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.arrow-icon {
  border: solid #fff;
  border-width: 0 2px 2px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

.arrow-icon.arrow-up {
  transform: rotate(-135deg);
}

.options-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 0.5em;
  padding: 0;
  list-style: none;
  background-color: rgba(74, 125, 245, 0.749);
  /* background-color: rgba(0, 0, 0, 0.8); */
  border-radius: 0.3em;
  overflow: hidden;
  z-index: 1000;
}

.options-list li {
  padding: 0.5em 1em;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.options-list li:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.options-list li.selected {
  background-color: rgba(255, 255, 255, 0.2);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>