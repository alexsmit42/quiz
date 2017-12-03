<template lang="pug">
    .rubric-page
        .rubric-menu
            .info
            .add
                button(class="btn btn-outline-primary", id="add-test", v-on:click="toAdd") Добавить тест
</template>

<script>
    export default {
        name: "rubric-page",
        methods: {
            toAdd: function() {
                this.$emit('clicked', 'add')
            }
        }
    }
</script>

<style scoped>

</style>