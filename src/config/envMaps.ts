/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 21:03:36
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-09-13 21:12:30
 */
import envConf from '../../config/env.conf';

type IEnvCongig = Record<'dev' | 'tst' | 'uat' | 'pre' | 'prod' | 'gray', Record<string, string>>;

const env: string = process.env.ENV_CONFIG || 'prod';

const config: IEnvCongig = {
  dev: {
    domain: '',
  },
  tst: {
    domain: '',
  },
  uat: {
    domain: '',
  },
  pre: {
    domain: '',
  },
  prod: {
    domain: '',
  },
  gray: {
    domain: '', // 与 prod 生产环境一致
  },
};

export default Object.assign({}, config[env], envConf);
