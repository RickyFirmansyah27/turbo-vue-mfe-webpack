<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <nav class="space-y-2">
      <button
        v-for="section in sections"
        :key="section.id"
        @click="$emit('section-change', section.id)"
        :class="[
          'w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center space-x-3',
          activeSection === section.id
            ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
            : 'text-gray-700 hover:bg-gray-50'
        ]"
      >
        <component :is="section.icon" class="w-5 h-5" />
        <span class="font-medium">{{ section.name }}</span>
      </button>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'SettingsSidebar',
  props: {
    sections: {
      type: Array,
      required: true
    },
    activeSection: {
      type: String,
      required: true
    }
  },
  emits: ['section-change']
};
</script>