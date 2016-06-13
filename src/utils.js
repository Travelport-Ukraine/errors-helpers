export function transformName(underscoredName) {
  return underscoredName.split('_').map((word, key) =>
    ((key === 0)
      ? word[0].toUpperCase() + word.slice(1, word.length).toLowerCase()
      : `${word[0].toUpperCase() + word.toLowerCase().slice(1, word.length)}Error`
    )).join('');
}

export function getErrorCommon(err) {
  return {
    message: err.toString(),
    code: `${err.parentName}.${err.code}`,
    stack: err.stack,
    data: err.data,
  };
}
