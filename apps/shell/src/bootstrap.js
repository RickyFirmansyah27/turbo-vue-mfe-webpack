import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

Vue.config.productionTip = false;

Vue.use(VueRouter);

// Global error handler untuk NavigationDuplicated
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject);
  }
  return originalPush.call(this, location).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      throw err;
    }
  });
};

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');