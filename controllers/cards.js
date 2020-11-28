const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: `Неверный запрос ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id).orFail(new Error('NotValidId'))
    .then((data) => {
      if (data.owner.toString() !== req.user._id) {
        return res.status(403).send({ message: 'Можно удалять только свои карточки' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      if (err.message === 'NotValidId') {
        return res.status(404).send({ message: 'Такой карточки нет!' });
      } if (err.name === 'CastError') {
        return res.status(400).send({ message: `Ошибка валидации id карточки ${req.params.id}` });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send({ message: `Данные не отправлены ${err}` }));
};
