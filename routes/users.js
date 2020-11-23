const router = require('express').Router();
const {
  getUsers, getUser, createUser, login,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;
