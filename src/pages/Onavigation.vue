<template>
  <div class="nav-overlay">
    <nav class="nav-list">
      <div 
        v-for="item in menuItems" 
        :key="item.id"
        class="nav-link-wrapper"
      >
        <button 
          @click="setPage(item.id)" 
          class="nav-button"
          :class="{ 'is-active': currentPage === item.id }"
        >
          {{ item.label }}
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useNavigation } from '@/composables/useNavigation';
import { gsap } from 'gsap';

const { currentPage, setPage } = useNavigation();

const menuItems = [
  { id: 'main_menu',  label: 'Home' },
  { id: 'online',     label: 'Online' },
  { id: 'onsite',     label: 'Onsite' },
  { id: 'openhouse',  label: 'Openhouse' },
  { id: 'oguide',     label: 'Guide' }
];

onMounted(() => {
  // Simple upward stagger animation
  gsap.from(".nav-link-wrapper", {
    y: 40,
    opacity: 0,
    stagger: 0.1,
    duration: 0.6,
    ease: "power2.out"
  });
});
</script>

<style scoped>
.nav-overlay {
  position: fixed;
  inset: 0;
  background: var(--color-background);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99; /* Ensure your menu icon is z-index: 100 */
  height: calc( 100dvh - 64px );
  top: 64px;
}

.nav-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: center;
}

.nav-button {
  background: none;
  border: none;
  color: var(--color-text-primary);
  font-size: clamp(3rem, 10vw, 6rem); /* Huge responsive text */
  font-weight: 800;
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s ease;
  opacity: 0.6;
}

.nav-button:hover {
  opacity: 1;
  transform: scale(1.05);
  color: #6366f1; /* Indigo accent on hover */
}

.nav-button.is-active {
  opacity: 1;
  color: #6366f1;
}

/* Subtle background fade in */
.nav-overlay {
  animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

</style>