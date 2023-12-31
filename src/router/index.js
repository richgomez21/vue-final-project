import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserList from '../views/UserList.vue'
import UserDetails from '../views/UserDetails.vue'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
import Artists from '../views/Artists.vue'
import ArtistDetails from '../views/ArtistDetails.vue'
import Albums from '../views/Albums.vue'
import AlbumDetails from  '../views/AlbumDetails.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {title: "Rap Wrapped"}
  },
  { 
    path: '/users', 
    name: 'UserList', 
    component: UserList,
    meta: {title: "Peoples"}
  },
  { 
    path: '/users/:userId', 
    name: 'UserDetails', 
    component: UserDetails, 
    props: true,
    meta: {title: "Details"}
  },
  { 
    path: '/users/add', 
    name: 'AddUser', 
    component: UserDetails,
    meta: {title: "Add New PPl"}
  },
  //////////////////////////////
  { 
    path: '/artists', 
    name: 'Artists', 
    component: Artists,
    meta: {title: "Artists"}
  },
  { 
    path: '/artists/:artistId', 
    name: 'ArtistDetails', 
    component: ArtistDetails, 
    props: true,
    meta: {title: "ArtistDetails"}
  },
  { 
    path: '/artists/add', 
    name: 'AddArtist', 
    component: ArtistDetails,
    meta: {title: "Add New Artist"}
  },
  ///////////////////////////////////////////
  { 
    path: '/albums', 
    name: 'Albums', 
    component: Albums,
    meta: {title: "Albums"}
  },
  { 
    path: '/albums/:albumId', 
    name: 'AlbumDetails', 
    component: AlbumDetails, 
    props: true,
    meta: {title: "AlbumDetails"}
  },
  { 
    path: '/albums/add', 
    name: 'AddAlbum', 
    component: AlbumDetails,
    meta: {title: "Add New Album"}
  },
  //////////////////////////////////////
  { 
    path: '/login', 
    name: 'Login', 
    component: Login,
    meta: {title: "Login"} 
  },
  { 
    path:"/404", 
    component: NotFound, 
    name:"NotFound",
    meta: {title: "PAGE NOT FOUND"}
  },
  { 
    path:"/:catchAll(.*)", 
    redirect: "/404" 
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.afterEach((to, from) => {
  document.title = to.meta.title || "NO PAGE TITLE SET!";
});

export default router
