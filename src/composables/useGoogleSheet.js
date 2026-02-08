import { ref } from 'vue';
import { useNavigation } from '@/composables/useNavigation';

// Replace with your actual deployed Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKZDhdWzD2vqwbUdnPMwlEjfePy_tFpjWzmlmV6AiTzx4dooDZBAwxlIxgAALj-torZQ/exec';

export function useGoogleSheet() {
    const { currentPage } = useNavigation();
    const isLoading = ref(false);
    const error = ref(null);

    const fetchData = async (range = 'A1:Z', sheetOverride = null) => {
        isLoading.value = true;
        error.value = null;
        try {
            const params = new URLSearchParams({
                // Priority: Manual override (e.g., 'online') -> Global state
                sheetName: sheetOverride || currentPage.value,
                area: range
            });

            const response = await fetch(`${SCRIPT_URL}?${params.toString()}`);
            const result = await response.json();

            if (result.error) throw new Error(result.error);

            // UNWRAP: Return result.data so Online.vue gets the array, not the object
            return result.data || []; 
        } catch (err) {
            error.value = err.message;
            return null;
        } finally {
            isLoading.value = false;
        }
    };

    const updateData = async (range, data, targetSheet = null) => {
        isLoading.value = true;
        error.value = null;
        try {
            const formData = new URLSearchParams();
            formData.append('sheetName', targetSheet || currentPage.value);
            formData.append('range', range);
            formData.append('dataToSend', JSON.stringify(data));

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            });

            const result = await response.json();
            if (result.error) throw new Error(result.error);
            return result;
        } catch (err) {
            error.value = err.message;
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    return { fetchData, updateData, isLoading, error };
}