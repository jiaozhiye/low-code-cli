/*
 * @Author: 焦质晔
 * @Date: 2021-10-01 19:12:19
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-01 19:31:08
 */
export default {
  beforeCreate() {
    this.commonFormItemList = [
      {
        type: 'INPUT',
        label: '标签名称',
        fieldName: 'label',
        onChange: () => this.createFormItem(),
      },
    ];
  },
};
