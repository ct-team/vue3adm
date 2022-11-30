import { ElMessage } from 'element-plus';
import type { messageType } from 'element-plus';
import dayjs from 'dayjs';
import { create, all } from 'mathjs';
import _ from 'lodash';
export const showMessage = (msg: string, type?: messageType): void => {
  ElMessage({
    message: msg || 'error',
    type: type || 'error',
  });
};

export const dayjsValueOf = (time: Date): any => {
  return dayjs(time).valueOf();
};
export const dayjsFormat = (time: Date, str: any): any => {
  return dayjs(time).format(str);
};

export const clearEmptyData = (data: any): any => {
  const result: any = {};
  if (!_.isPlainObject(data)) {
    return data;
  }
  _.forEach(data, (value, key) => {
    if (value !== '') {
      result[key] = value;
    }
  });
  return result;
};
export const toFixed = (num: number, point: number): number => {
  let n = num.toFixed(point + 1);
  n = n.substring(0, n.length - 1);
  console.log(n);
  return Number(n);
};

const config: any = {
  epsilon: 1e-12,
  matrix: 'Matrix',
  number: 'BigNumber', // 可选值：number BigNumber
  precision: 64,
  predictable: false,
  randomSeed: null,
};
const math = create(all, config);
export const mathjs = math;
