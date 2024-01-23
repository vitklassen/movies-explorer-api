const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

function setBadPathError(req, res, next) {
  return next(new NotFoundError('Некорректный путь'));
}

router.all('/', setBadPathError);
module.exports = router;
