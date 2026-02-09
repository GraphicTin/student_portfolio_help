<template>
    <div class="nav-overlay">
      <div class="primary-nav">
        <CategoryCard 
          title="home" 
          icon="🏠" 
          :image="image_home"
          :is-active="currentPage === 'main_menu'"
          @clicked="handlePageChange('main_menu')"
          class="home-card"
        />
      </div>
  
      <div class="card_holder">
        <CategoryCard 
          v-for="item in categoryItems"
          :key="item.id"
          :title="item.label" 
          :icon="item.icon" 
          :image="item.image"
          :is-active="currentPage === item.id"
          @clicked="handlePageChange(item.id)"
        />
      </div>
  
      <div class="upload-section">
        <p class="section-label">SUBMIT LINK</p>
        <OUpload />
      </div>
  
      <div class="recent-uploads">
        <p class="section-label">RECENT USER SUBMISSIONS</p>
        
        <div v-if="isLoading" class="loading-text">Fetching latest links...</div>
        
        <div v-else class="upload-list">
          <div v-for="(row, index) in recentUploads" :key="index" class="upload-item">
            <div class="upload-info">
              <span class="upload-title">{{ row[2] || 'No Description' }}</span>
              <span class="upload-date">{{ formatDate(row[0]) }}</span>
            </div>
            <a :href="row[1]" target="_blank" class="view-btn">View</a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useGoogleSheet } from '@/composables/useGoogleSheet';
  import { useNavigation } from '@/composables/useNavigation';
  import CategoryCard from '@/components/CategoryCard.vue';
  import OUpload from '@/pages/Oupload.vue';
  
  // Image Imports
  import image_online     from '/images/cartoons/online.png';
  import image_onsite     from '/images/cartoons/onsite.png';
  import image_openhouse  from '/images/cartoons/openhouse.png';
  import image_oguide     from '/images/cartoons/oguide.png';
  import image_home       from '/images/cartoons/home.png';
  
  const { currentPage, setPage, toggleNav } = useNavigation();
  const { fetchData, isLoading } = useGoogleSheet();
  const recentUploads = ref([]);
  
  const categoryItems = [
    { id: 'online',    label: 'online',    icon: '🌐', image: image_online },
    { id: 'onsite',    label: 'onsite',    icon: '📍', image: image_onsite },
    { id: 'openhouse', label: 'openhouse', icon: '⛺', image: image_openhouse },
    { id: 'oguide',    label: 'guide',     icon: '📖', image: image_oguide }
  ];
  
  const handlePageChange = (id) => {
    setPage(id);
    toggleNav(); 
  };
  
  // Fetch data specifically from the 'upload' sheet
  onMounted(async () => {
    const data = await fetchData('A2:C6', 'upload'); 
    if (data) recentUploads.value = data;
  });
  
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleDateString();
  };
  </script>
  
  <style scoped>
  /* Previous styles remain same... adding new ones below */
  
  .recent-uploads {
    width: 90%;
    max-width: 800px;
    margin: 24px auto 0 auto;
    padding-bottom: 32px;
  }
  
  .upload-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  
  .upload-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #edf2f7;
  }
  
  .upload-info {
    display: flex;
    flex-direction: column;
  }
  
  .upload-title {
    font-weight: 700;
    font-size: 0.9rem;
    color: #2d3748;
  }
  
  .upload-date {
    font-size: 0.7rem;
    color: #718096;
  }
  
  .view-btn {
    font-size: 0.8rem;
    font-weight: 800;
    color: #166534;
    text-decoration: none;
    background: #dcfce7;
    padding: 4px 12px;
    border-radius: 4px;
  }
  
  .loading-text {
    font-size: 0.8rem;
    color: #a0aec0;
    font-style: italic;
  }
  
  /* Original styles from your prompt */
  .nav-overlay { position: absolute; top: 64px; left: 0; right: 0; background: white; z-index: 2000; padding: 24px 0; border-bottom: 2px solid #eee; transition: none !important; }
  .primary-nav { width: 90%; max-width: 800px; margin: 0 auto 16px auto; }
  .home-card { width: 100%; height: 120px; }
  .card_holder { width: 90%; max-width: 800px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
  @media (min-width: 768px) { .card_holder { grid-template-columns: repeat(4, 1fr); } }
  .upload-section { width: 90%; max-width: 800px; margin: 24px auto 0 auto; padding-top: 24px; border-top: 1px solid #eee; }
  .section-label { font-size: 0.7rem; font-weight: 900; color: #64748b; margin-bottom: 12px; text-transform: uppercase; }
  </style>