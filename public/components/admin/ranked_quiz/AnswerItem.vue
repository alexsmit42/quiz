<template lang="pug">
    .answer-line.ranked-answer.row
        .answer-container
            .index
            .answer
                input(type="text", class="form-control", v-model="answer.caption", name="caption", class="answer-caption", v-validate="'required'", :class="{'error-field': errors.has('caption')}")
            .value
                input(type="text", class="form-control", v-model="answer.value", name="value", :placeholder="testNote", v-validate="'required'", :class="{'error-field': errors.has('value')}")
        .remove(v-show="!isMinAnswers", @click="removeAnswer" title="Удалить")

</template>

<script>
    export default {
        props: ['answer', 'note', 'isMinAnswers'],
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
    $rankedWidth: 500px;

    .ranked-answer {
        .answer-container {
            width: $rankedWidth;
            margin: 5px 0;
            display: inline-flex;
            justify-content: space-between;

            .index {
                width: 20px;
                display:flex;
                justify-content:center;
                align-items:center;
            }

            .answer {
                width: $rankedWidth / 2 - 20$rankedWidth / 2 - 20;

                input {
                    width: 100%;
                }
            }

            .value {
                width: $rankedWidth / 2 - 20;

                input {
                    width: 100%;
                }
            }
        }

            .remove {
                    width: 16px;
                    height: 16px;
                    margin:  15px 0 0 10px;
                    cursor: pointer;
                    background-image: url(/images/remove.png);
                    background-size: cover;
            }
    }

</style>