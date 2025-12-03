<template>
  <div :class="wrapperClass">
    <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <div v-if="type === 'select'" class="relative">
      <select
        :id="inputId"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :class="inputClass"
        :required="required"
        :disabled="disabled"
      >
        <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </div>
    </div>

    <textarea
      v-else-if="type === 'textarea'"
      :id="inputId"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="inputClass"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :rows="rows"
      :maxlength="maxlength"
    ></textarea>

    <input
      v-else
      :id="inputId"
      :type="inputType"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="inputClass"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      :min="min"
      :max="max"
      :step="step"
    />

    <p v-if="hint" class="mt-1 text-sm text-gray-500">{{ hint }}</p>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormField',
  props: {
    label: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'email', 'password', 'number', 'tel', 'url', 'date', 'textarea', 'select'].includes(value)
    },
    modelValue: {
      type: [String, Number],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    rows: {
      type: [String, Number],
      default: 3
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    min: {
      type: [String, Number],
      default: null
    },
    max: {
      type: [String, Number],
      default: null
    },
    step: {
      type: [String, Number],
      default: null
    },
    wrapperClass: {
      type: String,
      default: ''
    }
  },
  emits: ['update:modelValue'],
  computed: {
    inputId() {
      return `field-${Math.random().toString(36).substr(2, 9)}`;
    },
    inputType() {
      return this.type;
    },
    inputClass() {
      const baseClass = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all';
      const disabledClass = this.disabled ? 'bg-gray-100 cursor-not-allowed' : '';
      const errorClass = this.error ? 'border-red-300 focus:ring-red-500' : '';

      if (this.type === 'textarea') {
        return `${baseClass} resize-vertical ${disabledClass} ${errorClass}`;
      }

      return `${baseClass} ${disabledClass} ${errorClass}`;
    }
  }
};
</script>