<template>
  <div class="openhouse-container">
    <header class="page-header">
      <h1>Portfolio Gallery</h1>
      <div class="search-wrapper">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search projects, authors, or tags..." 
          class="styled-input"
        />
      </div>
    </header>

    <div v-if="isLoading" class="status-msg">Loading portfolios...</div>
    <div v-else-if="error" class="status-msg error">{{ error }}</div>

    <div v-else class="portfolio-grid">
      <div v-for="(item, idx) in filteredPortfolios" :key="idx" class="portfolio-card">
        
        <div class="card-image-area">
          <img v-if="item[3]" :src="item[3]" class="portfolio-img" alt="Thumbnail" />
          <div v-else class="no-image-placeholder">
            <span>{{ item[7]?.charAt(0).toUpperCase() || 'P' }}</span>
          </div>
          <div class="category-pill">{{ item[4]?.split(',')[0] }}</div>
        </div>

        <div class="card-body">
          <p class="date-text">{{ item[5] }}</p>
          <h3 class="title">{{ item[1] }}</h3>
          <p class="author">by @{{ item[7] || 'anonymous' }}</p>
          <p class="desc">{{ item[2] }}</p>
          
          <div class="tag-container">
            <span v-for="tag in item[4]?.split(',')" :key="tag" class="tag">
              #{{ tag.trim() }}
            </span>
          </div>

          <a :href="item[0]" target="_blank" class="main-link">View Portfolio</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useGoogleSheet } from '@/composables/useGoogleSheet';

const { fetchData, isLoading, error } = useGoogleSheet();
const rawRows = ref([]);
const searchQuery = ref('');

onMounted(async () => {
  // Fetch columns A through H (Link to Author)
  const data = await fetchData('A1:H'); 
  if (data) rawRows.value = data;
});

const filteredPortfolios = computed(() => {
  const dataOnly = rawRows.value.slice(1);
  if (!searchQuery.value) return dataOnly;
  
  const query = searchQuery.value.toLowerCase();
  return dataOnly.filter(row => {
    return (row[1]?.toLowerCase().includes(query)) || // Title
           (row[7]?.toLowerCase().includes(query)) || // Author
           (row[4]?.toLowerCase().includes(query));   // Tags
  });
});
</script>

<style scoped>
.openhouse-container { padding: 40px 20px; max-width: 1200px; margin: 0 auto; font-family: 'Inter', sans-serif; }
.page-header { text-align: center; margin-bottom: 50px; }
h1 { font-size: 2.5rem; font-weight: 800; margin-bottom: 20px; color: #1a1a1a; }

/* Search Bar Styling */
.styled-input {
  width: 100%; max-width: 500px; padding: 12px 20px; border-radius: 30px;
  border: 2px solid #eee; font-size: 1rem; transition: all 0.3s ease;
}
.styled-input:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 15px rgba(59, 130, 246, 0.1); }

/* Grid Layout */
.portfolio-grid {
  display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 30px;
}

/* Card Styling */
.portfolio-card {
  background: white; border-radius: 20px; overflow: hidden;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05); transition: transform 0.3s ease;
  border: 1px solid #f0f0f0; display: flex; flex-direction: column;
}
.portfolio-card:hover { transform: translateY(-10px); }

/* Image Area & Placeholder */
.card-image-area { position: relative; height: 200px; width: 100%; background: #f8f9fa; }
.portfolio-img { width: 100%; height: 100%; object-fit: cover; }
.no-image-placeholder {
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%); color: white; font-size: 3rem; font-weight: bold;
}
.category-pill {
  position: absolute; top: 15px; left: 15px; background: rgba(255,255,255,0.9);
  padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase;
}

/* Content Styling */
.card-body { padding: 20px; flex-grow: 1; display: flex; flex-direction: column; }
.date-text { font-size: 11px; color: #999; margin-bottom: 5px; }
.title { font-size: 1.25rem; font-weight: 700; margin-bottom: 5px; color: #111; }
.author { font-size: 13px; color: #6366f1; font-weight: 600; margin-bottom: 12px; }
.desc { font-size: 14px; color: #666; line-height: 1.5; margin-bottom: 15px; }

.tag-container { display: flex; flex-wrap: wrap; gap: 5px; margin-bottom: 20px; }
.tag { font-size: 11px; background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; }

.main-link {
  margin-top: auto; text-align: center; background: #1a1a1a; color: white;
  text-decoration: none; padding: 12px; border-radius: 12px; font-weight: 600; transition: background 0.2s;
}
.main-link:hover { background: #4f46e5; }
</style>