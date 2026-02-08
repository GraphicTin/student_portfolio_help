<template>
    <div class="nav-overlay">
      <div class="primary-nav">
        <CategoryCard 
          title="home" 
          icon="🏠" 
          :image="iconImage"
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
          :image="iconImage"
          :is-active="currentPage === item.id"
          @clicked="handlePageChange(item.id)"
        />
      </div>
  
      <div class="upload-section">
        <p class="section-label">SUBMIT LINK</p>
        <OUpload />
      </div>
    </div>
  </template>
  
  <script setup>
  import iconImage from '/images/icon.png';
  import CategoryCard from '@/components/CategoryCard.vue';
  import OUpload from '@/pages/Oupload.vue';
  import { useNavigation } from '@/composables/useNavigation';
  
  const { currentPage, setPage, toggleNav } = useNavigation();
  
  // Grouped categories (Home excluded to be separate)
  const categoryItems = [
    { id: 'online',    label: 'online',    icon: '🌐' },
    { id: 'onsite',    label: 'onsite',    icon: '📍' },
    { id: 'openhouse', label: 'openhouse', icon: '⛺' },
    { id: 'oguide',    label: 'guide',     icon: '📖' }
  ];
  
  const handlePageChange = (id) => {
    setPage(id);
    toggleNav(); 
  };
  </script>
  
  <style scoped>
  .nav-overlay {
    /* Positioned under global header */
    position: absolute;
    top: 64px; 
    left: 0;
    right: 0;
    background: white;
    z-index: 2000;
    padding: 24px 0;
    border-bottom: 2px solid #eee;
    
    /* Kill all entrance animations */
    transition: none !important;
  }
  
  /* Home Section Layout */
  .primary-nav {
    width: 90%;
    max-width: 800px;
    margin: 0 auto 16px auto;
  }
  
  .home-card {
    width: 100%;
    /* Ensures Home stands out without being massive */
    height: 120px; 
  }
  
  /* Category Grid (2x2 Mobile, 4x1 Desktop) */
  .card_holder {
    width: 90%;
    max-width: 800px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
  
  @media (min-width: 768px) {
    .card_holder {
      grid-template-columns: repeat(4, 1fr);
    }
  }
  
  /* Submit Section */
  .upload-section {
    width: 90%;
    max-width: 800px;
    margin: 24px auto 0 auto;
    padding-top: 24px;
    border-top: 1px solid #eee;
  }
  
  .section-label {
    font-size: 0.7rem;
    font-weight: 900;
    color: #64748b;
    margin-bottom: 12px;
    text-transform: uppercase;
  }
  
  /* STRICT ANIMATION KILLER
    Ensures CategoryCard doesn't pop or grow.
    Also fixes the "Giant Thinking Emoji" bug by forcing containment.
  */
  :deep(.category_card) {
    transition: none !important;
    transform: none !important;
    overflow: hidden !important; /* Prevents image spill */
  }
  
  :deep(.category_card img) {
    max-width: 60px !important; /* Adjust based on your preferred icon size */
    height: auto !important;
    object-fit: contain !important;
  }
  </style>