<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <feature-component />
      <div class="bg-white shadow rounded-lg p-6">
        <h3 class="text-lg font-semibold mb-2">Quick Actions</h3>
        <div class="space-y-2">
          <router-link 
            to="/profile" 
            class="block text-primary-600 hover:text-primary-800"
          >
            View Profile
          </router-link>
          <router-link 
            to="/settings" 
            class="block text-primary-600 hover:text-primary-800"
          >
            Settings
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureComponent from '../components/Feature.vue';

export default {
  name: 'Dashboard',
  components: {
    FeatureComponent
  }
}
</script>