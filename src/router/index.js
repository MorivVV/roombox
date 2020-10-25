import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Billing from '../views/Billing.vue'
import forumList from '../views/forumList.vue'
import forum from '../views/forum.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/billing',
        name: 'Billing',
        component: Billing
    },
    {
        path: '/forum',
        name: 'Forum',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: forumList,
        children: [{
            path: '/forum/:id',
            component: forum,
        }]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router