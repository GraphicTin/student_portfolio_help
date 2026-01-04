<template>
  <div class="container">
    <header>
      <h1>Online Registration</h1>
      <button @click="refreshData" :disabled="isLoading">
        {{ isLoading ? 'Refreshing...' : 'Refresh Data' }}
      </button>
    </header>

    <div v-if="error" class="error-box">{{ error }}</div>

    <div v-if="isLoading" class="loading-state">
      <p>Loading your sheet data...</p>
    </div>

    <div v-else class="table-container">
      <table v-if="sheetRows.length > 0">
        <thead>
          <tr>
            <th v-for="(header, index) in sheetRows[0]" :key="index">
              {{ header || 'Column ' + (index + 1) }}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in sheetRows.slice(1)" :key="rowIndex">
            <td v-for="(cell, cellIndex) in row" :key="cellIndex">
              {{ cell }}
            </td>
            <td>
              <button @click="handleEdit(rowIndex + 2)">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <p v-else>No data found in this sheet.</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onActivated } from 'vue';
import { useGoogleSheet } from '@/composables/useGoogleSheet';

const { fetchData, updateData, isLoading, error } = useGoogleSheet();
const sheetRows = ref([]);

const refreshData = async () => {
  const data = await fetchData('A1:E'); 
  if (data) sheetRows.value = data;
};
// onActivated(() => {
//   refreshData(); 
// });

const handleEdit = async (rowNumber) => {
  // Example: Updating column A and B of the specific row clicked
  // rowNumber uses +2 because index starts at 0 and we skipped the header row
  const range = `A${rowNumber}:B${rowNumber}`;
  await updateData(range, [['Checked', 'Confirmed']]);
  await refreshData(); // Refresh to see the change
};

onMounted(refreshData);
</script>

<style scoped>
.container { padding: 20px; font-family: sans-serif; }
header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }

.table-container { overflow-x: auto; background: white; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
table { width: 100%; border-collapse: collapse; text-align: left; }
th, td { padding: 12px 15px; border-bottom: 1px solid #eee; }
th { background-color: #f8f9fa; font-weight: bold; color: #333; }
tr:hover { background-color: #f1f4f9; }

.error-box { color: white; background: #ff4444; padding: 10px; border-radius: 4px; margin-bottom: 10px; }
.loading-state { text-align: center; padding: 40px; color: #666; }

button { cursor: pointer; padding: 8px 16px; border-radius: 4px; border: 1px solid #ccc; background: white; transition: 0.2s; }
button:hover { background: #e0e0e0; }
button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>