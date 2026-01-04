

<template>

    <TopPart/>
    
    <div id="content_wrapper">
        <KeepAlive>

        <component :is="currentTabComponent" />

        </KeepAlive>
    </div>


</template>


<script setup>

    import { ref, onMounted, computed } from 'vue';

    import { useNavigation } from '@/composables/useNavigation';
    const  { currentPage, setPage } = useNavigation();
    import { useLocalStorage } from '@vueuse/core';

    import TopPart from '@/components/TopPart.vue';

    import MainMenu  from '@/pages/MainMenu.vue'  ;
    import Online    from '@/pages/Online.vue'    ;
    import Onsite    from '@/pages/Onsite.vue'    ;
    import Openhouse from '@/pages/Openhouse.vue' ;
    import Oguide    from '@/pages/Oguide.vue'    ;

    // Map the string name to the actual Component Object
    const tabs = {
        main_menu   : MainMenu,
        online      : Online,
        onsite      : Onsite,
        openhouse   : Openhouse,
        oguide      : Oguide
    };

    const currentTabComponent = computed(() => tabs[currentPage.value]);

    import CategoryCard from '@/components/CategoryCard.vue';


    const ShowMainMenu = ref(true);


    onMounted(() => {
        setPage(useLocalStorage('inPage', 'main_menu').value);
    });

</script>


<style>

    #content_wrapper {
        width: 100dvw;
        height: calc( 100dvh - 64px );
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

</style>