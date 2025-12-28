import { reactive } from 'vue';
import type { ModalOptions } from '../types';

const state = reactive({
    isOpen: false,
    options: {
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        type: 'info'
    } as ModalOptions
});

let resolvePromise: (value: boolean) => void;

export const useModal = () => {
    const confirm = (options: ModalOptions): Promise<boolean> => {
        state.options = { ...state.options, ...options };
        state.isOpen = true;

        return new Promise((resolve) => {
            resolvePromise = resolve;
        });
    };

    const handleAction = (choice: boolean) => {
        state.isOpen = false;
        if (resolvePromise) {
            resolvePromise(choice);
        }
    };

    return {
        state,
        confirm,
        handleAction
    };
};
