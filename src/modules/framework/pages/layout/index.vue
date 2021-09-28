<template>
  <div class="wrapper">
    <SIdeBar />
    <WorkSpace />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import SIdeBar from '@/components/SideBar';
import WorkSpace from '@/components/WorkSpace';

export default defineComponent({
  name: 'Layout',
  components: { SIdeBar, WorkSpace },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
}
</style>
