module.exports = (err) => {
  const stack = [];
  let e = err;
  while (e && e.stack) {
    stack.unshift(e.stack);
    e = e.causedBy;
  }
  return stack;
};
