let models = {};

models.User = require(__base + '/models/user');
models.Test = require(__base + '/models/test');
models.Ranked = require(__base + '/models/ranked');

module.exports = models;