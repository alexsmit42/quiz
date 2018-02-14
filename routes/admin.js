let express = require('express'),
    adminRouter = express.Router(),
    admin = require('../controllers/admin');

adminRouter.get('/', admin.home);
adminRouter.post('/quiz/save', admin.saveQuiz);
adminRouter.post('/quiz/delete', admin.deleteQuiz);
adminRouter.post('/quizzes', admin.getQuizzes);
adminRouter.post('/quiz', admin.getQuiz);

module.exports =  adminRouter;