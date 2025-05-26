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
      reactQueryClient: this.reactQueryClient,
      onParentNavigation: ({ pathname: nextPathname }) => {
        const currentPathname = this.$route.path;

        if (currentPathname !== nextPathname) {
          this.$router.push(nextPathname);
        }
      },
    });

    if (onParentNavigation) {
      this.unlisten = this.$router.afterEach((to) => {
        onParentNavigation({ pathname: to.path });
      });
    }
  },
  beforeUnmount() { // atau beforeDestroy untuk Vue 2
    if (this.unlisten) {
      this.unlisten();
      this.unlisten = null;
    }
  },
};
</script>