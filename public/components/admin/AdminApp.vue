<template lang="pug">
    div
        component(:is="rubric", action="action")
</template>

<script>
    import indexPage from './IndexPage.vue';
    import rankedPage from './RubricPage.vue';
    import choosePage from './RubricPage.vue';

    export default {
        name: "admin-app",
        data() {
            return {
            }
        },
        components: {
            index: indexPage,
            ranked: rankedPage,
            choose: choosePage
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