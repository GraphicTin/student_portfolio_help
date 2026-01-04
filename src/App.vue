

<template>

    <TopPart @changePage="ShowMainMenu = !ShowMainMenu" />
    
    <div id="content_wrapper">
        <MainMenu v-if="ShowMainMenu" />
    </div>


</template>


<script setup>

    import { ref } from 'vue';

    import TopPart from '@/components/TopPart.vue';
    import MainMenu from '@/components/MainMenu.vue';


    const ShowMainMenu = ref(true);

</script>


<style>

    

</style>