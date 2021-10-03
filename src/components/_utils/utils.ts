/*
 * @Author: 焦质晔
 * @Date: 2021-10-03 14:22:24
 * @Last Modified by: 焦质晔
 * @Last Modified time: 2021-10-03 15:10:25
 */
export const createFieldName = (): string => {
  return `field-${(+new Date()).toString().slice(-4)}`;
};
function generateFlattenMap(source) {
  const map: Map<string, any> = new Map();
  for (const [key, value] of Object.entries(source)) {
    if (typeof value === 'object') {
      const deepMap = generateFlattenMap(value);
      for (const [mapKey, mapValue] of deepMap.entries()) {
        map.set(`${key}.${mapKey}`, mapValue);
      }
    } else {
      map.set(key, value);
    }
  }

  return map;
}

export const flatJson = (jsonObject) => {
  const map = generateFlattenMap(jsonObject);

  const flatten: Record<string, any> = {};
  for (const [key, value] of map.entries()) {
    flatten[key] = value;
  }

  return flatten;
};
