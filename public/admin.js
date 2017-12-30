import Vue from 'vue';

import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import VeeValidate from 'vee-validate';

import menuApp from './components/admin/MenuApp.vue';
import adminApp from './components/admin/AdminApp.vue';

const validateConf = {
    events: "input"
};
Vue.use(VeeValidate, validateConf);

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        rubric: 'index'
    },
    actions: {
        changeRubric({commit}, rubric) {
            commit('CHANGE_RUBRIC', rubric)
        }
    },
    mutations: {
        CHANGE_RUBRIC(state, rubric) {
            state.rubric = rubric;
        }
    },
    plugins: [createPersistedState()]
});

new Vue({
    el: '#menu',
    data: {},
    store,
    render(h) {
        return h(menuApp)
    }
});

new Vue({
    el: '#root',
    data: {},
    store,
    render (h) {
        return h(adminApp)
    }
})

require('./css/admin.scss');
