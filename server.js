let express = require('express'),
    app = express(),
    config = require('./config'),
    middleware = require('./middleware')(app, express);

app.get('/', function(req, res){
    res.render('index', {
        title: 'Pug шаблон',
        i18n: req.i18n
    });
});

app.listen(config.get('port'));