const createErrorClass = require('./error-factory');
const createErrorsList = require('./errors-list');
const getFullName = require('./helpers/get-full-name');
const getObject = require('./helpers/get-object');
const getFullStack = require('./helpers/get-full-stack');
const hasErrorClass = require('./helpers/has-error-class');

Error.stackTraceLimit = Infinity;

module.exports = (source = 'node-error-helpers') => ({
  createErrorClass: createErrorClass(source),
  createErrorsList: createErrorsList(source),
  helpers: {
    getFullName,
    getObject,
    getFullStack,
    hasErrorClass,
  },
});
