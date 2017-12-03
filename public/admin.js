import Vue from 'vue';

import AdminApp from './components/admin/AdminApp.vue';

import QuestionInput from './components/admin/inputs/QuestionInput.vue';
Vue.component('question-input', QuestionInput);

new Vue({
    el: '#root',
    data: {},
    render (h) {
        return h(AdminApp)
    }
})

require('./css/admin.scss');
