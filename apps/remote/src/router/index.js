import { Checkpoints } from 'commons/Utils';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';

const routes = [
  {
    path: Checkpoints.remote,
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: Checkpoints.remoteProfile,
    name: 'Profile',
    component: Profile
  },
  {
    path: Checkpoints.remoteSettings,
    name: 'Settings',
    component: Settings
  }
];

export default routes;