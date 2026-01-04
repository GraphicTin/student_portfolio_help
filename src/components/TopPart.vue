

<template>

    <div class="top_part">
        <div class="top_part__title">
            <h1>Student Portfolio Help </h1>
        </div>
        <button class="nav-btn" @click="goToDetails">
            Go to Details
        </button>
    </div>

</template>


<script setup>

    const emit = defineEmits(['changePage']);

    const goToDetails = () => {
        // Send the event 'changePage' with the value 'details'
        emit('changePage', 'details');
    };

</script>


<style>

    .top_part {
        width: 100%;
        height: 64px;
        background-color: rgb(82, 255, 203);
        display: flex;
        justify-content: center;
        align-items: center;
    }

</style>