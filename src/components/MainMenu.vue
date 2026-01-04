

<template>

    <div class="main_menu">

        <img class="header"src="/images/header.jpeg" />

        <div class="card_holder">

            <CategoryCard 
            title="onsite" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'openhouse'"
            @clicked="emit('changePage', 'openhouse')"
            />

            <CategoryCard 
            title="online" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'openhouse'"
            @clicked="emit('changePage', 'openhouse')"
            />

            <CategoryCard 
            title="openhouse" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'openhouse'"
            @clicked="emit('changePage', 'openhouse')"
            />

            <CategoryCard 
            title="guide" 
            icon="⛺" 
            :image="imagess"
            :is-active="selected === 'openhouse'"
            @clicked="emit('changePage', 'openhouse')"
            />

        </div>

        
        
    </div>

</template>


<script setup>

    import imagess from '/images/header.jpeg';

    import CategoryCard from '@/components/CategoryCard.vue';

    const emit = defineEmits(['changePage']);


</script>


<style scoped>

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
        margin: 32px 0;
        width: 90%;
        max-width: 800px;
        object-fit: contain;
        border-radius: 8px;
        border: 2px solid #87d3aa;
    }

    .card_holder {

        width: 90%;
        max-width: 800px;

        height: calc(32dvh + 16px);

        display: grid;
        grid-template-columns: 1fr 1fr;
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
        height: 100%;
        box-sizing: border-box;  
        margin: 0;
    }

</style>