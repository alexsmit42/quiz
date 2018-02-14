<template lang="pug">
    div
        component(:is="currentAction", @clicked="onClickChild", :id="id")
</template>

<script>
    import startPage from './StartRubricPage.vue';
    import addChoosePage from './choose_quiz/AddPage.vue';
    import addComparePage from './compare_quiz/AddPage.vue';
    import addRankedPage from './ranked_quiz/AddPage.vue';

    export default {
        name: "ranked-page",
        props: ['action'],
        data() {
            return {
                id: 0
            }
        },
        components: {
            start: startPage,
            rankedAdd: addRankedPage,
            chooseAdd: addChoosePage,
            compareAdd: addComparePage
        },
        computed: {
            currentAction() {
                let action = this.$store.state.action;

                if (action === 'add') {
                    let rubric = this.$store.state.rubric;
                    action = `${rubric}Add`;
                }

                return action;
            }
        },
        methods:  {
            onClickChild(value) {
                let action = value.action || 'start';
                this.$store.commit('CHANGE_ACTION', action);
                this.id = value.id;
            }
        }
    }
</script>

<style scoped lang="scss">

</style>