import Vue from 'vue'
import VueRouter from 'vue-router'
import CoverView from '../views/CoverView.vue'
import SignupView from '../views/SignUpView.vue'
import MovieListView from '../views/MovieListView.vue'
import CommunityView from '../views/CommunityView.vue'
import MovieDetailView from '../views/MovieDetailView.vue'
import CommunityDetailView from '../views/CommunityDetailView.vue'
import CommunityCreateView from '../views/CommunityCreateView.vue'
import WishMovieView from '../views/WishMovieView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'cover',
    component: CoverView
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView
  },
  {
    path: '/movies',
    name: 'movies',
    component: MovieListView
  },
  { 
    path: '/community',
    name: 'community',
    component: CommunityView
  },
  { 
    path: '/community/create',
    name: 'communitycreate',
    component: CommunityCreateView
  },
  { 
    path: '/community/:id',
    name: 'communitydetail',
    component: CommunityDetailView
  },    
  {
    path: '/movies/:id',
    name: 'MovieDetail',
    component: MovieDetailView
  },
  {
    path: '/wishlist',
    name: 'Wish',
    component: WishMovieView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
