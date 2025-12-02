<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold mb-4">Settings</h2>
    <div class="bg-white shadow rounded-lg p-6">
      <div class="space-y-4">
        <ToggleSwitch
          label="Notifications"
          description="Manage your notification preferences"
          v-model="settings.notifications"
        />
        <ToggleSwitch
          label="Dark Mode"
          description="Toggle dark mode theme"
          v-model="settings.darkMode"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ToggleSwitch } from 'commons/Components';

export default {
  name: 'Settings',
  components: {
    ToggleSwitch
  },
  data() {
    return {
      settings: {
        notifications: true,
        darkMode: false
      }
    }
  }
}
</script>