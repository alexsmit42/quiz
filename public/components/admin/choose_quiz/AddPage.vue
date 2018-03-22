<template lang="pug">
    .add-quiz
        .menu
            a(href="#", class="to-rubric", v-on:click="toStart") Назад
        .choose-quiz.quiz-container
            h3 Тест на выборы ответов
            .title
                input(type="text", placeholder="Название теста", v-model="title", class="form-control", name="title", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('title')}")

            errors-list(:errorsList="errorMessages")

            .add-question
                button(@click="addQuestion") Добавить вопрос

            .question-list.container-fluid
                question-item(v-for="(question, index) in questions", :key="index", :id="index", :question="question", @remove="removeQuestion(question)")

            .add-question
                button(@click="addQuestion") Добавить вопрос

            .save
                button(@click="validate") Сохранить тест

</template>

<script>
    import errorsList from '../common/ErrorsList.vue';
    import questionItem from './QuestionItem.vue';

    import quizMixin from '../mixins/quizzesMixin';

    const MIN_QUESTIONS = 3;
    const QUIZ_TYPE = 'choose';
    const DEFAULT_QUESTION = {
        title: '',
        answers: ['', '', '', '']
    };

    export default {
        name: "add-page",
        props: ['id'],
        mixins: [quizMixin],
        data() {
            return this.setDefault();
        },
        computed: {
            saveData() {
                return {
                    id: this.id,
                    title: this.title,
                    type: QUIZ_TYPE,
                    lang: 'ru',
                    options: {
                        questions: this.questions
                    }
                };
            }
        },
        created() {
            if (this.id) {
                this.setData(this.id);
            }

        },
        components: {
            errorsList, questionItem
        },
        methods: {
            addQuestion() {
                this.questions.push(Object.assign({}, {
                    title: '',
                    answers: ['', '', '', '']
                }));
            },
            removeQuestion(question) {
                if (this.questions.length <= MIN_QUESTIONS) {
                    return;
                }

                this.questions.splice(this.questions.indexOf(question), 1);
            },
            setDefault() {
                let questions = [];

                for(let i = 0; i < MIN_QUESTIONS; ++i) {
                    questions.push(Object.assign({}, {
                        title: '',
                        answers: ['', '', '', '']
                    }));
                }

                return {
                    quizID: 0,
                    title: '',
                    type: 'choose',
                    lang: 'ru',
                    questions: questions,
                    errorMessages: []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    $chooseWidth: 500px;

    .choose-quiz {
        .title {
            input {
                width: $chooseWidth;
            }
        }
    }
</style>