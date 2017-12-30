import Router from 'vue-router'
import Main from '../views/main.vue'

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'main',
            component: Main
        }
    ]
})