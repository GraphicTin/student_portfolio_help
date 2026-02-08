import { ref } from 'vue';
import { useGoogleSheet } from '@/composables/useGoogleSheet';

export function useUploadLink() {
    const { updateData, isLoading, error } = useGoogleSheet();
    const success = ref(false);

    const uploadLink = async (url, description = '') => {
        if (!url) return;

        // Force 'uploads' sheet regardless of what the UI is doing
        // Format: [ [timestamp, link, description] ]
        const payload = [[ new Date().toISOString(), url, description ]];
        
        // We use 'A1' as a starting point; your GAS must handle appending
        const result = await updateData('A:C', payload, 'upload');  
        
        if (result) success.value = true;
    };

    return { uploadLink, isLoading, error, success };
}