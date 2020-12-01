const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, deleteCard, createCard } = require('../controllers/cards');
const url = require('../regExp/url');
Joi.objectId = require('joi-objectid')(Joi);

router.get('/', getCards);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(url),
    owner: Joi.objectId(),
  }),
}), createCard);
router.delete('/:id', deleteCard);

module.exports = router;
