

<template>
    <div 
    class="category_card" 
    :class="{ 'active_border': isActive }"
    @click="$emit('clicked')"
    >
        <img v-if="image" :src="image" alt="Category Image" class="category_image">
        <h3 class="card_title">{{ title }}</h3>

    </div>
</template>

<script setup>
defineProps({
    title: String,
    icon: String,
    image: String,
    isActive: Boolean 
});

defineEmits(['clicked']);
</script>

<style>
        
    .category_card {

        width: 100px;
        min-width: 0;
        height: 100px;
        min-height: 0;

        /* display: block;
        justify-content: center;
        align-items: center; */

        border: 2px solid #87d3aa;
        /* box-shadow: 0px 8px 8px 1px #d7d7d7; */

        border-radius: 8px;
        /* padding: 32px; */

        cursor: pointer;
        transition: all 0.2s ease-in-out;
        user-select: none;
    }

    /* Matching the purple border in your image */
    .active_border {
        border-color: #fc3f3f; 
        box-shadow: 0 0 0 1px #fc3f3f;
    }

    .category_card:hover {
        transform: translateY(-5px);
        border-color: #7080fd; 
        box-shadow: 0px 0px 2px 0px #7080fd;
        /* box-shadow: 0px 2px 2px 2px #e4e4e4; */
    }

    .card_title {
        position: relative;
        top: calc(-0.6rem);
        width: 100%;
        min-width: 0;
        text-align: center;

        font-family: 'Inter', sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: #000;
        letter-spacing: -0.5px;
    }

    .category_image {

        width: 80%; 
        height: 80%;
        
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        /* max-height: 60%;   */
        object-fit: contain;
        border-radius: 4px;
    }

</style>