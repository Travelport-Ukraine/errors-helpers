module.exports = (err, errorType) => {
  let e = err;
  while (e instanceof Error) {
    if (e instanceof errorType) {
      return true;
    }
    e = e.causedBy;
  }
  return false;
};
