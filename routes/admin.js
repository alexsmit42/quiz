let express = require('express'),
    adminRouter = express.Router(),
    admin = require('../controllers/admin');

adminRouter.route('/').get(admin.home);

module.exports =  adminRouter;