<template>
  <el-dropdown class="header__help-doc" trigger="click" placement="bottom-start">
    <i class="iconfont icon-question-circle" />
    <template v-slot:dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>{{ $t('app.helperDoc.helpDoc') }}</el-dropdown-item>
        <el-dropdown-item>{{ $t('app.helperDoc.useManual') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
/*
 * @Author: 焦质晔
 * @Date: 2020-04-30 15:17:48
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-29 09:55:44
 */
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

export default defineComponent({
  name: 'HelperDoc',
});
</script>

<style lang="scss">
.header__help-doc {
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  .icon-question-circle {
    color: $textColorSecondary;
    font-size: 21px;
    cursor: pointer;
  }
}
</style>
