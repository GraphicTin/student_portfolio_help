<template>
    <div class="page-content">
      <header class="page-header">
        <div class="header-info">
          <h1 class="title-gradient">{{ pageTitle }}</h1>
          <p class="subtitle">Showing {{ filteredPortfolios.length }} entries from {{ currentPage }}</p>
        </div>
        
        <div class="search-wrapper">
          <input 
            v-model="searchText" 
            type="text" 
            placeholder="Search title or author..." 
            class="search-input"
          />
        </div>
      </header>
  
      <div class="grid">
        <template v-if="isLoading">
          <div v-for="n in 6" :key="n" class="skeleton-card">
            <div class="skeleton-thumb"></div>
            <div class="skeleton-line long"></div>
            <div class="skeleton-line short"></div>
          </div>
        </template>
  
        <template v-else>
          <ContentCard 
            v-for="(row, index) in filteredPortfolios" 
            :key="index" 
            :data="row" 
          />
        </template>
      </div>
  
      <div v-if="!isLoading && filteredPortfolios.length === 0" class="empty-state">
        No results found in {{ currentPage }} for "{{ searchText }}"
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  import { useGoogleSheet } from '@/composables/useGoogleSheet';
  import { useNavigation } from '@/composables/useNavigation'; // Import to track the page
  import ContentCard from '@/components/ContentCard.vue';
  
  const { currentPage } = useNavigation();
  const { fetchData, isLoading } = useGoogleSheet();
  const rawPortfolios = ref([]);
  const searchText = ref('');
  
  // Format the title (e.g., 'oguide' -> 'O-Guide')
  const pageTitle = computed(() => {
    const name = currentPage.value || 'Portfolio';
    return name.charAt(0).toUpperCase() + name.slice(1);
  });
  
  const loadData = async () => {
    rawPortfolios.value = []; // Clear current data to prevent ghosting
    const data = await fetchData('A1:H');
    if (data) {
      rawPortfolios.value = data.slice(1);
    }
  };
  
  // Re-fetch data whenever the user switches tabs/pages
  watch(currentPage, loadData);
  
  onMounted(loadData);
  
  const filteredPortfolios = computed(() => {
    const query = searchText.value.toLowerCase().trim();
    if (!query) return rawPortfolios.value;
  
    return rawPortfolios.value.filter(row => {
      const title = row[1]?.toString().toLowerCase() || '';
      const author = row[7]?.toString().toLowerCase() || '';
      return title.includes(query) || author.includes(query);
    });
  });
  </script>
  
  <style scoped>
  /* Styles remain identical to your previous version */
  .page-content { width: 90%; max-width: 1000px; margin: 0 auto; padding: 40px 0; display: flex; flex-direction: column; gap: 32px; }
  .page-header { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: flex-end; gap: 20px; border-bottom: 1px solid #eee; padding-bottom: 24px; }
  .title-gradient { font-size: 3rem; font-weight: 800; margin: 0; background: linear-gradient(to right, #1a1a1a, #666); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
  .subtitle { color: #888; margin: 8px 0 0 0; }
  .search-input { padding: 12px 20px; border-radius: 99px; border: 1px solid #ddd; width: 250px; outline: none; transition: all 0.2s; }
  .search-input:focus { border-color: #000; box-shadow: 0 0 0 4px rgba(0,0,0,0.05); }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
  .skeleton-card { background: #fdfdfd; border: 1px solid #eee; border-radius: 12px; padding: 16px; }
  .skeleton-thumb { width: 100%; aspect-ratio: 16/9; background: #eee; border-radius: 8px; margin-bottom: 16px; position: relative; overflow: hidden; }
  .skeleton-line { height: 16px; background: #eee; border-radius: 4px; margin-bottom: 10px; position: relative; overflow: hidden; }
  .long { width: 80%; } .short { width: 40%; }
  .skeleton-thumb::after, .skeleton-line::after { content: ""; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent); transform: translateX(-100%); animation: shimmer 1.5s infinite; }
  @keyframes shimmer { 100% { transform: translateX(100%); } }
  .empty-state { text-align: center; padding: 60px; color: #999; }
  </style>