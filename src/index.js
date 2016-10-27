const createErrorClass = require('./error-factory');
const createErrorsList = require('./errors-list');
const getFullName = require('./helpers/get-full-name');
const getObject = require('./helpers/get-object');
const getFullStack = require('./helpers/get-full-stack');
const hasErrorClass = require('./helpers/has-error-class');

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
