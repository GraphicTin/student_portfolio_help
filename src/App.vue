

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

    import TopPart from '@/components/TopPart.vue';

    import MainMenu  from '@/components/MainMenu.vue'  ;
    import Online    from '@/components/Online.vue'    ;
    import Onsite    from '@/components/Onsite.vue'    ;
    import Openhouse from '@/components/Openhouse.vue' ;
    import Oguide    from '@/components/Oguide.vue'    ;

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
        setPage('main_menu');
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