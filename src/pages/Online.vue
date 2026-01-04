<template>
  <div class="online-container">
    <header class="page-header">
      <div class="header-content">
        <h1>Online Portfolios</h1>
        <p class="subtitle">Explore creative works from our online community</p>
      </div>
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by name, author, or tag..." 
          class="search-input"
        />
        <div class="search-icon">🔍</div>
      </div>
    </header>

    <div v-if="isLoading" class="loader-wrapper">
      <div class="spinner"></div>
      <p>Fetching data from Google Sheets...</p>
    </div>
    
    <div v-else-if="error" class="error-notice">
      <p>⚠️ {{ error }}</p>
      <button @click="refresh">Try Again</button>
    </div>

    <div v-else class="card-grid">
      <div v-for="(row, idx) in filteredRows" :key="idx" class="p-card">
        
        <div class="p-card-header">
          <img v-if="row[3]" :src="row[3]" class="p-image" alt="Portfolio Preview" />
          <div v-else class="p-fallback">
            <span>{{ row[7]?.charAt(0).toUpperCase() || 'P' }}</span>
          </div>
          <span v-if="row[4]" class="p-category">{{ row[4].split(',')[0] }}</span>
        </div>

        <div class="p-card-body">
          <div class="p-meta">
            <span class="p-date">{{ row[5] }}</span>
            <span class="p-author">@{{ row[7] || 'anonymous' }}</span>
          </div>
          
          <h2 class="p-title">{{ row[1] }}</h2>
          <p class="p-desc">{{ row[2] }}</p>

          <div class="p-grades">
            <span v-for="g in row[6]?.split(',')" :key="g" class="grade-pill">
              Gr. {{ g }}
            </span>
          </div>

          <a :href="row[0]" target="_blank" class="p-action-btn">
            Open Portfolio
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGoogleSheet } from '@/composables/useGoogleSheet';

const { fetchData, isLoading, error } = useGoogleSheet();
const rawData = ref([]);
const searchQuery = ref('');

const refresh = async () => {
  const data = await fetchData('A1:H'); // Fetches: link, title, desc, thumb, tag, date, grade, author
  if (data) rawData.value = data;
};

onMounted(refresh);

const filteredRows = computed(() => {
  if (rawData.value.length === 0) return [];
  
  const actualData = rawData.value.slice(1); // Remove headers
  if (!searchQuery.value) return actualData;

  const term = searchQuery.value.toLowerCase();
  return actualData.filter(item => {
    return (item[1]?.toLowerCase().includes(term)) || // Title
           (item[7]?.toLowerCase().includes(term)) || // Author
           (item[4]?.toLowerCase().includes(term));   // Tags
  });
});
</script>

<style scoped>
.online-container { padding: 2rem; max-width: 1300px; margin: 0 auto; }

/* Header & Search */
.page-header { margin-bottom: 3rem; text-align: center; }
h1 { font-size: 2.5rem; font-weight: 900; color: #0f172a; margin-bottom: 0.5rem; }
.subtitle { color: #64748b; margin-bottom: 1.5rem; }

.search-box { position: relative; max-width: 500px; margin: 0 auto; }
.search-input { 
  width: 100%; padding: 1rem 1.5rem; border-radius: 50px; border: 1px solid #e2e8f0;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); outline: none; transition: 0.2s;
}
.search-input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2); }

/* Grid Logic */
.card-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem;
}

/* Card Visuals */
.p-card { 
  background: #fff; border-radius: 1.25rem; border: 1px solid #f1f5f9;
  overflow: hidden; transition: 0.3s ease; display: flex; flex-direction: column;
}
.p-card:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1); }

/* Image & Fallback */
.p-card-header { position: relative; height: 180px; background: #f8fafc; }
.p-image { width: 100%; height: 100%; object-fit: cover; }
.p-fallback { 
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%); color: #fff; font-size: 3rem; font-weight: bold;
}
.p-category { 
  position: absolute; top: 1rem; left: 1rem; background: rgba(255, 255, 255, 0.95);
  padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.7rem; font-weight: 700; color: #1e293b;
}

/* Body Content */
.p-card-body { padding: 1.5rem; flex-grow: 1; display: flex; flex-direction: column; }
.p-meta { display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.5rem; }
.p-date { color: #94a3b8; }
.p-author { color: #6366f1; font-weight: 600; }
.p-title { font-size: 1.25rem; font-weight: 800; color: #1e293b; margin-bottom: 0.5rem; }
.p-desc { font-size: 0.9rem; color: #475569; line-height: 1.6; margin-bottom: 1rem; display: -webkit-box; -webkit-box-orient: vertical; overflow: hidden; }

.p-grades { display: flex; flex-wrap: wrap; gap: 0.4rem; margin-bottom: 1.5rem; }
.grade-pill { font-size: 0.7rem; background: #f1f5f9; color: #475569; padding: 0.2rem 0.6rem; border-radius: 0.25rem; }

.p-action-btn { 
  margin-top: auto; text-align: center; background: #0f172a; color: #fff;
  text-decoration: none; padding: 0.8rem; border-radius: 0.75rem; font-weight: 600; transition: 0.2s;
}
.p-action-btn:hover { background: #6366f1; }
</style>