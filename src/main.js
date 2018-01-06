import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import router from './router'
import App from './App.vue';
import Jquery from 'jquery'


window.jQuery = window.$ = Jquery

Vue.use(VueRouter);

Vue.use(VueAxios, axios);

Vue.prototype.$server = (path) => {
    return 'http://localhost:4000/' + path
}

Vue.component('shape', {
    props: {
        item: {type: Object, required: true},

    },
    render: function (createElement) {
        return createElement(this.item.nodeName, {
            attrs: {
                width: this.item.width,
                height: this.item.height,
                x: this.item.x,
                y: this.item.y,
                cx: this.item.cx,
                cy: this.item.cy,
                r: this.item.r,
                rx: this.item.rx,
                ry: this.item.ry,
                x1: this.item.x1,
                x2: this.item.x2,
                y1: this.item.y1,
                y2: this.item.y2,
                d: this.item.d,
                points: this.item.points,
                style: 'fill: ' + this.item.style.fill + '; stroke: ' + this.item.style.stroke + '; stroke-width: '+ this.item.style.stroke_width
            }
        })
    }
});


new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {App}
})