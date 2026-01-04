

<template>

    <div class="top_part">
        <div class="top_part_title">
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
        /* background-color: rgb(82, 255, 203); */
        display: flex;
        justify-content: center;
        align-items: center;

        background-color: #b2f3d0;
        border-bottom: 2px solid #87d3aa;
        box-shadow: 2px 0px 16px 0px #e5e5e5;
    }

    h1 {
        font-size: 1.7rem;
    }

</style>