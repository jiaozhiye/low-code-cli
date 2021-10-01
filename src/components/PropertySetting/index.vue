<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import Form from './Form';
import Input from './Input';

export default defineComponent({
  name: 'PropertySetting',
  computed: {
    ...mapState('editer', ['current']),
    id() {
      return this.current.id;
    },
  },
  methods: {
    FormRender() {
      return <Form id={this.id} />;
    },
    INPUTRender() {
      return <Input id={this.id} fieldName={this.current.fieldName} />;
    },
    emptyRender() {
      return <qm-empty style="margin-top: 20vh;" />;
    },
  },
  render() {
    const { name } = this.current;
    return <>{name ? this[`${name}Render`]() : this.emptyRender()}</>;
  },
});
</script>

<style lang="scss" scoped></style>
