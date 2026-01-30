

<template>

    <div class="top_part">
        <div class="top_part_margin">

            <div class="top_part_title">
                <h1>Student Portfolio Help </h1>
            </div>
            
            <nav class="navigation-wrapper">
                <svg 
                @click="toggleMenu" 
                width="40" height="40" viewBox="0 0 24 24" 
                class="menu-icon"
                >
                    <line class="line-1" x1="4" y1="6" x2="20" y2="6" stroke="black" stroke-width="2" />
                    <line class="line-2" x1="4" y1="12" x2="20" y2="12" stroke="black" stroke-width="2" />
                    <line class="line-3" x1="4" y1="18" x2="20" y2="18" stroke="black" stroke-width="2" />
                </svg>
            </nav>
            <!-- <button class="nav-btn" @click="goToDetails">
                Go to Details
            </button> -->

        </div>
    </div>

</template>


<script setup>

    const emit = defineEmits(['changePage']);

    import { useNavigation } from '@/composables/useNavigation';
    const { currentPage, setPage } = useNavigation();


    import { ref, watch, onMounted } from 'vue';
    import { gsap } from 'gsap';
    import { useLocalStorage } from '@vueuse/core';

    const isOpen = ref(false);


    // Function to handle the click
const toggleMenu = () => {
  if (currentPage.value === 'onavigation') {
    // If already there, go back (e.g., to home)
    setPage(useLocalStorage('inPage', 'main_menu').value); 
  } else {
    setPage('onavigation', false);
  }
};

// Sync the animation with the current page state
watch(currentPage, (newPage) => {
  isOpen.value = (newPage === 'onavigation');
  animateIcon();
});

const animateIcon = () => {
  const tl = gsap.timeline();
  
  if (isOpen.value) {
    // ANIMATE TO CROSS
    tl.to(".line-1", { 
      y: 6,             // Move down to the middle (12 - 6 = 6)
      rotation: 45, 
      transformOrigin: "center center", 
      duration: 0.3 
    })
    .to(".line-2", { 
      opacity: 0, 
      duration: 0.2 
    }, "<")
    .to(".line-3", { 
      y: -6,            // Move up to the middle (12 - 18 = -6)
      rotation: -45, 
      transformOrigin: "center center", 
      duration: 0.3 
    }, "<");
  } else {
    // ANIMATE BACK TO HAMBURGER
    tl.to(".line-1", { y: 0, rotation: 0, duration: 0.3 })
      .to(".line-2", { opacity: 1, duration: 0.2 }, "<")
      .to(".line-3", { y: 0, rotation: 0, duration: 0.3 }, "<");
  }
};

</script>


<style>

    .top_part {
        width: 100%;
        height: 64px;
        /* background-color: rgb(82, 255, 203); */
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: var(--color-border-background-primary);
        border-bottom: 2px solid var(--color-border-primary);
        box-shadow: 2px 0px 16px 0px var(--color-boxshadow-primary);
    }

    .top_part_margin {
        width: 90%;
        max-width: 800px;

        display: flex;
        justify-content: space-between;
    }

    h1 {
        font-size: 1.7rem;
    }

    @media (width <= 420px) {
        h1 {
            font-size: 1.4rem;
        }
    }

    .menu-icon, svg, .button{

        width: 32px;
        height: 32px;
        object-fit: contain;

    }


    .menu-icon {
        cursor: pointer;
        overflow: visible;
    }
    /* Ensure lines rotate from their center */
    .line-1, .line-2, .line-3 {
        transform-origin: center;
    }

</style>