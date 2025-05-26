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

    const { onParentNavigation, unmount } = mount(this.$refs.remoteApp, {
      initialPath,
      router: this.$router,
      reactQueryClient: this.reactQueryClient,
      onParentNavigation: ({ pathname: nextPathname }) => {
        const currentPathname = this.$route.path;
        if (currentPathname !== nextPathname) {
          this.$router.push(nextPathname).catch(err => {
            if (err.name !== 'NavigationDuplicated') throw err;
          });
        }
      },
    });

    this.remoteUnmount = unmount; // simpan fungsi unmount

    if (onParentNavigation) {
      this.unlisten = this.$router.afterEach((to, from) => {
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
    if (this.remoteUnmount) {
      this.remoteUnmount();
      this.remoteUnmount = null;
    }
  }
};
</script>