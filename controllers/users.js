const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { JWT = 'dev-secret' } = process.env;

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

// eslint-disable-next-line consistent-return
module.exports.createUser = (req, res) => {
  const pattern = new RegExp(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}/);
  const {
    name, about, avatar, email, password,
  } = req.body;
  if (!pattern.test(password)) {
    return res.status(400).send({ message: 'Пороль должен содержать заглавные и прописные буквы, цифры и состоять из не менее, чем 8 знаков' });
  }
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Проверьте правильность данных' });
      }
      return res.status(200).send({
        _id: user._id,
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(400).send({ message: `Ошибка валидации ${err.message}` });
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(409).send({ message: 'Данный email занят' });
      }
      return res.status(500).send({ message: err.message });
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
          sameSate: true,
        });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });
};
