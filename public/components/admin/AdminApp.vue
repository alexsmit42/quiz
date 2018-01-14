<template lang="pug">
    div
        component(:is="rubric", action="action")
</template>

<script>
    import indexPage from './IndexPage.vue';
    import rankedPage from './RubricPage.vue';
    import choosePage from './RubricPage.vue';
    import comparePage from './RubricPage.vue';

    export default {
        name: "admin-app",
        data() {
            return {
            }
        },
        /* TODO: минифицировать количество определений рубрик в компонентах (перенести в vuex) */
        components: {
            index: indexPage,
            ranked: rankedPage,
            choose: choosePage,
            compare: comparePage
        },
        computed: {
            rubric()  {
                return this.$store.state.rubric;
            },
            action() {
                return this.$store.state.action;
            }
        }
    }
</script>

<style scoped>

</style>