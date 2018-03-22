<template lang="pug">
    .add-quiz
        .menu
            a(href="#", class="to-rubric", v-on:click="toStart") Назад
        .ranked-quiz.quiz-container
            h3 Добавить тест на сортировку
            .title
                input(type="text", class="form-control", placeholder="Вопрос", v-model="title", name="title", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('title')}")

            .ranked-options
                .note
                    input(type="text", class="form-control", placeholder="Единица измерения" v-model="note", name="note", maxlength="10")

            .answers-list.container-fluid
                answer-item(v-for="(answer, index) in answers", :key="index", :answer="answer", :note="note", :isMinAnswers="isMinAnswers", @remove="removeAnswer(answer)")

            .add-answer
                button(@click="addAnswer", type="button", class="btn btn-outline-secondary") Добавить

            .save
                button(@click="validate",  type="button", class="btn btn-info") Сохранить тест
</template>

<script>
    import errorsList from '../common/ErrorsList.vue';
    import answerItem from './AnswerItem.vue';

    import quizMixin from '../mixins/quizzesMixin';

    const MIN_ANSWERS = 3;
    const QUIZ_TYPE = 'ranked';
    const DEFAULT_ANSWER = {
        value: '',
        caption: ''
    };

    export default {
        name: "add-page",
        props: ['id'],
        components: {
            errorsList, answerItem
        },
        mixins: [quizMixin],
        data() {
            return this.setDefault();
        },
        created() {
            if (this.id) {
                this.setData(this.id);
            }
        },
        computed: {
            isMinAnswers() {
                return this.answers.length === MIN_ANSWERS;
            },
            saveData() {
                return {
                    id: this.id,
                    title: this.title,
                    type: QUIZ_TYPE,
                    lang: 'ru',
                    options: {
                        note: this.note,
                        order: 'numeric',
                        answers: this.answers,
                    }
                };
            }
        },
        methods: {
            addAnswer() {
                this.answers.push(Object.assign({}, DEFAULT_ANSWER));
            },
            removeAnswer(answer) {
                if (this.answers.length <= MIN_ANSWERS) {
                    return;
                }

                this.answers.splice(this.answers.indexOf(answer), 1);
            },
            setDefault() {
                let answers = [];

                for(let i = 0; i < MIN_ANSWERS; ++i) {
                    answers.push(Object.assign({}, DEFAULT_ANSWER));
                }

                return {
                    quizID: 0,
                    title: '',
                    note: '',
                    type: QUIZ_TYPE,
                    lang: 'ru',
                    order: 'numeric',
                    answers: answers,
                    errorMessages: []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $rankedWidth: 500px;

    .note {
        input {
            width: 50px;
        }
    }

    .ranked-quiz {

        .title {
            input {
                width: $rankedWidth;
            }
        }

        .ranked-options {
            display: flex;
            justify-content: flex-end;
            width: $rankedWidth;

            .note {
                input {
                    width: $rankedWidth / 2 - 20;
                }
            }
        }

        .add-answer {
            margin-top: 10px;
        }

        .save {
            margin: 20px 0;
        }
    }
</style>