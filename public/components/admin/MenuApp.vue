<template lang="pug">
    .menu
        div.list-group
            a.list-group-item(href="#", @click="changeRubric('index')", :class="{ active: currentRubric == 'index' }") Главная страница

            a.list-group-item(
                href="#",
                v-for="(rubric, key) in rubrics",
                @click="changeRubric(key)",
                :class="{ active: key == currentRubric }"
            ) {{rubric.title}}
</template>

<script>
    export default {
        name: "menu-app",
        data() {
            return {}
        },
        methods: {
            changeRubric(rubric) {
                this.$store.commit('CHANGE_RUBRIC', rubric);
                this.$store.commit('CHANGE_ACTION', 'start');
            }
        },
        computed: {
            rubrics() {
                console.log(this.$store.state.rubrics);
                return this.$store.state.rubrics;
            },
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