import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
	base: '#/',
	routes: [{
            path: '/index',
            name: 'index',
            component: require('./view/index'),
            children: [
            {
                name: 'home',
                path: 'home',
                component: require('./view/home')
            },
            {
                name: 'goodsList',
                path: 'goodsList',
                component: require('./view/goods/goodsList')
            },
            {
                name: 'orderList',
                path: 'orderList',
                component: require('./view/order/orderList')
            }
            ]
        }, 
        {
            name: 'login',
            path: '/login',
            component: require('./view/login')
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})
