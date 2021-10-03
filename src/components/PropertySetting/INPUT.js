/*
 * @Author: 焦质晔
 * @Date: 2021-10-03 10:18:45
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-03 10:57:08
 */
export default {
  createINPUT() {
    return [
      {
        type: 'INPUT_NUMBER',
        label: '最大长度',
        fieldName: 'options.maxlength',
        onChange: () => this.createFormItem(),
      },
      {
        type: 'CHECKBOX',
        label: '字数统计',
        fieldName: 'options.showLimit',
        options: {
          trueValue: '#1',
          falseValue: '#0',
        },
        onChange: () => this.createFormItem(),
      },
    ];
  },
};
