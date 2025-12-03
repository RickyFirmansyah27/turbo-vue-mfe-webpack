<template>
  <button
    :class="[
      'px-4 py-2 rounded-md text-white font-medium focus:outline-none transition-colors duration-200 ease-in-out flex items-center justify-center gap-2',
      typeClasses
    ]"
    @click="onClick"
  >
    <slot name="icon"></slot>
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'ButtonComponent',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'primary',
      validator: value => ['primary', 'secondary', 'accent'].includes(value)
    }
  },
  computed: {
    typeClasses() {
      const classes = {
        'primary': 'bg-primary-600 hover:bg-primary-700',
        'secondary': 'bg-secondary-600 hover:bg-secondary-700',
        'accent': 'bg-accent-600 hover:bg-accent-700'
      };
      
      return classes[this.type] || classes.primary;
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }
  }
}
</script>