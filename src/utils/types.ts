/*
 * @Author: 焦质晔
 * @Date: 2021-02-12 14:26:46
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-06-14 06:50:56
 */
import type { VNode } from 'vue';

export type Nullable<T> = T | null;

export type ValueOf<T> = T[keyof T];

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, unknown> ? DeepPartial<T[P]> : T[P];
};

export type JSXNode = VNode | JSX.Element;

export type AnyObject<T> = { [key: string]: T };

export type AnyFunction<T> = (...args: any[]) => T;

export type CustomizedHTMLElement<T> = HTMLElement & T;

export type ComponentSize = 'large' | 'medium' | 'small';

export type Language = 'en' | 'zh-cn';

export enum SizeEnum {
  large = 'medium',
  medium = 'small',
  small = 'mini',
}

export type Dictionary = {
  text: string;
  value: string | number;
  stoped?: boolean;
  disabled?: boolean;
};

export type DeepDictionary = Dictionary & {
  children?: Array<DeepDictionary> | Nullable<undefined>;
};
