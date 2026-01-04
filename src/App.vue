

<template>

    <TopPart @changePage="ShowMainMenu = !ShowMainMenu" />
    
    <div id="content_wrapper">
        <MainMenu v-if="ShowMainMenu" @changePage="ShowMainMenu = !ShowMainMenu"/>
    </div>


</template>


<script setup>

    import { ref } from 'vue';

    import TopPart from '@/components/TopPart.vue';
    import MainMenu from '@/components/MainMenu.vue';
    import CategoryCard from '@/components/CategoryCard.vue';


    const ShowMainMenu = ref(true);

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