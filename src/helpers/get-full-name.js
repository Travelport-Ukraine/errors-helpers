module.exports = (err) => {
  const names = [];
  /* eslint-disable no-proto */
  let e = err.__proto__;
  while (e.name) {
    names.unshift(e.name);
    e = e.__proto__;
  }
  /* eslint-enable no-proto */
  return names.join('.');
};
