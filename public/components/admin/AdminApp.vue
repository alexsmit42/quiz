<template lang="pug">
    div
        component(:is="rubric")
</template>

<script>
    import indexPage from './IndexPage.vue';
    import rankedRubric from './ranked_test/RankedRubric.vue';

    export default {
        name: "admin-app",
        data() {
            return {}
        },
        components: {
            index: indexPage,
            ranked: rankedRubric,
        },
        computed: {
            rubric()  {
                return this.$store.state.rubric
            }
        }
    }
</script>

<style scoped>

</style>