module.exports = requestHandler => (req, res, next) =>
  requestHandler(req, res).catch(next);
