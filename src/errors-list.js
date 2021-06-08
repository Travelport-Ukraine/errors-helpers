const errorFactory = require('./error-factory');

const errorsListFactory = source => (list, extend) => Object.keys(list).reduce((obj, key) => {
  if (!source) {
    throw new Error('source is required but not provided');
  }
  const error = errorFactory(source)(key, list[key], extend);
  Object.assign(obj, {
    [key]: error,
  });
  return obj;
}, {});

module.exports = errorsListFactory;
