

import { ref } from 'vue';
import { useLocalStorage } from '@vueuse/core';

// This state lives outside the component, making it "Global"
const currentPage = ref('home');

export function useNavigation() {
    const setPage = (pageName) => {
        currentPage.value = pageName;
        useLocalStorage('inPage', 'main_menu').value = pageName;
    };

    return {
        currentPage,
        setPage
    };
}