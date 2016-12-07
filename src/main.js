import Vue from 'vue';
import App from './routers/App.vue';
import router from './router.js';

// 开启debug模式
Vue.config.debug = true;

new Vue({
    router: router,
    render: h => h(App)
}).$mount('#app');
