const router = require('express').Router();
const {
  getUsers, getUser, createUser, login,
} = require('../controllers/users');
const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);
router.get('/users/:id', auth, getUser);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
