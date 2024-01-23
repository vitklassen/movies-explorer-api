const { celebrate, Joi } = require('celebrate');

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string(),
  }),
});

const validationLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validationCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),
    thumbnail: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
  }),
});

const validationDeleteMovie = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().required(),
  }),
});

module.exports = {
  validationUpdateUser,
  validationLogin,
  validationCreateUser,
  validationCreateMovie,
  validationDeleteMovie,
};
