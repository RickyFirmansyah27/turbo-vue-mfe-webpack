<template>
  <div class="mb-6 flex justify-end">
    <ToggleSwitch
      label="Dark Mode"
      description="Toggle dark mode"
      :value="value"
      @change="$emit('input', $event)"
    />
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