const router = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');

router.get('/', getAllMovies);
router.post('/', validationCreateMovie, createMovie);
router.delete('/:cardId', validationDeleteMovie, deleteMovie);

module.exports = router;
