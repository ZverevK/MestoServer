const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: `Неверный запрос ${err}` }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      return res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send({ message: `Неверный запрос ${err}` });
    });
};

module.exports.createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.status(200).send({ user }))
    .catch((err) => res.status(400).send({ message: `Данные не отправлены ${err}` }));
};
