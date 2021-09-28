<template>
  <div class="action-bar">asd</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ActionBar',
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.action-bar {
  width: 40px;
  height: 100%;
  flex-shrink: 0;
  border-right: 1px solid $borderColor;
}
</style>
