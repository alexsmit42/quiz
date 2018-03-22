global.__base = __dirname + '/';

let mongoose = require(__base + '/utils/mongoose'),
    {User} = require(__base + '/models/models');

let data = {
    _id: new mongoose.Types.ObjectId(),
    username: 'admin',
    password: '1234',
    salt: '123'
};

User.create(data);