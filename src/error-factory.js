const util = require('util');

const errorFactory = (name, message, baseType) => {
  const baseTypeName = baseType ? baseType.name : 'Error';

  /* eslint-disable prefer-template */
  const fnBody = `return function ${name} (d, p) {` +
    `if (!(this instanceof ${name})) {` +
      `return new ${name}(d, p);` +
    '}' +
    `this.name = '${baseTypeName}.${name}';` +
    'this.data = d || null;' +
    'if (p) {' +
      'this.causedBy = p;' +
    '}' +
    'Error.captureStackTrace(this, this.constructor);' +
  '}';
  /* eslint-enable prefer-template */

  /* eslint-disable no-new-func */
  const CustomError = (new Function('baseType', fnBody))(baseType);
  /* eslint-enable no-new-func */

  util.inherits(CustomError, baseType || Error);
  CustomError.prototype.name = name;
  CustomError.prototype.message = message;

  return CustomError;
};

module.exports = errorFactory;
