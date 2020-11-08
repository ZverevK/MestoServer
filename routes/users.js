const router = require('express').Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/users', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      try {
        const parsedData = JSON.parse(data);
        return res.status(200).send(parsedData);
      } catch (err) {
        throw new Error(err);
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Ошибка при чтении файла: ${err}` });
    });
});

router.get('/users/:id', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'users.json'))
    .then((data) => {
      const users = JSON.parse(data);
      const element = users.find((el) => el._id === req.params.id);
      if (element) {
        res.status(200).json(element);
      } else {
        res.status(404).json({ message: 'Нет пользователя с таким id' });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: `Ошибка при чтении файла: ${err}` });
    });
});

module.exports = router;
