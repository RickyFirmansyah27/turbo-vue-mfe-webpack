import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/tailwind.css';
import routes from './router'; // Imports the routes array

Vue.use(VueRouter);

Vue.config.productionTip = false;

// The mount function is called by the shell or by the standalone startup
export const mount = (element, { router: shellRouter } = {}) => {
  const router = shellRouter
    ? shellRouter
    : new VueRouter({
        mode: 'history',
        routes: [...routes, { path: '/', redirect: '/management' }]
      });

  const appInstance = new Vue({
    router, // Provide the router to the Vue instance
    render: h => h(App)
  }).$mount(element);

  return {
    unmount: () => {
      appInstance.$destroy();
      if (element instanceof Element) {
        element.innerHTML = '';
      }
    }
  };
};

// If running standalone, find the root element and mount the app
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#management');
  if (devRoot) {
    mount(devRoot);
  }
}