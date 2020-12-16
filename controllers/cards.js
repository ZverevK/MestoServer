const Card = require('../models/card');

const ForbiddenError = require('../errors/forbidden-error');
const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.status(200).send(cards))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.id).orFail(new NotFoundError(`Карточка не найдена ${req.params.id}`))
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Нельзя удалить чужую карточку');
      } else {
        Card.findByIdAndRemove(req.params.id)
          // eslint-disable-next-line arrow-body-style
          .then((card) => {
            return res.status(200).send(card);
          })
          // eslint-disable-next-line arrow-body-style
          .catch((err) => {
            return next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError' || res.statusCode === 400) {
        return next(new BadRequestError(`Неверный запрос ${err.message}`));
      }
      return next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(200).send({ user }))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(`Неверный запрос ${err.message}`));
      }
      return next(err);
    });
};
