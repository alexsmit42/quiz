let mongoose = require(__base + '/utils/mongoose'),
    {User, Quiz} = require(__base + '/models/models');
//     // log = require('./utils/log')(null, module),
//     config = require('./config');

module.exports = {
    home: function(req, res) {
        res.render('admin/index', {
            i18n: req.i18n
        });
    },
    saveQuiz: function(req, res) {
        let params = req.body;

        User.findOne({username: 'admin'})
            .then(user => {

                let quizData = {
                    title: params.title,
                    type: params.type,
                    lang: params.lang,
                    options: params.options,
                    user: user._id
                };

                // TODO: переделать одной функцией
                if (params.id) {
                    return Quiz.findOneAndUpdate({_id: params.id}, quizData, { upsert: true, setDefaultsOnInsert: true });
                } else {
                    quizData._id = new mongoose.Types.ObjectId();
                    let newQuiz = new Quiz(quizData);
                    return newQuiz.save();
                }
            })
            .then(quiz => {
                res.json({
                    error: false,
                    quiz: quiz.get('urlTitle')
                });
            })
            .catch(err => {
                res.json({
                    error: true,
                    msg: err
                });
            });
    },
    deleteQuiz: function(req, res) {
        let id = req.body.id || false;

        if (!id) {
            res.json({error: true});
        }

        Quiz.deleteOne({_id: id})
            .then(result => {
                res.json({error: false});
            })
            .catch(err => {
                res.json({
                   error: true,
                   msg: errs
                });
            });
    },
    getQuizzes: function(req, res) {
        let type = req.body.type || false;

        if (!type) {
            res.json({error: true});
        }

        Quiz.find({type: type}).
            then(quizzes => {
                res.json({
                    error: false,
                    quizzes: quizzes
                });
            }).
            catch(err => {
                res.json({
                    error: true,
                    msg: err
                })
            });
    },
    getQuiz: function(req, res) {
        let id = req.body.id || false;

        if (!id) {
            res.json({error: true});
        }

        Quiz.findOne({_id: id})
            .then(quiz => {
                res.json({
                    error: false,
                    quiz: quiz
                });
            }).
            catch(err => {
                res.json({
                    error: true,
                    msg: err
                })
            });
    }
};