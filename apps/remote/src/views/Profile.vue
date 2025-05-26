<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">User Profile</h2>
    <div class="bg-white shadow rounded-lg p-6">
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input 
            type="text" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            v-model="profile.name"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            type="email" 
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            v-model="profile.email"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: 'John Doe',
        email: 'john@example.com'
      }
    }
  }
}
</script>