

import { ref } from 'vue';

// This state lives outside the component, making it "Global"
const currentPage = ref('home');

export function useNavigation() {
    const setPage = (pageName) => {
        currentPage.value = pageName;
    };

    return {
        currentPage,
        setPage
    };
}