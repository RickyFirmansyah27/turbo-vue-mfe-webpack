<template>
  <div :class="headerClass" class="text-white p-8 rounded-2xl">
    <div class="max-w-7xl mx-auto">
      <h1 class="text-4xl font-bold mb-2">{{ title }}</h1>
      <p :class="subtitleClass" class="text-lg">{{ subtitle }}</p>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      default: ''
    },
    gradient: {
      type: String,
      default: 'from-blue-600 to-indigo-700'
    },
    subtitleColor: {
      type: String,
      default: 'text-blue-100'
    }
  },
  computed: {
    headerClass() {
      return `bg-gradient-to-r ${this.gradient}`;
    },
    subtitleClass() {
      return this.subtitleColor;
    }
  }
};
</script>