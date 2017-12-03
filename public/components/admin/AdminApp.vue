<template lang="pug">
    div
        component(:is="currentComponent", @clicked="onClickChild")
</template>

<script>
    import rubricPage from './RubricPage.vue';
    import addTest from './AddTest.vue';

    export default {
        name: "admin-app",
        data: function() {
          return {
              currentComponent: 'rubric'
          }
        },
        components: {
            rubric: rubricPage,
            add: addTest
        },
        methods: {
            'onClickChild': function(value) {
                this.currentComponent = value || 'rubric';
            }
        }
    }
</script>

<style scoped>

</style>