import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/remote',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/remote/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/remote/settings',
    name: 'Settings',
    component: Settings
  }
];

const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
});

export default router;