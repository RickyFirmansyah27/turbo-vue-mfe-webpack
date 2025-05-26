<template>
  <div ref="remoteApp"></div>
</template>

<script>
import { mount } from 'remote/bootstrap';

export default {
  name: 'RemoteAdaptor',
  props: {
    reactQueryClient: {
      type: Object,
      required: false,
    },
  },
  mounted() {
    const initialPath = this.$route.path;

    const { onParentNavigation } = mount(this.$refs.remoteApp, {
      initialPath,
      router: this.$router,
      reactQueryClient: this.reactQueryClient,
      onParentNavigation: ({ pathname: nextPathname }) => {
        const currentPathname = this.$route.path;

        // Guard against redundant navigation
        if (currentPathname !== nextPathname) {
          this.$router.push(nextPathname).catch(err => {
            // Ignore NavigationDuplicated errors
            if (err.name !== 'NavigationDuplicated') {
              throw err;
            }
          });
        }
      },
    });

    if (onParentNavigation) {
      this.unlisten = this.$router.afterEach((to, from) => {
        // Avoid calling navigation if we're already at the target
        if (to.path !== from.path) {
          onParentNavigation({ pathname: to.path });
        }
      });
    }
  },
  beforeUnmount() {
    if (this.unlisten) {
      this.unlisten();
      this.unlisten = null;
    }
  },
};
</script>