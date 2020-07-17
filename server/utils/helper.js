exports.wrapAsync = (fn) => async (req, res, next) =>
  await fn(req, res, next).catch(next);
exports.isEmpty = (obj) =>
  Object.keys(obj).length === 0 && obj.constructor === Object;
