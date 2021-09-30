<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';

import Draggable from 'vuedraggable';
import DragPanel from '../DragPanel';
import FormPanel from './FormPanel.vue';

export default defineComponent({
  name: 'WorkSpace',
  computed: {
    ...mapState('editer', ['formPanelList']),
  },
  methods: {
    ...mapActions('editer', ['createFormPanelList']),
    FormRender(item) {
      return (
        <DragPanel>
          <FormPanel id={item.id} />
        </DragPanel>
      );
    },
  },
  render() {
    const { formPanelList } = this;

    const draggableProps = {
      class: 'container',
      modelValue: formPanelList,
      itemKey: 'id',
      group: 'workspace',
      handle: '.move-handle',
      animation: 200,
      'onUpdate:modelValue': (val) => {
        this.createFormPanelList(val);
      },
    };

    return (
      <div class="work-space">
        <Draggable
          {...draggableProps}
          v-slots={{
            item: ({ element }) => {
              return this[`${element.name}Render`]?.(element);
            },
          }}
        />
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.work-space {
  flex: 1;
  height: 100%;
  padding: $modulePadding;
  box-sizing: border-box;
  .container {
    height: 100%;
  }
}
</style>
