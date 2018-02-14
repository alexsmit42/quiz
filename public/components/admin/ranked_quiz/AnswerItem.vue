<template lang="pug">
    .answer-line.ranked-answer.row
        .index
        .answer
            input(type="text", v-model="answer.caption", name="caption", class="answer-caption", v-validate="'required'", :class="{'error-field': errors.has('caption')}")
        .value
            input(type="text", v-model="answer.value", name="value", :placeholder="testNote", v-validate="'required'", :class="{'error-field': errors.has('value')}")
        .remove
            button(@click="removeAnswer") Удалить

</template>

<script>
    export default {
        props: ['answer', 'note'],
        name: "answer-item",
        data() {
            return {
                testNote: this.note,
            }
        },
        mounted() {
            this.updateIndexes();
        },
        watch: {
            // следим за изменением единиц измерения теста
            note() {
                this.testNote = this.note;
            }
        },
        methods: {
            removeAnswer() {
                this.$emit('remove');
                this.updateIndexes();
            },
            updateIndexes() {
                $('.answer-line .index').each(function(index, item) {
                    index += 1;
                    $(this).text(`${index}.`);
                });
            }
        }
    }
</script>

<style scoped lang="scss">

    .ranked-answer {
        .index {
            width: 30px;
            text-align: center;
        }
    }

</style>