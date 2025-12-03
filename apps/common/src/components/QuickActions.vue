<template>
  <div class="bg-white shadow rounded-lg p-6">
    <h3 class="text-lg font-semibold mb-4">Quick Actions</h3>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <router-link :to="checkpoints.remoteProfile" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
        <span class="text-primary-700 font-medium">View Profile</span>
      </router-link>
      <router-link :to="checkpoints.remoteSettings" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
        <span class="text-primary-700 font-medium">Settings</span>
      </router-link>
      <router-link :to="checkpoints.reports" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
        <span class="text-primary-700 font-medium">Reports</span>
      </router-link>
      <router-link :to="checkpoints.assets" class="block p-4 bg-primary-50 rounded-lg hover:bg-primary-100 transition">
        <span class="text-primary-700 font-medium">Assets</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuickActions',
  props: {
    checkpoints: {
      type: Object,
      required: true
    }
  }
};
</script>