<template>
  <div class="app-main">
    <slot />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppMain',
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.app-main {
  flex: 1;
  height: 0;
}
</style>
