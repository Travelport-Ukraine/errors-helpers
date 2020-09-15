const util = require('util');

const errorFactory = (name, parameters, baseType) => {
  if (baseType && baseType !== Error) {
    if ((typeof baseType) !== 'function' || (!(baseType.prototype instanceof Error))) {
      throw new Error('baseType prototype should be an instance of Error');
    }
  }
  const [
    message,
    statusCode = (baseType ? baseType.prototype.statusCode : undefined),
  ] = Array.isArray(parameters)
    ? parameters
    : [parameters];

  const baseTypeName = baseType ? baseType.prototype.name : 'Error';

  /* eslint-disable prefer-template */
  const fnBody = `return function ${name} (d, p) {` +
    `if (!(this instanceof ${name})) {` +
      `return new ${name}(d, p);` +
    '}' +
    `this.name = '${baseTypeName}.${name}';` +
    'this.data = d || null;' +
    `this.statusCode = ${statusCode || 'this.statusCode'};` +
    'if (p) {' +
      'this.causedBy = p;' +
    '}' +
    'if (Error.captureStackTrace) {' +
      'Error.captureStackTrace(this, this.constructor);' +
    '}' +
  '}';
  /* eslint-enable prefer-template */

  /* eslint-disable no-new-func */
  const CustomError = (new Function('baseType', fnBody))(baseType);
  /* eslint-enable no-new-func */

  util.inherits(CustomError, baseType || Error);
  CustomError.prototype.name = name;
  CustomError.prototype.message = message;

  if (statusCode) {
    if (!Number.isInteger(statusCode) || statusCode < 0) {
      throw new Error(`${name} error code should be a positive integer, but it is ${typeof statusCode}.`);
    }

    CustomError.prototype.statusCode = statusCode;
  }

  return CustomError;
};

module.exports = errorFactory;
