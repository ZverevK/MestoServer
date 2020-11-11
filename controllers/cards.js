const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: `Ошибка сервера ${err}` }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Карточка не найдена' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => res.status(400).send({ message: `Ошибка клиента ${err}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send({ message: `Данные не отправлены ${err}` }));
};
