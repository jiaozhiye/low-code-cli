<template>
  <div class="side-bar">
    <ul>
      <li
        v-for="(item, index) in list"
        :key="item.label"
        :class="{ actived: index === current }"
        @click="toggleHandle(index)"
      >
        {{ item.label }}
      </li>
    </ul>
  </div>
  <div class="component-list" :style="styles">
    <div class="scroll">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="tab-item"
        :style="{ display: index === current ? 'block' : 'none' }"
      >
        <component :is="item.component" />
      </div>
    </div>
    <i
      class="arrow"
      :class="[!collapse ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right']"
      @click="clickHandle"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';

import FormArea from '@/components/FormArea';
import TableArea from '@/components/TableArea';

export default defineComponent({
  name: 'SideBar',
  components: { FormArea, TableArea },
  data() {
    this.list = [
      {
        label: '表单',
        component: FormArea,
      },
      {
        label: '表格',
        component: TableArea,
      },
    ];
    return {
      collapse: false,
      current: 0,
    };
  },
  computed: {
    styles() {
      return { width: !this.collapse ? '240px' : '0px' };
    },
  },
  methods: {
    clickHandle() {
      this.collapse = !this.collapse;
    },
    toggleHandle(index) {
      this.current = index;
    },
  },
});
</script>

<style lang="scss" scoped>
.side-bar {
  width: 60px;
  height: 100%;
  color: rgba(255, 255, 255, 0.65);
  background-color: $headerBgColor;
  ul li {
    line-height: 40px;
    text-align: right;
    padding-right: 10px;
    position: relative;
    cursor: pointer;
    &.actived {
      color: #fff;
      &::after {
        content: '';
        position: absolute;
        left: 0px;
        height: 100%;
        width: 3px;
        background-color: $primaryColor;
      }
    }
  }
}
.component-list {
  height: 100%;
  position: relative;
  border-right: 1px solid $borderColor;
  background-color: $backgroundColor;
  transition: width 0.3s ease;
  .scroll {
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .tab-item {
      padding: $modulePadding;
      width: 240px;
      box-sizing: border-box;
    }
  }
  .arrow {
    position: absolute;
    right: -14px;
    top: 48%;
    width: 14px;
    height: 30px;
    border: 1px solid $borderColor;
    border-left-color: $backgroundColor;
    border-top-right-radius: $borderRadius;
    border-bottom-right-radius: $borderRadius;
    background-color: $backgroundColor;
    text-align: center;
    line-height: 30px;
    font-size: $textSizeSecondary;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.3s ease;
  }
}
</style>
