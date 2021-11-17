import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Patients from '../views/Patients.vue'
import Doctors from '../views/Doctors.vue'
import Appointments from '../views/Appointments.vue'
import Admin  from '../views/Admin.vue'
import RegAdmin  from '../views/RegAdmin.vue'
import RegStaff  from '../views/RegStaff.vue'
global.baseURL = 'http://localhost:3000';

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/patients',
    name: 'Patients',
    component: Patients
  },
  {
    path: '/doctors',
    name: 'Doctors',
    component: Doctors
  },
  {
    path: '/appointments',
    name: 'Appointments',
    component: Appointments
  },
  {
    path: '/regadmin',
    name: 'RegAdmin',
    component: RegAdmin
  },
  {
    path: '/regstaff',
    name: 'RegStaff',
    component: RegStaff
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
