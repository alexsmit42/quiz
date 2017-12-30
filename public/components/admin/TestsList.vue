<template lang="pug">
    .tests-list
        .test(v-for="test, index in tests")
            a(href="#", v-on:click="toAdd(test._id)") {{ test.title }}
            |
            a(href="#", @click="deleteTest(test._id, index)") [Удалить]
</template>

<script>
    export default {
        name: "tests-list",
        props: ['tests']
    }
</script>

<style scoped lang="scss">

</style>