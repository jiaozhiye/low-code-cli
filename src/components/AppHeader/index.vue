<template>
  <div class="app-header">
    <div class="logo">
      <router-link to="/home" :title="title">{{ title }}</router-link>
    </div>
    <div class="nav">
      <ul class="clearfix">
        <li>
          <router-link to="/layout">布局</router-link>
        </li>
        <li>
          <router-link to="/print">打印</router-link>
        </li>
      </ul>
    </div>
    <div class="setting">
      <ScreenFull />
      <DisplayClock />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import config from '@/config';

import ScreenFull from '@/layout/modules/ScreenFull';
import DisplayClock from '../DisplayClock';

export default defineComponent({
  name: 'AppHeader',
  components: { ScreenFull, DisplayClock },
  data() {
    return {};
  },
  computed: {
    title() {
      return config.title;
    },
  },
});
</script>

<style lang="scss" scoped>
.app-header {
  height: 50px;
  padding: 0 15px;
  display: flex;
  background-color: $headerBgColor;
  .logo {
    width: 200px;
    line-height: 50px;
    font-size: 20px;
    a {
      color: $primaryColor;
    }
  }
  .nav {
    flex: 1;
    ul li {
      float: left;
      a {
        display: block;
        line-height: 50px;
        padding: 0 20px;
        color: rgba(255, 255, 255, 0.65);
        &.router-link-active {
          color: #fff;
          background-color: $primaryColor;
        }
      }
    }
  }
  .setting {
    height: 100%;
    display: flex;
    align-items: center;
    column-gap: 10px;
    :deep(.header__screen-full) {
      .iconfont {
        color: #fff;
      }
    }
    :deep(.clock-wrapper) {
      color: #fff;
    }
  }
}
</style>
