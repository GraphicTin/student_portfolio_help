

import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

// This state lives outside the component, making it "Global"
const currentPage = ref('home');

export function useNavigation() {
    const setPage = (pageName, writeToLocalStorage = true) => {
        currentPage.value = pageName;
        if (writeToLocalStorage) { useLocalStorage('inPage', 'main_menu').value = pageName; }
        
    };

    return {
        currentPage,
        setPage
    };
}