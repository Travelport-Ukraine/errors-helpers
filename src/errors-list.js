const errorFactory = require('./error-factory');

const errorsListFactory = source => (list, extend) => Object.keys(list).reduce((obj, key) => {
  const error = errorFactory(source)(key, list[key], extend);
  Object.assign(obj, {
    [key]: error,
  });
  return obj;
}, {});

module.exports = errorsListFactory;
