<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import omit from 'omit.js';
import addEventListener from 'add-dom-event-listener';
import { getParentNode, contains } from '@/utils';

import Sortable from 'sortablejs';

export default defineComponent({
  name: 'FormPanel',
  props: ['id'],
  data() {
    this.$formWrap = null;
    this.$elRow = null;
    this.sortable = null;
    return {};
  },
  computed: {
    ...mapState('editer', ['formPanelList', 'current']),
    list() {
      return this.formPanelList.find((x) => x.id === this.id).list || [];
    },
    formParams() {
      return omit(
        this.formPanelList.find((x) => x.id === this.id),
        ['id', 'name']
      );
    },
  },
  watch: {
    current(next) {
      this.$nextTick(() => {
        this.clearHandle();
        this.createAvtive(next);
      });
    },
  },
  methods: {
    ...mapActions('editer', ['createFormItemList', 'createCurrentAction']),
    sortableHandle() {
      this.sortable = new Sortable(this.$elRow, {
        group: 'form-panel',
        filter: '.col-button',
        animation: 150,
        onEnd: (ev) => {
          const _list = [...this.list];
          // **** 重要 ****
          if (!ev.pullMode) {
            _list.splice(ev.newIndex, 0, _list.splice(ev.oldIndex, 1)[0]);
          }
          this.createFormItemList({ id: this.id, list: [] });
          // **************
          this.$nextTick(() => this.createFormItemList({ id: this.id, list: _list })).then(() =>
            this.createAvtive(this.current)
          );
        },
      });
    },
    createAvtive({ id, name, itemId }) {
      if (id === this.id && !itemId) {
        return this.$formWrap.classList.add('actived');
      }
      const item = this.list.find((x) => x.itemId === itemId);
      if (item?.type === name) {
        Array.from(this.$elRow.children)
          .find((x) => x.id === item.fieldName)
          .classList.add('actived');
      }
    },
    clearHandle() {
      const $allCols = this.$elRow.children;
      for (let i = 0; i < $allCols.length; i++) {
        $allCols[i].classList.remove('actived');
      }
      this.$formWrap.classList.remove('actived');
    },
    getDoms() {
      this.$formWrap = this.$refs['form-wrap'];
      this.$elRow = this.$formWrap.querySelector('.qm-form .el-row');
    },
    clickHandle(ev) {
      ev.stopPropagation();
      const $target = getParentNode(ev.target, 'el-col');
      if ($target && contains($target, ev.currentTarget)) {
        const fieldName = $target.id;
        if (fieldName) {
          const { type, itemId } = this.list.find((x) => x.fieldName === fieldName);
          this.createCurrentAction({ id: this.id, name: type, itemId });
        }
      }
    },
    dbClickHandle() {
      this.createCurrentAction({ id: this.id, name: 'Form', itemId: '' });
    },
    bindEvent() {
      this.dbClickEvent = addEventListener(this.$formWrap, 'dblclick', this.dbClickHandle);
      this.clickEvent = addEventListener(this.$elRow, 'click', this.clickHandle);
    },
  },
  mounted() {
    this.getDoms();
    this.sortableHandle();
    this.bindEvent();
  },
  beforeUnmount() {
    this.sortable?.destroy();
    this.dbClickEvent?.remove();
    this.clickEvent?.remove();
    this.$formWrap = null;
    this.$elRow = null;
    this.sortable = null;
  },
  render() {
    const { id, formParams } = this;
    return (
      <div ref="form-wrap" class="form-wrapper" id={id}>
        <div style="margin-bottom: -12px;">
          <qm-form {...formParams} />
        </div>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.form-wrapper {
  overflow: hidden;
  &.actived {
    background-color: $backgroundColor;
  }
  :deep(.el-row) {
    min-height: 44px;
    .form-item {
      line-height: 32px;
      margin-left: 20px;
    }
    .el-col.actived {
      background-color: $backgroundColor;
    }
  }
}
</style>
