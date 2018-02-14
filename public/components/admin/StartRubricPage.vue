<template lang="pug">
    .start-page
        h2 {{rubricInfo.title}}
        .menu
        .description {{rubricInfo.description}}
        .add
            button(class="btn btn-outline-primary", id="add-quiz", v-on:click="toAdd(0)") Добавить тест
        .quizzes-list
            .quiz(v-for="quiz, index in quizzes")
                a(href="#", v-on:click="toAdd(quiz._id)") {{ quiz.title }}
                |
                a(href="#", @click="deleteQuiz(quiz._id, index)") [Удалить]
</template>

<script>
    import axios from 'axios';

    export default {
        name: "start-page",
        data() {
            return {
                quizzes: []
            };
        },
        computed: {
            rubricInfo() {
                this.getQuizzes();
                return this.$store.getters.currentRubricInfo;
            }
        },
        methods: {
            toAdd(id = 0) {
                this.$emit('clicked', {action: 'add', id: id})
            },
            deleteQuiz(id, index) {
                let component = this;

                axios.post('/admin/quiz/delete', {id: id})
                    .then(function(res) {
                        if (!res.data.error) {
                            component.quizzes.splice(component.quizzes.indexOf(index), 1);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getQuizzes() {
                let component = this;

                axios.post('/admin/quizzes', {type: this.$store.state.rubric})
                    .then(function(res) {
                        if (!res.data.error) {
                            component.quizzes = res.data.quizzes;
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">
    .start-page {
        .add {
            text-align: center;
            margin: 10px 0;
        }
    }
</style>