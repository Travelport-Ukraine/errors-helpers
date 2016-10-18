const createErrorClass = require('./src/error-factory');
const createErrorsList = require('./src/errors-list');
const getFullName = require('./src/helpers/get-full-name');
const getObject = require('./src/helpers/get-object');
const getFullStack = require('./src/helpers/get-full-stack');
const hasErrorClass = require('./src/helpers/has-error-class');

module.exports = {
  createErrorClass,
  createErrorsList,
  helpers: {
    getFullName,
    getObject,
    getFullStack,
    hasErrorClass,
  },
};
