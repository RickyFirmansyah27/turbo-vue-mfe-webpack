<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
    <div v-if="imageUrl" class="h-48 overflow-hidden">
      <img :src="imageUrl" :alt="title" class="w-full h-full object-cover">
    </div>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ title }}</h3>
      <p class="text-gray-600">{{ description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardComponent',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    imageUrl: {
      type: String,
      default: ''
    }
  }
}
</script>