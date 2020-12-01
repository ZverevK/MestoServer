const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { getUsers, getUser } = require('../controllers/users');

router.get('/', getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.objectId(),
  }),
}), getUser);

module.exports = router;
