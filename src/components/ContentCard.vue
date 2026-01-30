<template>
  <div class="card">
    <div class="card-image">
      <img v-if="data[3]" :src="data[3]" alt="Portfolio Thumbnail" />
      <div v-else class="placeholder">No Image</div>
    </div>

    <div class="card-info">
      <h3>{{ data[1] || 'Untitled' }}</h3> <p>{{ data[2] }}</p>                 <div class="tags" v-if="data[4]">
        <small v-for="tag in data[4].split(',')" :key="tag">#{{ tag }} </small>
      </div>

      <a :href="data[0]" target="_blank">View Project</a>
    </div>
  </div>
</template>

<script setup>
// This tells the component to expect a variable called "data"
defineProps({
  data: Array
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 8px;
  min-height: 400px;
}
.card-image img {
  width: 100%;
  height: 300px;
  object-fit: cover;
}
.placeholder {
  height: 150px;
  background: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>