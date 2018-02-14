<template lang="pug">
    .add-quiz
        .menu
            a(href="#", class="to-rubric", v-on:click="toStart") Назад
        .ranked-quiz
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

            errors-list(:errorsList="errorMessages")

            .add-answer
                button(@click="addAnswer") Добавить ответ
            .answers-list.container-fluid
                answer-item(v-for="(answer, index) in answers", :key="index", :answer="answer", :note="note", @remove="removeAnswer(answer)")

            .save
                button(@click="validate") Сохранить тест
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
            saveData() {
                return {
                    id: this.id,
                    title: this.title,
                    type: QUIZ_TYPE,
                    lang: 'ru',
                    options: {
                        question: this.question,
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
                    question: '',
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
    .note {
        input {
            width: 50px;
        }
    }
</style>