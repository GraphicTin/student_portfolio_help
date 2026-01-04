<template>
  <div>
    <button @click="showComponent = !showComponent">Toggle Component</button>
    <MyComponent v-if="showComponent" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import MyComponent from '@/components/HelloWorld.vue';

const showComponent = ref(true);

</script>