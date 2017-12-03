<template lang="pug">
    .add-test
        .menu
            a(href="#", class="to-rubric", v-on:click="toRubric") Назад
        ranked-test
</template>

<script>
    import rankedTest from './ranked_test/RankedTest.vue';

    export default {
        name: "add-test",
        components: {
            rankedTest
        },
        methods: {
            toRubric: function() {
                this.$emit('clicked', 'rubric');
            }
        }
    }
</script>

<style scoped>

</style>