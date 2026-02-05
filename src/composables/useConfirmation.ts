import { reactive, computed } from 'vue';
import type { ModalOptions, ModalType } from '../types';
import { defaultIcons } from '../constants/defaultIcons';

const state = reactive({
    isOpen: false,
    options: {
        title: '',
        message: '',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
        type: 'info' as ModalType,
        icon: undefined as ModalOptions['icon']
    }
});

let resolvePromise: ((value: boolean) => void) | null = null;

const typeConfig = {
    info: {
        icon: 'info',
        iconClass: 'info',
        confirmClass: 'info'
    },
    success: {
        icon: 'success',
        iconClass: 'success',
        confirmClass: 'success'
    },
    warning: {
        icon: 'warning',
        iconClass: 'warning',
        confirmClass: 'warning'
    },
    danger: {
        icon: 'danger',
        iconClass: 'danger',
        confirmClass: 'danger'
    }
};

export const useConfirmation = () => {
    const confirm = (options: ModalOptions): Promise<boolean> => {
        state.options = {
            ...state.options,
            ...options
        };

        state.isOpen = true;

        return new Promise((resolve) => {
            resolvePromise = resolve;
        });
    };

    const handleAction = (value: boolean) => {
        state.isOpen = false;
        resolvePromise?.(value);
        resolvePromise = null;
    };

    const currentType = computed(() => {
        return typeConfig[state.options.type || null];
    });

    const resolvedIcon = computed(() => {
        return state.options.icon ? state.options.icon : defaultIcons[state.options.type || null];
    });

    return {
        state,
        confirm,
        handleAction,
        currentType,
        resolvedIcon
    };
};
