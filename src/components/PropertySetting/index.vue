<script>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';

import Form from './Form';
import FormItem from './FormItem';

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
    formItemRender(name) {
      return (
        <FormItem
          key={`${this.id}_${this.current.fieldName}`}
          id={this.id}
          fieldName={this.current.fieldName}
          type={name}
        />
      );
    },
    emptyRender() {
      return <qm-empty style="margin-top: 20vh;" />;
    },
  },
  render() {
    const { name } = this.current;
    if (name === 'Form') {
      return this.FormRender();
    }
    return <>{name ? this.formItemRender(name) : this.emptyRender()}</>;
  },
});
</script>

<style lang="scss" scoped></style>
