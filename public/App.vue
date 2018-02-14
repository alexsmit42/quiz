<template lang="pug">
    .container
        quiz-list(v-bind:names="names")
</template>

<script>
    import quizList from './components/QuizList.vue';

    export default{
        data () {
            return {
                names: ['Alex', 'Jane', 'Maria', 'Victor']
            }
        },
        components: {
            'quiz-list': quizList
        }
    }
</script>

<style>
</style>