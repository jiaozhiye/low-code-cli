<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import addEventListener from 'add-dom-event-listener';
import { getParentNode, contains } from '@/utils';

import Sortable from 'sortablejs';

export default defineComponent({
  name: 'FormPanel',
  props: ['id'],
  data() {
    this.sortable = null;
    return {};
  },
  computed: {
    ...mapState('editer', ['formPanelList']),
    list() {
      return this.formPanelList.find((x) => x.id === this.id).list || [];
    },
  },
  methods: {
    ...mapActions('editer', ['createFormItemList']),
    sortableHandle($dom) {
      this.sortable = new Sortable($dom, {
        group: 'form-panel',
        filter: '.btns',
        animation: 150,
        onEnd: (ev) => {
          const _list = [...this.list];
          // **** 重要 ****
          if (!ev.pullMode) {
            _list.splice(ev.newIndex, 0, _list.splice(ev.oldIndex, 1)[0]);
          }
          this.createFormItemList({ id: this.id, list: [] });
          // **************
          this.$nextTick(() => this.createFormItemList({ id: this.id, list: _list }));
        },
      });
    },
    clickHandle(ev) {
      ev.stopPropagation();
      const $target = getParentNode(ev.target, 'el-col');
      if ($target && contains($target, ev.currentTarget)) {
        const fieldName = $target.id;
        console.log(123, this.id, fieldName);
      }
    },
    bindEvent($dom) {
      this.clickEvent = addEventListener($dom, 'click', this.clickHandle);
    },
  },
  mounted() {
    const $elRow = this.$refs['form-wrap'].querySelector('.qm-form .el-row');
    this.sortableHandle($elRow);
    this.bindEvent($elRow);
  },
  beforeUnmount() {
    this.sortable?.destroy();
    this.clickEvent?.remove();
  },
  render() {
    const { id, list } = this;
    return (
      <div ref="form-wrap" class="form-wrapper" id={id}>
        <qm-form list={list} />
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.form-wrapper {
  margin-bottom: -12px;
  :deep(.el-row) {
    min-height: 44px;
    .form-item {
      line-height: 32px;
      margin-left: 20px;
    }
  }
}
</style>
