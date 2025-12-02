<![CDATA[<template>
  <div class="flex items-center justify-between">
    <div>
      <h3 class="text-lg font-medium text-gray-900">{{ label }}</h3>
      <p v-if="description" class="text-sm text-gray-500">{{ description }}</p>
    </div>
    <label class="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" :checked="value" @change="$emit('input', $event.target.checked)" class="sr-only peer">
      <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
    </label>
  </div>
</template>

<script>
export default {
  name: 'ToggleSwitch',
  props: {
    label: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    value: {
      type: Boolean,
      required: true
    }
  }
}
</script>
]]>