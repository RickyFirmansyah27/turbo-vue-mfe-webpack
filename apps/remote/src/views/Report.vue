<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Reports</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card
        title="Sales Report"
        description="View monthly sales data and trends."
        imageUrl="https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      >
        <div class="mt-4">
          <Button label="View Report" type="primary" @click="viewReport('sales')" />
        </div>
      </Card>
      <Card
        title="Inventory Report"
        description="Check current inventory levels."
        imageUrl='https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      >
        <div class="mt-4">
          <Button label="View Report" type="secondary" @click="viewReport('inventory')" />
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import { Card, Button } from 'commons/Components';

export default {
  name: 'Report',
  components: {
    Card,
    Button
  },
  methods: {
    viewReport(type) {
      alert(`Viewing ${type} report`);
    }
  }
};
</script>
