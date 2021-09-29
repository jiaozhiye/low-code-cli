<template>
  <div class="setting" :style="styles">
    <ActionBar />
    <ActionPanel />
    <i
      class="arrow"
      :class="[!collapse ? 'el-icon-d-arrow-right' : 'el-icon-d-arrow-left']"
      @click="clickHandle"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import ActionBar from '../ActionBar';
import ActionPanel from '../ActionPanel';

export default defineComponent({
  name: 'Setting',
  components: { ActionBar, ActionPanel },
  data() {
    return {
      collapse: false,
    };
  },
  computed: {
    styles() {
      return { width: !this.collapse ? '280px' : '40px' };
    },
  },
  methods: {
    clickHandle() {
      this.collapse = !this.collapse;
    },
  },
});
</script>

<style lang="scss" scoped>
.setting {
  height: 100%;
  position: relative;
  display: flex;
  border-left: 1px solid $borderColor;
  background-color: $backgroundColor;
  transition: width 0.3s ease;
  .arrow {
    position: absolute;
    left: -14px;
    top: 48%;
    width: 14px;
    height: 30px;
    border: 1px solid $borderColor;
    border-right-color: $backgroundColor;
    border-top-left-radius: $borderRadius;
    border-bottom-left-radius: $borderRadius;
    background-color: $backgroundColor;
    text-align: center;
    line-height: 30px;
    font-size: $textSizeSecondary;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }
}
</style>
