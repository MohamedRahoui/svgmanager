import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './router'
import App from './App.vue';

Vue.use(VueRouter);

Vue.use(VueAxios, axios);


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})