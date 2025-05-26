<template>
  <div>
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Remote Application</h2>
      <p class="text-gray-600 mb-4">
        This component is loaded from the remote application.
      </p>

      <div v-if="remoteAppComponent">
        <component :is="remoteAppComponent" />
      </div>

      <div v-else class="bg-white shadow rounded-lg p-6 flex items-center justify-center">
        <div class="text-center">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mb-4"></div>
          <p class="text-gray-600">Loading remote application...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemoteAppWrapper',
  data() {
    return {
      remoteAppComponent: null
    }
  },
  methods: {
    async loadRemoteApp() {
      try {
        // Dynamically import remote app
        const RemoteApp = await import('remote/Feature');

        // Set the component directly
        this.remoteAppComponent = RemoteApp.default;

      } catch (error) {
        console.error('Failed to load remote application:', error);
      }
    }
  },
  mounted() {
    this.loadRemoteApp();
  }
}
</script>