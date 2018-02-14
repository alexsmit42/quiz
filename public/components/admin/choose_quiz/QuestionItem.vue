<template lang="pug">
    .question-item
        .title
            label Вопрос:
            input(type="text", v-model="question.title", name="title", maxlength="100", v-validate="'required'", :class="{'error-field': errors.has('title')}")
        div Ответы:
        .answers-list.container-fluid
            .answer-item.row(v-for="answer, index in question.answers", :class="index === 0 ? 'correct-answer' : ''")
                input(type="text", v-model="question.answers[index]", :name="'answer_' + index + '_' + id" maxlength="50", v-validate="'required'", :class="{'error-field': errors.has('answer_' + index + '_' + id)}")
        .remove
            button(@click="removeQuestion") Удалить
        hr
</template>

<script>
    export default {
        name: "question-item",
        props: ['question', 'id'],
        methods: {
            removeQuestion() {
                this.$emit('remove');
                this.updateIndexes();
            },
            updateIndexes() {

            }
        }
    }
</script>

<style scoped lang="scss">
    .answers-list {
        display: -webkit-flex;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;

        .answer-item {

        }

        .correct-answer {
            input {
                border-color: #000;
            }
        }
    }

</style>