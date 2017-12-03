let adminRouter = require('./admin');

module.exports = function(app) {
    app.use('/admin', adminRouter);
};