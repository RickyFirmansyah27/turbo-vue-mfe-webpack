<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Assets</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        title="Equipment"
        description="Manage company equipment assets."
        imageUrl="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      >
        <div class="mt-4">
          <Button label="View Assets" type="primary" @click="viewAssets('equipment')" />
        </div>
      </Card>
      <Card
        title="Vehicles"
        description="Manage vehicle fleet."
        imageUrl='https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      >
        <div class="mt-4">
          <Button label="View Assets" type="secondary" @click="viewAssets('vehicles')" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { Card, Button } from 'commons/Components';

export default {
  name: 'Asset',
  components: {
    Card,
    Button
  },
  methods: {
    viewAssets(type) {
      alert(`Viewing ${type} assets`);
    }
  }
};
</script>
