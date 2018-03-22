import axios from 'axios';

export default {
    methods: {
        toStart: function() {
            this.$emit('clicked', 'start');
        },
        validate() {
            // TODO: вывод всех ошибок сразу
            // TODO: заменить console.log на логирование
            this.errorMessages = [];

            let promises = this.$children.map(child => child.$validator.validateAll());
            promises.push(this.$validator.validateAll());

            Promise.all(promises)
                .then(
                    results => {
                        if (results.every(valid => valid)) {
                            // сохранение формы
                            this.saveQuiz();
                        } else {
                            // ошибка
                            this.errorMessages.push('Заполните все поля');
                        }
                    }
                );
        },
        saveQuiz() {
            let obj = this;

            axios.post('/admin/quiz/save', this.saveData)
                .then(function(res) {
                    console.log(333)
                    obj.toStart();
                })
                .catch(function(error) {
                    // console.log(error);
                });
        },
        setData(id) {
            this.quizID = id;
            let component = this;

            axios.post('/admin/quiz', {id: this.quizID})
                .then(function(res) {
                    if (res.data.error) {
                        // TODO: throw error
                        return false;
                    }

                    let quiz = res.data.quiz;
                    component.title = quiz.title;
                    component.type = quiz.type;
                    component.lang = quiz.lang;

                    // TODO: развертывание options
                    for (let key in quiz.options) {
                        component[key] = quiz.options[key];
                    }
                })
                .catch(function(error) {
                    console.log(error);
                });
        },
    }
};