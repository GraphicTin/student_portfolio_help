<template>
  <div class="search-container">
    <div class="search-wrapper">
      <div class="input-group">
        <span class="icon">🔍</span>
        <input 
          v-model="query" 
          type="text" 
          placeholder="Search projects..." 
          class="search-input"
        />
        <button v-if="query" @click="query = ''" class="clear-btn">&times;</button>
      </div>

      <button class="upload-btn" @click="isModalOpen = true">
        <span class="plus">+</span> Upload
      </button>
    </div>

    <div v-if="isModalOpen" class="modal-overlay" @click.self="isModalOpen = false">
      <div class="modal-box">
        <h3>New Project for {{ currentPage }}</h3>
        
        <div class="form">
          <input v-model="form.title" placeholder="Project Title" />
          <input v-model="form.author" placeholder="Author (@name)" />
          <input v-model="form.link" placeholder="Project URL (Link)" />
          <textarea v-model="form.desc" placeholder="Description"></textarea>
          
          <div class="modal-btns">
            <button @click="isModalOpen = false" class="btn-cancel">Cancel</button>
            <button @click="handleUpload" :disabled="isLoading" class="btn-confirm">
              {{ isLoading ? 'Uploading...' : 'Confirm Post' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, reactive } from 'vue';
import { useGoogleSheet } from '@/composables/useGoogleSheet';
import { useNavigation } from '@/composables/useNavigation';

const emit = defineEmits(['updateSearch']);
const { currentPage } = useNavigation();
const { updateData, isLoading } = useGoogleSheet();

const query = ref('');
const isModalOpen = ref(false);

const form = reactive({
  title: '',
  author: '',
  link: '',
  desc: ''
});

// Emit search query to parent page
watch(query, (newVal) => emit('updateSearch', newVal));

// THE UPLOAD LOGIC
const handleUpload = async () => {
  if (!form.title || !form.link) return alert("Title and Link are required!");

  // Column Mapping: Link, Title, Desc, Thumb, Tags, Date, Grade, Author
  const newRow = [
    form.link, 
    form.title, 
    form.desc || "", 
    "", // Thumbnail placeholder
    "UserPost", 
    new Date().toLocaleDateString(), 
    "N/A", 
    form.author || "Anonymous"
  ];

  const success = await updateData('A1', [newRow]);
  
  if (success) {
    alert("Uploaded successfully!");
    isModalOpen.value = false;
    // Reset Form
    form.title = ''; form.author = ''; form.link = ''; form.desc = '';
  }
};
</script>

<style scoped>
.search-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  width: 100%;
  padding: 15px 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #eee;
}

.search-wrapper {
  width: 90%;
  max-width: 1000px;
  display: flex;
  gap: 10px;
}

.input-group {
  position: relative;
  flex-grow: 1;
}

.icon { position: absolute; left: 15px; top: 12px; }

.search-input {
  width: 100%;
  padding: 12px 40px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  background: #f9f9f9;
}

.upload-btn {
  background: #1a1a1a;
  color: white;
  border: none;
  padding: 0 20px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}

/* MODAL STYLES */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.modal-box {
  background: white;
  padding: 25px;
  border-radius: 15px;
  width: 400px;
}

.form { display: flex; flex-direction: column; gap: 12px; margin-top: 15px; }

.form input, .form textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
}

.modal-btns { display: flex; justify-content: flex-end; gap: 10px; margin-top: 10px; }

.btn-confirm { background: #6366f1; color: white; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; }
.btn-cancel { background: #eee; border: none; padding: 10px 15px; border-radius: 8px; cursor: pointer; }

.clear-btn { position: absolute; right: 10px; top: 8px; border: none; background: none; font-size: 20px; cursor: pointer; color: #999; }
</style>