<template>
  <div class="nature-space">
    <div class="scroll">
      <div style="height: 1000px">asdasdasdasdasd asdasdasdsd asdasdasda asdasdasd</div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NatureSpace',
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.nature-space {
  flex: 1;
  height: 100%;
  background-color: #fff;
  .scroll {
    width: 240px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
