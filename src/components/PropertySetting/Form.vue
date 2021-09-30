<template>
  <div>
    <qm-form ref="form" :list="formList" :initialValue="initialValue" :labelWidth="66" :cols="1" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import omit from 'omit.js';

import { dictionary } from '@/mixins/dictMixin'; // 数据字典

export default defineComponent({
  name: 'Form',
  props: ['id'],
  mixins: [dictionary],
  computed: {
    ...mapState('editer', ['formPanelList']),
    formParams() {
      return omit(
        this.formPanelList.find((x) => x.id === this.id),
        ['id', 'name']
      );
    },
  },
  data() {
    return {
      formList: this.createFormList(),
      initialValue: this.formParams,
    };
  },
  methods: {
    ...mapActions('editer', ['setFormPanel']),
    createFormList() {
      return [
        {
          type: 'SELECT',
          label: '类型',
          fieldName: 'formType',
          options: {
            itemList: this.createDictList('formType'),
          },
          onChange: () => this.createFormPanel(),
        },
      ];
    },
    async createFormPanel() {
      const [err, res] = await this.$refs[`form`].GET_FORM_DATA();
      if (err) return;
      const result = Object.assign(
        {},
        this.formPanelList.find((x) => x.id === this.id),
        res
      );
      this.setFormPanel({ id: this.id, data: result });
    },
  },
});
</script>

<style lang="scss" scoped></style>
