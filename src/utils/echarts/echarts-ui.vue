<script setup lang="ts">
interface Props {
  height?: string;
  width?: string;
}

withDefaults(defineProps<Props>(), {
  height: '100%',
  width: '100%',
});
</script>

<template>
  <div :style="{ height: '100%', width }">
    <div v-bind="$attrs" :style="{ height: '100%', width }"></div>
  </div>
</template>
