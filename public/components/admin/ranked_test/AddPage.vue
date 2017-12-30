<template lang="pug">
    .add-test
        .menu
            a(href="#", class="to-rubric", v-on:click="toStart") Назад
        .ranked-test
            h3 Добавить тест на ранжирование
            .description Вопрос на расположение элементов по порядку
            .title
                label Название теста
                input(type="text", v-model="title", name="title", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('title')}")
            .question
                label Введите вопрос
                input(type="text", v-model="question", name="question", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('question')}")
            .ranked-options
                .note
                    label Единица измерения
                    input(type="text", v-model="note", name="note", maxlength="10", v-validate="'required'", :class="{'error-field': errors.has('note')}")

            .errors
                ul
                    li(v-for="errMsg in errorMessages") {{ errMsg }}

            .add-answer
                button(@click="addAnswer") Добавить ответ
            .answers-list.container-fluid
                answer-item(v-for="(answer, index) in answers", :key="index", :answer="answer", :note="note", @remove="removeAnswer(answer)")
            .save
                button(@click="validate") Сохранить тест
</template>

<script>
    import axios from 'axios';

    import answerItem from './AnswerItem.vue';

    const MIN_ANSWERS = 2;

    export default {
        name: "add-page",
        props: ['id'],
        components: {
            answerItem
        },
        data() {
            return {
                testID: 0,
                title: '',
                question: '',
                note: '',
                type: 'ranked',
                lang: 'ru',
                order: 'numeric',
                answers: [],
                errorMessages: []
            }
        },
        created() {
            this.testID = this.id;

            this.setData(this.testID);
        },
        methods: {
            toStart: function() {
                this.$emit('clicked', 'start');
            },
            addAnswer() {
                let answer = {
                    caption: '',
                    value: ''
                };

                this.answers.push(answer);
            },
            removeAnswer(answer) {
                this.answers.splice(this.answers.indexOf(answer), 1);
            },
            validate() {
                this.errorMessages = [];

                let promises = this.$children.map(child => child.$validator.validateAll());
                promises.push(this.$validator.validateAll());

                Promise.all(promises)
                    .then(
                        results => {
                            if (results.every(valid => valid)) {
                                if (this.answers.length <= MIN_ANSWERS) {
                                    this.errorMessages.push('Минимальное количество ответов: ' + MIN_ANSWERS);
                                    return;
                                }

                                // сохранение формы
                                this.saveTest();
                            } else {
                                // ошибка
                                this.errorMessages.push('Заполните все поля');
                            }
                        }
                    );
            },
            saveTest() {
                axios.post('/admin/test/save', this.getData())
                    .then(function(res) {
                        console.log(res);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getData() {
                let data = {
                    id: this.testID,
                    title: this.title,
                    type: this.type,
                    lang: this.lang,
                    question: this.question,
                    note: this.note,
                    order: this.order,
                    answers: this.answers
                };

                return data;
            },
            setData(id) {
                if (!id) {
                    return false;
                }
                let component = this;

                axios.post('/admin/test', {id: this.testID})
                    .then(function(res) {
                        if (res.data.error) {
                            // TODO: throw error
                            return false;
                        }

                        let test = res.data.test;
                        component.title = test.title;
                        component.type = test.type;
                        component.lang = test.lang;
                        component.question = test.options.question;
                        component.note = test.options.note;
                        component.answers = test.options.answers;
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .note {
        input {
            width: 50px;
        }
    }
</style>