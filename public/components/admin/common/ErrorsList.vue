<template lang="pug">
    .errors
        ul
            li(v-for="err in errorsList") {{ err }}
</template>

<script>
    export default {
        name: "errors-list",
        props: ['errorsList']
    }
</script>

<style scoped lang="scss">

</style>