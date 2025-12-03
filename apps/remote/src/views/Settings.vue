<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <PageHeader
      title="Settings"
      subtitle="Customize your experience and manage your account preferences"
      gradient="from-indigo-600 to-purple-600"
      subtitle-color="text-indigo-100"
    />

    <div class="max-w-7xl mx-auto p-8">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Settings Navigation -->
        <div class="lg:col-span-1">
          <SettingsSidebar
            :sections="settingsSections"
            :active-section="activeSection"
            @section-change="activeSection = $event"
          />
        </div>

        <!-- Settings Content -->
        <div class="lg:col-span-2">
          <!-- Account Settings -->
          <div v-if="activeSection === 'account'" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div class="space-y-6">
              <FormField
                label="Email Address"
                type="email"
                v-model="settings.account.email"
                required
              />
              <FormField
                label="Display Name"
                v-model="settings.account.displayName"
                required
              />
              <FormField
                label="Timezone"
                type="select"
                v-model="settings.account.timezone"
                :options="[
                  { value: 'UTC-8', label: 'Pacific Time (UTC-8)' },
                  { value: 'UTC-5', label: 'Eastern Time (UTC-5)' },
                  { value: 'UTC+0', label: 'GMT (UTC+0)' },
                  { value: 'UTC+1', label: 'Central European Time (UTC+1)' },
                  { value: 'UTC+7', label: 'Indochina Time (UTC+7)' },
                  { value: 'UTC+9', label: 'Japan Standard Time (UTC+9)' }
                ]"
              />
              <Button
                label="Save Account Settings"
                type="primary"
                @click="saveAccountSettings"
              />
            </div>
          </div>

          <!-- Notification Settings -->
          <div v-if="activeSection === 'notifications'" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Email Notifications</h3>
                  <p class="text-sm text-gray-600">Receive notifications via email</p>
                </div>
                <ToggleSwitch v-model="settings.notifications.email" />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Push Notifications</h3>
                  <p class="text-sm text-gray-600">Receive push notifications in browser</p>
                </div>
                <ToggleSwitch v-model="settings.notifications.push" />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">SMS Notifications</h3>
                  <p class="text-sm text-gray-600">Receive important alerts via SMS</p>
                </div>
                <ToggleSwitch v-model="settings.notifications.sms" />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Marketing Communications</h3>
                  <p class="text-sm text-gray-600">Receive updates about new features and promotions</p>
                </div>
                <ToggleSwitch v-model="settings.notifications.marketing" />
              </div>

              <Button
                label="Save Notification Settings"
                type="primary"
                @click="saveNotificationSettings"
              />
            </div>
          </div>

          <!-- Appearance Settings -->
          <div v-if="activeSection === 'appearance'" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Appearance</h2>
            <div class="space-y-6">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-4">Theme</label>
                <div class="grid grid-cols-3 gap-4">
                  <button
                    v-for="theme in themes"
                    :key="theme.id"
                    @click="settings.appearance.theme = theme.id"
                    :class="[
                      'p-4 border-2 rounded-lg transition-all duration-200',
                      settings.appearance.theme === theme.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    ]"
                  >
                    <div :class="['w-full h-16 rounded mb-2', theme.preview]"></div>
                    <span class="text-sm font-medium">{{ theme.name }}</span>
                  </button>
                </div>
              </div>

              <FormField
                label="Language"
                type="select"
                v-model="settings.appearance.language"
                :options="[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Español' },
                  { value: 'fr', label: 'Français' },
                  { value: 'de', label: 'Deutsch' },
                  { value: 'id', label: 'Bahasa Indonesia' },
                  { value: 'zh', label: '中文' }
                ]"
              />

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Compact Mode</h3>
                  <p class="text-sm text-gray-600">Use smaller spacing and components</p>
                </div>
                <ToggleSwitch v-model="settings.appearance.compactMode" />
              </div>

              <Button
                label="Save Appearance Settings"
                type="primary"
                @click="saveAppearanceSettings"
              />
            </div>
          </div>

          <!-- Privacy Settings -->
          <div v-if="activeSection === 'privacy'" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Privacy & Security</h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Profile Visibility</h3>
                  <p class="text-sm text-gray-600">Make your profile visible to other users</p>
                </div>
                <ToggleSwitch v-model="settings.privacy.profileVisible" />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Activity Status</h3>
                  <p class="text-sm text-gray-600">Show when you're online</p>
                </div>
                <ToggleSwitch v-model="settings.privacy.showOnlineStatus" />
              </div>

              <div class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h3 class="font-medium text-gray-900">Data Analytics</h3>
                  <p class="text-sm text-gray-600">Help improve our service with usage data</p>
                </div>
                <ToggleSwitch v-model="settings.privacy.analyticsEnabled" />
              </div>

              <div class="p-4 border border-red-200 rounded-lg bg-red-50">
                <h3 class="font-medium text-red-900 mb-2">Danger Zone</h3>
                <p class="text-sm text-red-700 mb-4">These actions cannot be undone. Please be certain.</p>
                <div class="space-y-3">
                  <Button
                    label="Delete Account"
                    type="secondary"
                    class="bg-red-600 hover:bg-red-700 text-white border-red-600"
                    @click="deleteAccount"
                  />
                  <Button
                    label="Export Data"
                    type="secondary"
                    @click="exportData"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Integration Settings -->
          <div v-if="activeSection === 'integrations'" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-6">Integrations</h2>
            <div class="space-y-6">
              <div v-for="integration in integrations" :key="integration.id" class="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div class="flex items-center space-x-4">
                  <img :src="integration.logo" :alt="integration.name" class="w-10 h-10 rounded">
                  <div>
                    <h3 class="font-medium text-gray-900">{{ integration.name }}</h3>
                    <p class="text-sm text-gray-600">{{ integration.description }}</p>
                  </div>
                </div>
                <Button
                  :label="integration.connected ? 'Disconnect' : 'Connect'"
                  :type="integration.connected ? 'secondary' : 'primary'"
                  @click="toggleIntegration(integration.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PageHeader, SettingsSidebar, FormField, ToggleSwitch, Button } from 'commons/Components';

export default {
  name: 'Settings',
  components: {
    PageHeader,
    SettingsSidebar,
    FormField,
    ToggleSwitch,
    Button
  },
  data() {
    return {
      activeSection: 'account',
      settingsSections: [
        {
          id: 'account',
          name: 'Account',
          icon: 'UserIcon'
        },
        {
          id: 'notifications',
          name: 'Notifications',
          icon: 'BellIcon'
        },
        {
          id: 'appearance',
          name: 'Appearance',
          icon: 'PaletteIcon'
        },
        {
          id: 'privacy',
          name: 'Privacy & Security',
          icon: 'ShieldIcon'
        },
        {
          id: 'integrations',
          name: 'Integrations',
          icon: 'CogIcon'
        }
      ],
      settings: {
        account: {
          email: 'john.doe@example.com',
          displayName: 'John Doe',
          timezone: 'UTC+7'
        },
        notifications: {
          email: true,
          push: true,
          sms: false,
          marketing: false
        },
        appearance: {
          theme: 'light',
          language: 'en',
          compactMode: false
        },
        privacy: {
          profileVisible: true,
          showOnlineStatus: true,
          analyticsEnabled: true
        }
      },
      themes: [
        {
          id: 'light',
          name: 'Light',
          preview: 'bg-white border-gray-200'
        },
        {
          id: 'dark',
          name: 'Dark',
          preview: 'bg-gray-900 border-gray-700'
        },
        {
          id: 'auto',
          name: 'Auto',
          preview: 'bg-gradient-to-r from-white to-gray-100'
        }
      ],
      integrations: [
        {
          id: 'slack',
          name: 'Slack',
          description: 'Connect your Slack workspace',
          logo: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg',
          connected: true
        },
        {
          id: 'google',
          name: 'Google Workspace',
          description: 'Integrate with Google services',
          logo: 'https://cdn.worldvectorlogo.com/logos/google-2015.svg',
          connected: false
        },
        {
          id: 'microsoft',
          name: 'Microsoft 365',
          description: 'Connect Microsoft services',
          logo: 'https://cdn.worldvectorlogo.com/logos/microsoft-5.svg',
          connected: false
        },
        {
          id: 'github',
          name: 'GitHub',
          description: 'Link your GitHub account',
          logo: 'https://cdn.worldvectorlogo.com/logos/github-icon-1.svg',
          connected: true
        }
      ]
    }
  },
  components: {
    UserIcon: {
      template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>'
    },
    BellIcon: {
      template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5-5a6 6 0 00-10 0l-5 5h5m0 0v4a2 2 0 004 0v-4m-6 0h6"></path></svg>'
    },
    PaletteIcon: {
      template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z"></path></svg>'
    },
    ShieldIcon: {
      template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>'
    },
    CogIcon: {
      template: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>'
    }
  },
  methods: {
    saveAccountSettings() {
      alert('Account settings saved!');
    },
    saveNotificationSettings() {
      alert('Notification settings saved!');
    },
    saveAppearanceSettings() {
      alert('Appearance settings saved!');
    },
    toggleIntegration(integrationId) {
      const integration = this.integrations.find(i => i.id === integrationId);
      if (integration) {
        integration.connected = !integration.connected;
        alert(`${integration.name} ${integration.connected ? 'connected' : 'disconnected'}!`);
      }
    },
    deleteAccount() {
      if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        alert('Account deletion initiated. You will receive a confirmation email.');
      }
    },
    exportData() {
      alert('Data export initiated. You will receive an email with your data.');
    }
  }
}
</script>