<template lang="pug">
    ul
        li(v-for="name in upperNames") {{name}}
</template>

<script>

    export default{
        props: ['names'],
        created: function() {
           this.upperNames = this.names.map(name => name.toUpperCase())
        }
    }
</script>

<style lang="scss">
    $liColor: darkgreen;

    ul li {
        color: $liColor;
    }
</style>