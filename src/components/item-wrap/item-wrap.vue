

<template>
  <BorderBox13>
    <div class="item_title" v-if="title !== ''">
      <div class="title-inner"> &nbsp;&nbsp;{{ title }}&nbsp;&nbsp; </div>
    </div>
    <div style="flex:1; width: 100%;padding: 12px;">
      <slot></slot>
    </div>
  </BorderBox13>
</template>
<script setup lang="ts">
import BorderBox13 from "@/components/datav/border-box-13";

const props = withDefaults(
  defineProps<{
    // 标题
    title: number | string;
  }>(),
  {
    title: "",
  }
);
</script>
<style scoped lang="scss">
$item-title-height: 46px;
$item_title_content-height: calc(100% - 46px);

.item_title {
  font-size: 20px;
  height: $item-title-height;
  line-height: $item-title-height;
  width: 100%;
  // color: #31abe3;
  text-align: center;
  background-image: url('@/assets/img/item_wrap_top_bg.png');
  background-repeat: round;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;
}
</style>
