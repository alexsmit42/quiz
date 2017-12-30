<template lang="pug">
    div
        component(:is="action", @clicked="onClickChild", :id="id")
</template>

<script>
    import startPage from '../StartRubricPage.vue'
    import addPage from './AddPage.vue'

    export default {
        name: "ranked-page",
        data() {
            return {
                action: 'start',
                id: 0
            }
        },
        components: {
            start: startPage,
            add: addPage
        },
        methods: {
            'onClickChild': function(value) {
                this.action = value.action || 'start';

                if (value.id) {
                    this.id = value.id;
                }
            }
        }
    }
</script>

<style scoped lang="scss">

</style>