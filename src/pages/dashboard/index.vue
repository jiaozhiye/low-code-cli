<template>
  <div class="welcome">欢迎使用启明低代码平台</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Dashboard',
  data() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.welcome {
  padding-top: 35vh;
  text-align: center;
  font-size: 30px;
}
</style>
