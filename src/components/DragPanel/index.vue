<template>
  <div class="drag-panel">
    <slot />
    <span class="icon move-handle" title="拖动">
      <i class="el-icon-rank" />
    </span>
    <span class="icon remove-handle" title="移除">
      <i class="el-icon-delete" />
    </span>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DragPanel',
});
</script>

<style lang="scss" scoped>
.drag-panel {
  padding: 5px;
  border: 1px dashed $borderColor;
  margin-bottom: 5px;
  position: relative;
  box-sizing: border-box;
  &:hover {
    .icon {
      display: block;
    }
  }
  .icon {
    display: none;
    position: absolute;
    width: 22px;
    height: 22px;
    bottom: -12px;
    text-align: center;
    line-height: 22px;
    border: 1px solid $borderColorSecondary;
    border-radius: 50%;
    background-color: #fff;
    cursor: pointer;
    z-index: 2;
    box-sizing: border-box;
  }
  .move-handle {
    right: 40px;
  }
  .remove-handle {
    right: 10px;
    color: $errorColor;
    border-color: $errorColor;
  }
}
</style>
