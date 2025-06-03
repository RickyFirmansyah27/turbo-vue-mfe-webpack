<template>
  <div>
    <div class="bg-white shadow rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">Remote Component</h2>
      <p class="text-gray-600 mb-4">
        This component is loaded from the remote application.
      </p>
      <RemoteFeature />
    </div>

    <e-card
      title="Remote Card"
      description="This is a card component loaded from the remote application."
    >
    <e-select
      v-model="payload.selectedCategory"
      :options="categoryOptions"
      label="Select Category"
      wrapperClass="mb-4"
      selectClass="border-gray-300"
    />
    </e-card>
  </div>
</template>

<script>
import { Dropdown, CardView } from 'commons/Components'

export default {
  name: 'RemoteAppWrapper',
  components: {
    RemoteFeature: () => import('remote/Feature'),
    'e-select': Dropdown,
    'e-card': CardView,
  },
  data() {
    return {
      payload: {
        selectedCategory: null,
      },
      selectedCategory: '',
      categoryOptions: [
        { id: 0, key: null, descriptions: 'Silahkan Pilih Category' },
        { id: 1, key: 'tech', descriptions: 'Technology' },
        { id: 2, key: 'health', descriptions: 'Health' },
        { id: 3, key: 'edu', descriptions: 'Education' },
      ],
    }
  },
}
</script>
