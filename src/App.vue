

<template>

    <TopPart/>
    
    <div id="content_wrapper">
        <transition
        mode="out-in"
        :css="false"
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        >
        <KeepAlive>

        <component :is="currentTabComponent" />

        </KeepAlive>
        </transition>
    </div>


</template>


<script setup>

    import { ref, onMounted, computed } from 'vue';
    import { gsap } from 'gsap';

    import { useNavigation } from '@/composables/useNavigation';
    const  { currentPage, setPage } = useNavigation();
    import { useLocalStorage } from '@vueuse/core';

    import TopPart from '@/components/TopPart.vue';

    import MainMenu    from '@/pages/MainMenu.vue'   ;
    import Online      from '@/pages/Online.vue'     ;
    import Onsite      from '@/pages/Onsite.vue'     ;
    import Openhouse   from '@/pages/Openhouse.vue'  ;
    import Oguide      from '@/pages/Oguide.vue'     ;
    import Onavigation from '@/pages/Onavigation.vue';

    // Map the string name to the actual Component Object
    const tabs = {
        main_menu   : MainMenu,
        online      : Online,
        onsite      : Onsite,
        openhouse   : Openhouse,
        oguide      : Oguide,
        onavigation : Onavigation
    };

    const currentTabComponent = computed(() => tabs[currentPage.value]);

    import CategoryCard from '@/components/CategoryCard.vue';


    const ShowMainMenu = ref(true);


    onMounted(() => {
        setPage(useLocalStorage('inPage', 'main_menu').value);
    });





    // GSAP Transition Hooks
const beforeEnter = (el) => {
  gsap.set(el, {
    opacity: 0,
    y: 15, // Starts slightly lower
  });
};

const enter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.4,
    ease: "power2.out",
    onComplete: done // Tells Vue the animation is finished
  });
};

const leave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: -15, // Slides slightly up as it vanishes
    duration: 0.3,
    ease: "power2.in",
    onComplete: done
  });
};

</script>


<style>

    #content_wrapper {
        width: 100dvw;
        height: calc( 100dvh - 64px );
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        overflow-y: scroll;
    }

</style>