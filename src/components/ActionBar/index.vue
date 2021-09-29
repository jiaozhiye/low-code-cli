<template>
  <div class="action-bar">
    <ul>
      <el-tooltip effect="dark" content="撤销" placement="left">
        <li>
          <i class="lc-iconfont lc-icon-ios-undo" />
        </li>
      </el-tooltip>
      <el-tooltip effect="dark" content="重做" placement="left">
        <li>
          <i class="lc-iconfont lc-icon-ios-redo" />
        </li>
      </el-tooltip>
      <el-tooltip effect="dark" content="预览" placement="left">
        <li>
          <i class="lc-iconfont lc-icon-yulan" />
        </li>
      </el-tooltip>
      <el-tooltip effect="dark" content="清空" placement="left">
        <li>
          <i class="lc-iconfont lc-icon-empty" />
        </li>
      </el-tooltip>
      <el-tooltip effect="dark" content="保存" placement="left">
        <li>
          <i class="lc-iconfont lc-icon-baocun" />
        </li>
      </el-tooltip>
      <el-tooltip effect="dark" content="生成代码" placement="left">
        <li>
          <i class="lc-iconfont lc-icon-code" />
        </li>
      </el-tooltip>
    </ul>
  </div>
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
  box-sizing: border-box;
  ul li {
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      color: $primaryColor;
      background-color: rgba(0, 0, 0, 0.1);
    }
    i {
      font-size: 20px;
    }
  }
}
</style>
