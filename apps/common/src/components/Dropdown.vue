<template>
  <div :class="wrapperClass">
    <label v-if="label" class="block text-gray-700 font-medium mb-2">
      {{ label }}
    </label>
    <select
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200',
        selectClass
      ]"
    >
      <option
        v-for="option in options"
        :key="option.id"
        :value="option.key"
        :disabled="option.key === null"
      >
        {{ option.descriptions }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    modelValue: [String, Number, null],
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
