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
    // Mount the remote app, passing the DOM element, the shell's router,
    // and any other required props.
    const { unmount } = mount(this.$refs.remoteApp, {
      router: this.$router,
      reactQueryClient: this.reactQueryClient,
    });

    // Store the unmount function to be called when the component is destroyed.
    this.remoteUnmount = unmount;
  },
  beforeUnmount() {
    // Call the unmount function returned from the remote's mount function.
    if (this.remoteUnmount) {
      this.remoteUnmount();
      this.remoteUnmount = null;
    }
  },
};
</script>