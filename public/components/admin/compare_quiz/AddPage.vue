<template lang="pug">
    .add-quiz
        .menu
            a(href="#", class="to-rubric", v-on:click="toStart") Назад
        .compare-quiz
            h3 Квиз на соответствие элементов
        .title
            label Название квиза
            input(type="text", v-model="title", name="title", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('title')}")
        .description
            label Описание
            input(type="text", v-model="description", name="description", maxlength="200", v-validate="'required'", :class="{'error-field': errors.has('description')}")

        errors-list(:errorsList="errorMessages")

        .pairs-list.container-fluid
            .list-header
                div
                    input(type="text", v-model="headers[0]['caption']", placeholder="Заголовок", name="description_0", maxlength="200", v-validate="'required'", :class="{'error-field': errors.has('description_0')}")
                    input(type="text", v-model="headers[0]['note']", placeholder="Прим.")
                div
                    input(type="text", v-model="headers[1]['caption']", placeholder="Заголовок", name="description_1", maxlength="200", v-validate="'required'", :class="{'error-field': errors.has('description_1')}")
                    input(type="text", v-model="headers[1]['note']", placeholder="Прим.")
            .pair-item(v-for="pair in pairs")
                div
                    input(type="text", v-model="pair[0]", maxlength="50")
                div
                    input(type="text", v-model="pair[1]", maxlength="50")
                div(v-show="!isMinPairs")
                    a(href="#", @click="removePair(pair)") Удалить

        .add-question
            button(@click="addPair") Добавить пару

        .save
            button(@click="validate") Сохранить тест
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
        created() {
            if (this.id) {
                this.setData(this.id);
            }
        },
        components: {
            errorsList
        },
        computed: {
            isMinPairs() {
                return this.pairs.length === MIN_PAIRS;
            },
            saveData() {
                return {
                    id: this.id,
                    title: this.title,
                    type: QUIZ_TYPE,
                    lang: 'ru',
                    options: {
                        description: this.description,
                        headers: this.headers,
                        pairs: this.pairs
                    }
                };
            }
        },
        methods: {
            addPair() {
                this.pairs.push(Object.assign({}, DEFAULT_PAIR));
            },
            removePair(pair) {
                if (this.pairs.length <= MIN_PAIRS) {
                    return;
                }

                this.pairs.splice(this.pairs.indexOf(pair), 1);
            },
            setDefault() {
                let pairs = [];

                for(let i = 0; i < MIN_PAIRS; ++i) {
                    pairs.push(Object.assign({}, DEFAULT_PAIR));
                }

                return {
                    quizID: 0,
                    title: '',
                    description: '',
                    type: QUIZ_TYPE,
                    lang: 'ru',
                    headers: [
                        {
                            caption: '',
                            note: ''
                        },
                        {
                            caption: '',
                            note: ''
                        }
                    ],
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