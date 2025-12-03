<template>
  <div class="mb-8 flex justify-end">
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div class="flex items-center space-x-3">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-700">Dark Mode</span>
        </div>
        <ToggleSwitch
          :value="value"
          @change="$emit('input', $event)"
        />
      </div>
      <p class="text-xs text-gray-500 mt-1">Switch between light and dark themes</p>
    </div>
  </div>
</template>

<script>
import { ToggleSwitch } from './index.js';

export default {
  name: 'DarkModeToggle',
  components: {
    ToggleSwitch
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  emits: ['input']
};
</script>