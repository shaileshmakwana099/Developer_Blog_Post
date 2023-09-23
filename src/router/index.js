import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostDetails from '../views/PostDetails.vue'

Vue.use(VueRouter)

const routes = [  
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts/:id/comments',
    name:'post-details',
    component: PostDetails,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
