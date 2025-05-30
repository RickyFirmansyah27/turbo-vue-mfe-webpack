<template>
  <div>
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Remote Application</h2>
      <p class="text-gray-600 mb-4">
        This component is loaded from the remote application.
      </p>
      <RemoteFeature />

      
    </div>
  </div>
</template>

<script>
export default {
  name: 'RemoteAppWrapper',
   components: {
   RemoteFeature: () => import('remote/Feature'),
  },
  data() {
    return {
      remoteAppComponent: null
    }
  },
}
</script>