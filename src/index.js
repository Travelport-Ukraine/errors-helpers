import errors from 'common-errors';
import { getErrorCommon, transformName } from './utils';

export const get = getErrorCommon;

export function generate(list, extend, customFields = ['data'], getError = getErrorCommon) {
  const returnErrors = {};
  Object.keys(list).map(k => {
    const name = transformName(k);
    returnErrors[k] = (function createError(extendClass, className, message, code) {
      const err = errors.helpers.generateClass(className, {
        extends: extendClass,
        args: customFields.concat(['inner_error']),
        generateMessage() {
          return `${extendClass.name}.${code}: ${message}`;
        },
      });
      err.prototype.code = code;
      err.prototype.parentName = extendClass.name;
      err.prototype.toObject = function toObject() {
        return getError(this);
      };
      err.prototype.toJSON = function toJson() {
        return getError(this);
      };
      return err;
    }(extend, name, list[k], k));
    return true;
  });
  return returnErrors;
}

export function findInner(err, classObject) {
  if (err.inner_error) {
    return (err.inner_error.parentName === classObject.name)
      ? true
      : findInner(err.inner_error, classObject);
  }
  return false;
}

export const lib = errors;
