<template>
  <div class="bg-white rounded-2xl shadow-md overflow-hidden">
    <div v-if="imageUrl" class="h-48 w-full overflow-hidden">
      <img :src="imageUrl" :alt="title" class="w-full h-full object-cover" />
    </div>

    <div class="p-5">
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
      <p v-if="description" class="text-gray-600 mb-4">
        {{ description }}
      </p>

      <div>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardView',
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    imageUrl: {
      type: String,
      default: '',
      required: false
    }
  }
}
</script>
