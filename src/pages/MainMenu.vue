

<template>

    <div class="main_menu">

        <img class="header"src="/images/header.jpeg" />

        <div class="card_holder">

            <CategoryCard 
            title="online" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'online'"
            @clicked="setPage('online')"
            />

            <CategoryCard 
            title="onsite" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'onsite'"
            @clicked="setPage('onsite')"
            />

            <CategoryCard 
            title="openhouse" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'openhouse'"
            @clicked="setPage('openhouse')"
            />

            <CategoryCard 
            title="guide" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === '0guide'"
            @clicked="setPage('oguide')"
            />

        </div>

        
        
    </div>

</template>


<script setup>

    import imagess from '/images/icon.png';

    import CategoryCard from '@/components/CategoryCard.vue';

    import { useNavigation } from '@/composables/useNavigation';
    const { currentPage, setPage } = useNavigation();


</script>


<style>

    .main_menu {
        width: 100%;
        height: 100%;
        /* background-color: rgb(255, 177, 82); */
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
    }

    .header {
        margin-top: 32px;
        width: 90%;
        max-width: 800px;
        object-fit: contain;
        border-radius: 8px;
        border: 2px solid var(--color-border-primary);
    }

    .card_holder {

        width: 90%;
        max-width: 800px;

        height: calc(32dvh + 16px);
        margin-top: 32px;

        display: grid;
        grid-template-columns: 1fr 1fr;
        /* grid-auto-columns: 50%;
        grid-auto-flow: row; */
        gap: 16px;

        /* background-color: brown; */
    }

    @media (min-width: 768px) {
        .card_holder {
            grid-template-columns: repeat(4, 1fr); /* PC: 4 columns */
            height: 16dvh;
        }
    }

    .category_card {
        width: 100%;
        min-width: 0;
        height: 100%;
        min-height: 0;
        box-sizing: border-box;
    }

</style>