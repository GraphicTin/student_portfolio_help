

<template>
    <div 
    class="category_card" 
    :class="{ 'active-border': isActive }"
    @click="$emit('clicked')"
    >
        <img v-if="image" :src="image" alt="Category Image" class="category_image">
        <h3 class="card-title">{{ title }}</h3>

    </div>
</template>

<script setup>
defineProps({
    title: String,
    icon: String,
    image: String,
    isActive: Boolean // Use this to toggle the purple border
});

defineEmits(['clicked']);
</script>

<style>
        
    .category_card {
        width: 100px;
        height: 100px;

        border: 2px solid #87d3aa;
        /* box-shadow: 0px 8px 8px 1px #d7d7d7; */

        border-radius: 8px;
        /* padding: 32px; */



        cursor: pointer;
        transition: all 0.2s ease-in-out;
        user-select: none;
    }

    /* Matching the purple border in your image */
    .active-border {
        border-color: #8a3ffc; 
        box-shadow: 0 0 0 1px #8a3ffc;
    }

    .category_card:hover {
        transform: translateY(-2px);
    }

    .card-title {
        position: relative;
        top: calc(-1.9rem);
        width: 100%;
        text-align: center;

        font-family: 'Inter', sans-serif;
        font-size: 1.3rem;
        font-weight: 700;
        color: #000;
        letter-spacing: -0.5px;
    }

    .category_image {

        width: 100%;      
        height: 100%;
        /* max-height: 60%;   */
        object-fit: contain;
        border-radius: 4px;
    }

</style>