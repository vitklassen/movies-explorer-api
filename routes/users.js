const router = require('express').Router();
const { getCurrentUser, updateProfile } = require('../controllers/users');
const { validationUpdateUser } = require('../middlewares/validation');

router.get('/me', getCurrentUser);
router.patch('/me', validationUpdateUser, updateProfile);

module.exports = router;
