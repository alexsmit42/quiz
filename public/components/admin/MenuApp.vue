<template lang="pug">
    .menu
        div.list-group
            a.list-group-item(
                href="#",
                v-for="rubric in rubrics",
                @click="changeRubric(rubric.name)",
                :class="{ active: rubric.name == currentRubric }"
            ) {{rubric.caption}}
</template>

<script>
    export default {
        name: "menu-app",
        data() {
            return {
                rubrics: [
                    {
                        name: 'index',
                        caption: 'Главная страница'
                    },
                    {
                        name: 'ranked',
                        caption: 'Ранжирование'
                    },
                    {
                        name: 'choose',
                        caption: 'Выбор ответа'
                    }
                ]
            }
        },
        methods: {
            changeRubric(rubric) {
                this.$store.commit('CHANGE_RUBRIC', rubric);
                this.$store.commit('CHANGE_ACTION', 'start');
            }
        },
        computed: {
            currentRubric() {
                return this.$store.state.rubric;
            }
        }
    }
</script>

<style scoped lang="scss">
    .menu {
        .list-group {
            .list-group-item {
                border: 0;

                &.active {
                    font-weight: bold;
                    /*background: darkblue;*/
                }

                &:hover:not(.active) {
                    background: aliceblue;
                }

                &:not(:last-child) {
                    border-bottom: 1px solid grey !important;
                }
            }
        }
    }
</style>