import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

import AddPost from '@/components/Posts/AddPost.vue';
import Posts from '@/components/Posts/Posts.vue';
import Post from '@/components/Posts/Post.vue';

import Profile from '@/components/Auth/Profile.vue';
import SignIn from '@/components/Auth/SignIn.vue';
import SignUp from '@/components/Auth/SignUp.vue';

import AuthGuard from '../AuthGuard';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/add/',
    name: 'AddPost',
    component: AddPost,
    beforeEnter: AuthGuard
  },
  {
    path: '/Posts',
    name: 'posts',
    component: Posts
  },
  {
    path: '/Posts/:postId',
    name: 'Post',
    component: Post,
    props: true
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: AuthGuard
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
