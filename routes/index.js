const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const badPathRouter = require('./badPath');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');

router.post('/signup', validationCreateUser, createUser);
router.post('/signin', validationLogin, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.use('*', badPathRouter);

module.exports = router;
