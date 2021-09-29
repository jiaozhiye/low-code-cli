<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

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
  },
  mounted() {
    const $elRow = this.$refs['form-wrap'].querySelector('.qm-form .el-row');
    this.sortable = new Sortable($elRow, {
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
  beforeUnmount() {
    this.sortable?.destroy();
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
