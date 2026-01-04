import { ref } from 'vue';
import { useNavigation } from '@/composables/useNavigation';

// Replace with your actual deployed Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKZDhdWzD2vqwbUdnPMwlEjfePy_tFpjWzmlmV6AiTzx4dooDZBAwxlIxgAALj-torZQ/exec';

export function useGoogleSheet() {
    const { currentPage } = useNavigation();
    const isLoading = ref(false);
    const error = ref(null);

    /**
     * Fetches data from the current active sheet
     * @param {string} range - e.g., 'A1:E'
     */
    const fetchData = async (range = 'A1:Z') => {
        isLoading.value = true;
        error.value = null;
        
        try {
            const params = new URLSearchParams({
                sheetName: currentPage.value, // uses the global state
                area: range
            });

            const response = await fetch(`${SCRIPT_URL}?${params.toString()}`);
            const result = await response.json();

            if (result.error) throw new Error(result.error);
            return result.data;
        } catch (err) {
            error.value = err.message;
            console.error("Fetch Error:", err);
        } finally {
            isLoading.value = false;
        }
    };

    /**
     * Writes data to the current active sheet
     * @param {string} range - e.g., 'A1:B1'
     * @param {Array[]} data - e.g., [['Value1', 'Value2']]
     */
    const updateData = async (range, data) => {
        isLoading.value = true;
        error.value = null;

        try {
            // Your script expects URL-encoded parameters, not a JSON body
            const formData = new URLSearchParams();
            formData.append('sheetName', currentPage.value);
            formData.append('range', range);
            formData.append('dataToSend', JSON.stringify(data));

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            });

            const result = await response.json();
            if (result.error) throw new Error(result.error);
            return result;
        } catch (err) {
            error.value = err.message;
            console.error("Update Error:", err);
        } finally {
            isLoading.value = false;
        }
    };

    return {
        fetchData,
        updateData,
        isLoading,
        error
    };
}