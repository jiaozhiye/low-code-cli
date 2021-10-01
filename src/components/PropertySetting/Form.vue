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

const DEFAULT_VALUE = {
  formType: 'default',
  labelWidth: 80,
};

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
    initialValue() {
      return Object.assign({}, DEFAULT_VALUE, this.formParams);
    },
  },
  data() {
    return {
      formList: this.createFormList(),
    };
  },
  methods: {
    ...mapActions('editer', ['setFormPanel']),
    finedFormItem(fieldName) {
      return this.formList.find((x) => x.fieldName === fieldName);
    },
    createFormList() {
      return [
        {
          type: 'SELECT',
          label: '表单类型',
          fieldName: 'formType',
          options: {
            itemList: this.createDictList('formType'),
          },
          onChange: (val) => {
            if (val === 'search') {
              this.finedFormItem('uniqueKey').hidden = false;
            } else {
              this.finedFormItem('uniqueKey').hidden = true;
            }
            this.createFormPanel();
          },
        },
        {
          type: 'INPUT',
          label: '唯一键值',
          fieldName: 'uniqueKey',
          hidden: true,
          onChange: () => this.createFormPanel(),
        },
        {
          type: 'INPUT_NUMBER',
          label: '标签宽度',
          fieldName: 'labelWidth',
          descOptions: {
            content: 'px',
            style: {
              width: '30px',
            },
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
      // 处理数据
      for (const key in result) {
        if (result[key] === DEFAULT_VALUE[key]) {
          delete result[key];
        }
        if (result[key] === '') {
          delete result[key];
        }
      }
      this.setFormPanel({ id: this.id, data: result });
    },
  },
});
</script>

<style lang="scss" scoped></style>
