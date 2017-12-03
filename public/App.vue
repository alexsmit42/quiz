<template lang="pug">
    .container
        test-list(v-bind:names="names")
</template>

<script>
    import testList from './components/TestList.vue';

    export default{
        data () {
            return {
                names: ['Alex', 'Jane', 'Maria', 'Victor']
            }
        },
        components: {
            'test-list': testList
        }
    }
</script>

<style>
</style>