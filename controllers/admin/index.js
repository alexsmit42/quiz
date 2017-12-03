
module.exports = {
    home: function(req, res) {
        res.render('admin/index', {
            i18n: req.i18n
        });
    }
};