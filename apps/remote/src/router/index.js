import { Checkpoints } from 'commons/Utils';
import Dashboard from '../views/Dashboard.vue';
import Profile from '../views/Profile.vue';
import Settings from '../views/Settings.vue';

const routes = [
  {
    path: Checkpoints.assets,
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: Checkpoints.assetsProfile,
    name: 'Profile',
    component: Profile
  },
  {
    path: Checkpoints.assetsSetting,
    name: 'Settings',
    component: Settings
  },
  {
    path: Checkpoints.assetsReport,
    name: 'Report',
    component: () => import('../views/Report.vue')
  },
    {
    path: Checkpoints.assetsList,
    name: 'Report',
    component: () => import('../views/Asset.vue')
  },

];

export default routes;