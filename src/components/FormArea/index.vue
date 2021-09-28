<template>
  <h5 class="divider">表单组件</h5>
  <Draggable
    class="content"
    :list="formPanelTemplate"
    item-key="name"
    :group="{ name: 'workspace', pull: 'clone', put: false }"
    :clone="cloneHandle"
    :sort="false"
  >
    <template #item="{ element }">
      <div :data-name="element.name" class="form-panel">
        <FormSvg />
      </div>
    </template>
  </Draggable>
  <h5 class="divider">表单类型</h5>
  <Draggable
    class="content form-item-list"
    :list="formItemTemplate"
    item-key="type"
    :group="{ name: 'form-panel', pull: 'clone', put: false }"
    :sort="false"
    :onEnd="endHandle"
  >
    <template #item="{ element }">
      <div :data-name="element.type" class="form-item">
        {{ element.label }}
      </div>
    </template>
  </Draggable>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { createUidKey, getParentNode } from '@/utils';

import Draggable from 'vuedraggable';
import FormSvg from '../SvgIcon/form.vue';

export default defineComponent({
  name: 'FormArea',
  components: { Draggable, FormSvg },
  computed: {
    ...mapState('editer', ['formPanelTemplate', 'formItemTemplate', 'formPanelList']),
  },
  methods: {
    ...mapActions('editer', ['createFormItemList']),
    cloneHandle(formPanel) {
      return {
        id: createUidKey(),
        ...formPanel,
        list: [],
      };
    },
    endHandle(ev) {
      const $to = ev.to;
      if (!$to.classList.contains('el-row')) return;
      const _id = getParentNode($to, 'form-wrapper').id;
      if (!_id) return;
      const _list = [...this.formPanelList.find((x) => x.id === _id).list];
      _list.splice(
        ev.newIndex,
        0,
        Object.assign({}, this.formItemTemplate[ev.oldIndex], { fieldName: createUidKey() })
      );
      this.createFormItemList({ id: _id, list: _list });
    },
  },
});
</script>

<style lang="scss" scoped>
.divider {
  line-height: 1.5;
  position: relative;
  padding-left: 12px;
  font-size: $textSize;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    height: 100%;
    width: 5px;
    background-color: $primaryColor;
    border-radius: 1px;
  }
}
.content {
  display: flex;
  padding: $modulePadding 0;
  .form-panel {
    padding: $modulePadding;
    border: 1px dashed $borderColor;
    background-color: #fff;
    cursor: move;
    box-sizing: border-box;
  }
}
.form-item-list {
  gap: 10px;
  .form-item {
    width: 50%;
    line-height: 1.5;
    padding: 5px;
    border: 1px dashed $borderColor;
    background-color: #fff;
    cursor: move;
    box-sizing: border-box;
  }
}
</style>
