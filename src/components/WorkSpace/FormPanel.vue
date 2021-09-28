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
      console.log(1234);
      return this.formPanelList.find((x) => x.id === this.id).list || [];
    },
  },
  methods: {
    ...mapActions('editer', ['createFormItemList']),
  },
  mounted() {
    const $dom = this.$refs['form-wrap'].querySelector('.qm-form .el-row');
    this.sortable = new Sortable($dom, {
      group: 'form-panel',
      animation: 150,
      onEnd: (ev) => {
        console.log(123, this.list);
        const _list = [...this.list];
        const item = _list[ev.oldIndex];
        // 0, 1, 2, 3
        // 0, 2, 1, 3
        // const result = [];
        // this.list.forEach((x, i) => {
        //   result
        // })
        // const item = _list[ev.oldIndex];
        // _list.splice(ev.oldIndex, 1)
        // _list.splice(ev.oldIndex, 1, item)
        // console.log(123, ev);
        // 前 -> 后
        if (ev.newIndex > ev.oldIndex) {
          _list.splice(ev.newIndex, 0, item);
          _list.splice(ev.oldIndex, 1);
        }
        // 后 -> 前
        if (ev.newIndex < ev.oldIndex) {
          _list.splice(ev.oldIndex, 1);
          _list.splice(ev.newIndex, 0, item);
        }
        this.createFormItemList({ id: this.id, list: _list });
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
.wrapper {
  :deep(.el-row) {
    min-height: 30px;
  }
}
</style>
