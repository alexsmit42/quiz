<template lang="pug">
    .add-quiz
        .menu
            a(href="#", class="to-rubric", v-on:click="toStart") Назад
        .compare-quiz
            h3 Квиз на соответствие элементов
        .title
            label Название квиза
            input(type="text", v-model="title", name="title", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('title')}")

        errors-list(:errorsList="errorMessages")

        .pairs-list.container-fluid
            .list-header
                div {{ captions[0] }}
                div {{ captions[1] }}
            .pair-item(v-for="pair in pairs")
                div
                    input(typr="text", v-model="pair[0]", maxlength="50")
                div
                    input(typr="text", v-model="pair[1]", maxlength="50")

        .add-question
            button(@click="addPair") Добавить пару
</template>

<script>
    import errorsList from '../common/ErrorsList.vue';

    import quizMixin from '../mixins/quizzesMixin';

    const MIN_PAIRS = 3;
    const QUIZ_TYPE = 'compare';
    const DEFAULT_PAIR = ['', ''];

    export default {
        name: "add-page",
        props: ['id'],
        mixins: [quizMixin],
        data() {
            return this.setDefault();
        },
        components: {
            errorsList
        },
        methods: {
            addPair() {
                this.pairs.push(Object.assign({}, DEFAULT_PAIR));
            },
            setDefault() {
                let pairs = [];

                for(let i = 0; i < MIN_PAIRS; ++i) {
                    pairs.push(Object.assign({}, DEFAULT_PAIR));
                }

                return {
                    quizID: 0,
                    title: '',
                    type: 'compare',
                    lang: 'ru',
                    captions: ['Город', 'Население'],
                    pairs: pairs,
                    errorMessages: []
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .pair-item, .list-header {
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
    }
</style>