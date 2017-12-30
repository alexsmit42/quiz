let mongoose = require(__base + '/utils/mongoose'),
    {User, Test} = require(__base + '/models/models');
//     // log = require('./utils/log')(null, module),
//     config = require('./config');

module.exports = {
    home: function(req, res) {
        res.render('admin/index', {
            i18n: req.i18n
        });
    },
    saveTest: function(req, res) {
        let params = req.body;

        User.findOne({username: 'admin'})
            .then(user => {
                let options = {
                    question: params.question,
                    note: params.note,
                    order: params.order,
                    answers: params.answers
                };

                let testData = {
                    title: params.title,
                    type: params.type,
                    lang: params.lang,
                    options: options,
                    user: user._id
                };

                // TODO: переделать одной функцией
                if (params.id) {
                    return Test.findOneAndUpdate({_id: params.id}, testData, { upsert: true, setDefaultsOnInsert: true });
                } else {
                    testData._id = new mongoose.Types.ObjectId();
                    let newTest = new Test(testData);
                    return newTest.save();
                }
            })
            .then(test => {
                res.json({
                    error: false,
                    test: test.get('urlTitle')
                });
            })
            .catch(err => {
                res.json({
                    error: true,
                    msg: err
                });
            });
    },
    deleteTest: function(req, res) {
        let id = req.body.id || false;

        if (!id) {
            res.json({error: true});
        }

        Test.deleteOne({_id: id})
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
    getTests: function(req, res) {
        let type = req.body.type || false;

        if (!type) {
            res.json({error: true});
        }

        Test.find({type: type}).
            then(tests => {
                res.json({
                    error: false,
                    tests: tests
                });
            }).
            catch(err => {
                res.json({
                    error: true,
                    msg: err
                })
            });
    },
    getTest: function(req, res) {
        let id = req.body.id || false;

        if (!id) {
            res.json({error: true});
        }

        Test.findOne({_id: id})
            .then(test => {
                res.json({
                    error: false,
                    test: test
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