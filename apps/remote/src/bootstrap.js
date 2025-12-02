import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import './assets/tailwind.css';
import routes from './router'; // Imports the routes array

Vue.config.productionTip = false;

// The mount function is called by the shell or by the standalone startup
export const mount = (element, { router: shellRouter } = {}) => {
  // Use the shell's router if provided, otherwise create one for standalone development
  const router =
    shellRouter ||
    new VueRouter({
      mode: 'history',
      routes // Use the imported routes for the standalone router
    });

  const appInstance = new Vue({
    router, // Provide the router to the Vue instance
    render: h => h(App)
  }).$mount(element);

  // The remote app no longer needs to inform the parent of navigation.
  // Since the router instance is shared, any navigation within the remote
  // will automatically be reflected in the shell.

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
  const devRoot = document.querySelector('#remote');
  if (devRoot) {
    // In standalone mode, we call mount without a router,
    // so it creates its own.
    mount(devRoot);
  }
}