<template>
  <div>
    <h5 class="divider" style="margin-bottom: 8px">公共属性</h5>
    <qm-form ref="form" :list="formList" :initialValue="initialValue" :labelWidth="66" :cols="1" />
    <h5 class="divider" style="margin-bottom: 8px">私有属性</h5>
    <qm-form
      ref="form2"
      :list="formList2"
      :initialValue="initialValue2"
      :labelWidth="66"
      :cols="1"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import { set } from 'lodash-es';
import omit from 'omit.js';
import { dictionary } from '@/mixins/dictMixin'; // 数据字典

import INPUTMethods from './INPUT';

const DEFAULT_VALUE = {
  clearable: '#1',
};

export default defineComponent({
  name: 'FormItem',
  props: ['id', 'fieldName', 'type'],
  mixins: [dictionary],
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
      return omit(
        Object.assign({}, DEFAULT_VALUE, this.formItemParams),
        this.formList2.map((x) => x.fieldName.split('.')[0])
      );
    },
    initialValue2() {
      return omit(
        Object.assign({}, DEFAULT_VALUE, this.formItemParams),
        this.formList.map((x) => x.fieldName)
      );
    },
  },
  data() {
    return {
      formList: this.createFormList(),
      formList2: this.createFormList2(),
    };
  },
  methods: {
    ...mapActions('editer', ['setFormItem']),
    ...INPUTMethods,
    finedFormItem(fieldName) {
      return this.formList.find((x) => x.fieldName === fieldName);
    },
    createFormList() {
      return [
        {
          type: 'INPUT',
          label: '字段名',
          fieldName: 'fieldName',
          onChange: () => this.createFormItem(),
        },
        {
          type: 'INPUT',
          label: '标签名称',
          fieldName: 'label',
          onChange: () => this.createFormItem(),
        },
        {
          type: 'INPUT_NUMBER',
          label: '宽度',
          fieldName: 'labelWidth',
          descOptions: {
            content: 'px',
            style: {
              width: '30px',
            },
          },
          onChange: () => this.createFormItem(),
        },
        {
          type: 'INPUT',
          label: 'tooltip',
          fieldName: 'description',
          onChange: () => this.createFormItem(),
        },
        {
          type: 'INPUT',
          label: '占位文本',
          fieldName: 'placeholder',
          onChange: () => this.createFormItem(),
        },
        {
          type: 'CHECKBOX',
          label: '禁用',
          fieldName: 'disabled',
          options: {
            trueValue: '#1',
            falseValue: '#0',
          },
          onChange: () => this.createFormItem(),
        },
        {
          type: 'CHECKBOX',
          label: '只读',
          fieldName: 'readonly',
          options: {
            trueValue: '#1',
            falseValue: '#0',
          },
          onChange: () => this.createFormItem(),
        },
        {
          type: 'CHECKBOX',
          label: '可擦除',
          fieldName: 'clearable',
          options: {
            trueValue: '#1',
            falseValue: '#0',
          },
          onChange: () => this.createFormItem(),
        },
      ];
    },
    createFormList2() {
      return this[`create${this.type}`]();
    },
    formatFormData(formData) {
      const data = {};
      for (const key in formData) {
        if (formData[key] === DEFAULT_VALUE[key]) {
          continue;
        }
        if (formData[key] === '') {
          continue;
        }
        // 设置值
        set(data, key, formData[key]);
        // 处理特殊值
        if (formData[key] === '#1') {
          set(data, key, true);
        }
        if (formData[key] === '#0') {
          set(data, key, false);
        }
      }
      return data;
    },
    async createFormItem() {
      const [err, res] = await this.$refs[`form`].GET_FORM_DATA();
      const [err2, res2] = await this.$refs[`form2`].GET_FORM_DATA();
      const result = this.formatFormData(Object.assign({}, this.formItem, res, res2));
      this.setFormItem({ id: this.id, data: result });
    },
  },
});
</script>

<style lang="scss" scoped></style>
