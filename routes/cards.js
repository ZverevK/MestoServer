const router = require('express').Router();
const path = require('path');
const fs = require('fs').promises;

router.get('/cards', (req, res) => {
  fs.readFile(path.join(__dirname, '..', 'data', 'cards.json'))
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

module.exports = router;
