<template>
  <div :class="wrapperClass">
    <label v-if="label" class="block text-gray-700 font-medium mb-2">
      {{ label }}
    </label>
    <div class="relative">
      <select
        :value="value"
        @change="$emit('input', $event.target.value)"
        :class="[
          'w-full border rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer',
          selectClass
        ]"
      >
        <option
          v-for="option in options"
          :key="option.id"
          :value="option.key"
          :disabled="option.key === null"
          :class="option.key === null ? 'text-gray-400' : 'text-gray-700'"
        >
          {{ option.descriptions }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    value: [String, Number, null],
    options: {
      type: Array,
      required: true,
    },
    label: String,
    wrapperClass: {
      type: String,
      default: '',
    },
    selectClass: {
      type: String,
      default: '',
    },
  },
}
</script>
