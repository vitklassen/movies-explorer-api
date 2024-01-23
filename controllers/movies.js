require('dotenv').config();
const http2 = require('http2');
const Movies = require('../models/movies');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getAllMovies = (req, res, next) => {
  Movies.find({ owner: req.user._id })
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image, trailerLink, thumbnail,
    nameRU, nameEN, movieId,
  } = req.body;
  const owner = req.user._id;
  Movies.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    movieId,
    owner,
  })
    .then((movie) => {
      res.status(http2.constants.HTTP_STATUS_CREATED).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Введены некорректные данные для создания фильма'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  Movies.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      if ((`${card.owner}` !== req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить чужой фильм');
      }
      Movies.deleteOne(card)
        .then(() => {
          res.send({ message: 'Фильм удален' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};
