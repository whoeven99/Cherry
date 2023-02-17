/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import * as _ from 'lodash';

export const toFlattenObject = (content: string): Record<string, string> => {
  let object: Record<string, unknown>;
  try {
    object = JSON.parse(content);
  } catch {
    try {
      object = JSON.parse(`{${content}}`);
    } catch {
      object = {};
    }
  }

  return flatten(object);
};

const flatten = (object: Record<string, unknown>): Record<string, string> => {
  const res: Record<string, string> = {};
  Object.keys(object).forEach(key => {
    if (typeof object[key] === 'string') {
      res[key] = object[key] as string;
    } else if (_.isPlainObject(object[key])) {
      const tmp = flatten(object[key] as Record<string, unknown>);
      Object.keys(tmp).forEach(tmpKey => {
        res[`${key}/${tmpKey}`] = tmp[tmpKey];
      });
    }
  });
  return res;
};

export const toLocalizationString = (record: Record<string, string>, delimiter = '/'): string => {
  const res: Record<string, unknown> = {};
  Object.keys(record).forEach(key => {
    const path = key.split(delimiter);
    if (path.length === 1) {
      res[path[0]] = record[key];
    } else {
      let cur = res;
      path.forEach((pathName, index) => {
        if (_.isEmpty(cur[pathName])) {
          cur[pathName] = {};
        }
        if (index < path.length - 1) {
          cur = cur[pathName] as Record<string, unknown>;
        } else {
          cur[pathName] = record[key];
        }
      });
    }
  });
  return JSON.stringify(res);
};

