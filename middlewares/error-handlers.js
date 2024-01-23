const http2 = require('http2');

module.exports = (err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send({ message: 'Ошибка на сервере' });
};
