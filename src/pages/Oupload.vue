<template>
    <div class="upload-module">
      <input v-model="linkUrl" placeholder="Paste link here" :disabled="isLoading" />
      <button @click="handleUpload" :disabled="isLoading">
        {{ isLoading ? 'Deploying...' : 'Upload Link' }}
      </button>
      <p v-if="error" class="error-log">{{ error }}</p>
    </div>
  </template>
  
<script setup>

    import { ref } from 'vue';
    import { useUploadLink } from '@/composables/useUploadLink';

    const linkUrl = ref('');
    const { uploadLink, isLoading, error } = useUploadLink();

    const handleUpload = async () => {
        await uploadLink(linkUrl.value, 'User Upload');
        if (!error.value) linkUrl.value = ''; 
    };

</script>