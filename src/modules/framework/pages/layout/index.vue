<template>
  <div class="wrapper">
    <SIdeBar />
    <WorkSpace />
    <Setting />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import SIdeBar from '@/components/SideBar';
import WorkSpace from '@/components/WorkSpace';
import Setting from '@/components/Setting';

export default defineComponent({
  name: 'Layout',
  components: { SIdeBar, WorkSpace, Setting },
});
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  height: 100%;
}
</style>
