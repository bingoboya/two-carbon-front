

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
  color: #31abe3;
  text-align: center;
  background-image: url('@/assets/img/item_wrap_top_bg.png');
  background-repeat: round;
  background-size: cover;
  position: relative;
  display: flex;
  align-items: center;

  .zuo,
  .you {
    width: 58px;
    height: 14px;
    background-image: url("@/assets/img/titles/zuo.png");
  }

  .you {
    transform: rotate(180deg);
  }
  .title-inner {
    font-weight: 900;
    letter-spacing: 2px;
    background: linear-gradient(
      0deg,
      rgb(245, 246, 247) 0%,
      #ebebeb 48.8525390625%,
      #01aaff 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
