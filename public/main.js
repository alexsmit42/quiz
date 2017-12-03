import Vue from 'vue';

import App from './App.vue';

new Vue({
    el: '#root',
    data: {},
    render (h) {
        return h(App)
    }
})

require('./css/main.scss');
