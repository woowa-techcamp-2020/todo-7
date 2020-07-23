exports.wrapAsync = (fn) => async (req, res, next) => await fn(req, res, next).catch(next);
exports.isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
exports.wrapBacktick = (input) => {
  if (typeof input === 'string') {
    return input.split(', ').map((str) => '`' + str + '`');
  }
  return input.map((str) => '`' + str + '`');
};
