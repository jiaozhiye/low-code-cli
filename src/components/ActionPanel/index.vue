<template>
  <div class="action-panel">
    <div class="scroll">
      <qm-tabs v-model="tabName" size="medium" tabCustomClass="action-tabs" :lazyLoad="false">
        <qm-tab-pane label="组件属性" name="property">
          <div class="content">
            <PropertySetting />
          </div>
        </qm-tab-pane>
        <qm-tab-pane label="数据源" name="dataSource">
          <div class="content">
            <DataSourceSetting />
          </div>
        </qm-tab-pane>
      </qm-tabs>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import PropertySetting from '../PropertySetting';
import DataSourceSetting from '../DataSourceSetting';

export default defineComponent({
  name: 'ActionPanel',
  components: { PropertySetting, DataSourceSetting },
  data() {
    return {
      tabName: 'property',
    };
  },
});
</script>

<style lang="scss" scoped>
.action-panel {
  flex: 1;
  height: 100%;
  background-color: #fff;
  .scroll {
    width: 240px;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
  }
  :deep(.action-tabs) {
    .el-tabs__nav {
      margin-left: $modulePadding;
    }
    .content {
      padding: 0 $modulePadding $modulePadding;
    }
  }
}
</style>
