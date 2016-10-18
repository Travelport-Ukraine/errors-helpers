const getObject = err => Object.assign({
  name: err.name,
  message: err.message,
  data: err.data || null,
  stack: err.stack,
}, err.causedBy ? {
  causedBy: getObject(err.causedBy),
} : {});

module.exports = getObject;
