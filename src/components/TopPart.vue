

<template>

    <div class="top_part">
        <div class="top_part_margin">

            <div class="top_part_title">
                <h1>Student Portfolio Help </h1>
            </div>
            <img src="/images/menu.svg" alt="Menu" class="menu-icon" @click="setPage('main_menu')" />
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

    .menu-icon {

        width: 32px;
        height: 32px;
        object-fit: contain;

    }

</style>