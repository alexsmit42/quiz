<template lang="pug">
    .start-page
        h2 {{rubricInfo.title}}
        .menu
        .description {{rubricInfo.description}}
        .add
            button(class="btn btn-outline-primary", id="add-test", v-on:click="toAdd(0)") Добавить тест
        .tests-list
            .test(v-for="test, index in tests")
                a(href="#", v-on:click="toAdd(test._id)") {{ test.title }}
                |
                a(href="#", @click="deleteTest(test._id, index)") [Удалить]
</template>

<script>
    import axios from 'axios';

    const RUBRICS = {
        ranked: {
            title: 'Ранжирование',
            description: 'В тестах на ранжирование необходимо расположить элементы по порядку'
        },
        choose: {
            title: 'Выбор ответа',
            description: 'Выбрать правильный ответ из четырех вариантов'
        }
    };

    export default {
        name: "start-page",
        data() {
            return {
                tests: []
            };
        },
        computed: {
            rubricInfo() {
                this.getTests();
                return RUBRICS[this.$store.state.rubric];
            }
        },
        methods: {
            toAdd(id = 0) {
                this.$emit('clicked', {action: 'add', id: id})
            },
            deleteTest(id, index) {
                let component = this;

                axios.post('/admin/test/delete', {id: id})
                    .then(function(res) {
                        if (!res.data.error) {
                            component.tests.splice(component.tests.indexOf(index), 1);
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getTests() {
                let component = this;

                axios.post('/admin/tests', {type: this.$store.state.rubric})
                    .then(function(res) {
                        if (!res.data.error) {
                            component.tests = res.data.tests;
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