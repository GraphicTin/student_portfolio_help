<template>
  <div class="page-content">

    <div class="page-title">
        <h1> Online </h1>
    </div>

    <div class="grid">
      <template v-if="isLoading">
        <ContentCard v-for="n in 6" :key="n" :loading="true" />
      </template>

      <template v-else>
        <ContentCard 
          v-for="(row, index) in filteredPortfolios" 
          :key="index" 
          :data="row" 
        />
      </template>
    </div>

    
</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGoogleSheet } from '@/composables/useGoogleSheet';
import ContentCard from '@/components/ContentCard.vue';
// import SearchBar from '@/components/SearchBar.vue';

const { fetchData, isLoading } = useGoogleSheet();
const rawPortfolios = ref([]);
const searchText = ref('');

onMounted(async () => {
    const data = await fetchData('A1:H');
    if (data) rawPortfolios.value = data.slice(1);
});


// 4. The Filter Logic
const filteredPortfolios = computed(() => {
    if (!searchText.value) return rawPortfolios.value;

    return rawPortfolios.value.filter(row => {
        // Check Title (Index 1) or Author (Index 7)
        return row[1]?.toLowerCase().includes(searchText.value) || 
            row[7]?.toLowerCase().includes(searchText.value);
    });
});
</script>

<style>

    .page-content {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 90%;
        max-width: 800px;
        gap: 32px;
        margin-bottom: 32px;
    }

    .page-title h1 {
        font-size: 3rem;  
    }
    .page-title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: stretch;
        width: 100%;
        max-width: 800px;;
        gap: 32px;
        margin-top: 32px;
        border: 0px;
    }
    

</style>