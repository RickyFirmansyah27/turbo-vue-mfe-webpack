import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';

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

export default routes;