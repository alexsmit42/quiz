<template lang="pug">
    div
        component(:is="rubric", action="start")
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
            }
        }
    }
</script>

<style scoped>

</style>