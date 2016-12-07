import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
	base: '#/',
	routes: [{
            path: '/index',
            name: 'index',
            component: require('./views/index'),
            children: [{
                name: 'home',
                path: 'home',
                component: require('./views/home')
            }]
        }, 
        {
            name: 'login',
            path: '/login',
            component: require('./views/login')
        },
        {
            path: '*',
            redirect: '/login'
        }
    ]
})
