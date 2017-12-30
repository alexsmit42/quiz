let express = require('express'),
    adminRouter = express.Router(),
    admin = require('../controllers/admin');

adminRouter.get('/', admin.home);
adminRouter.post('/test/save', admin.saveTest);
adminRouter.post('/test/delete', admin.deleteTest);
adminRouter.post('/tests', admin.getTests);
adminRouter.post('/test', admin.getTest);

module.exports =  adminRouter;