let models = {};

models.User = require(__base + '/models/user');
// models.Rubric = require(__base + '/models/rubric');
models.Quiz = require(__base + '/models/quiz');

module.exports = models;