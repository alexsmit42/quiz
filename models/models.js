let models = {};

models.User = require(__base + '/models/user');
// models.Rubric = require(__base + '/models/rubric');
models.Test = require(__base + '/models/test');

module.exports = models;