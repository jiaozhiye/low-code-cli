<template>
  <div>
    <qm-form ref="form" :list="formList" :initialValue="initialValue" :labelWidth="66" :cols="1" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import omit from 'omit.js';
import commonMixin from './commonMixin';

import { dictionary } from '@/mixins/dictMixin'; // 数据字典

const DEFAULT_VALUE = {};

export default defineComponent({
  name: 'Input',
  props: ['id', 'fieldName'],
  mixins: [dictionary, commonMixin],
  computed: {
    ...mapState('editer', ['formPanelList']),
    formItem() {
      return this.formPanelList
        .find((x) => x.id === this.id)
        .list.find((x) => x.fieldName === this.fieldName);
    },
    formItemParams() {
      return omit(this.formItem, []);
    },
    initialValue() {
      return Object.assign({}, DEFAULT_VALUE, this.formItemParams);
    },
  },
  data() {
    return {
      formList: this.createFormList(),
    };
  },
  methods: {
    ...mapActions('editer', ['setFormItem']),
    finedFormItem(fieldName) {
      return this.formList.find((x) => x.fieldName === fieldName);
    },
    createFormList() {
      return [...this.commonFormItemList];
    },
    async createFormItem() {
      const [err, res] = await this.$refs[`form`].GET_FORM_DATA();
      if (err) return;
      const result = Object.assign({}, this.formItem, res);
      // 处理数据
      for (const key in result) {
        if (result[key] === DEFAULT_VALUE[key]) {
          delete result[key];
        }
        if (result[key] === '') {
          delete result[key];
        }
      }
      this.setFormItem({ id: this.id, data: result });
    },
  },
});
</script>

<style lang="scss" scoped></style>
