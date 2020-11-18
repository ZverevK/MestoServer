const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(link) {
        return validator.isURL(link);
      },
      message: 'Невалидная ссылка',
    },
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: 'Невалидный Email',
    },
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 8,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
