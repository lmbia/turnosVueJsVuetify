import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacto',
    name: 'Contacto',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Contacto.vue')
  },
  {
    path: '/mis-turnos',
    name: 'MisTurnos',
    component: () => import('../views/MisTurnos.vue')
  },
  {
    path: '/confirmacion',
    name: 'Confirmacion',
    component: () => import('../views/Confirmacion.vue')
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: () => import('../views/Editar.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
