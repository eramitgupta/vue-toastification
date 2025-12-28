import { reactive } from 'vue';
import { ToastItem, ToastType, ToastPosition } from '../types';

interface ToastState {
    toasts: ToastItem[];
    position: ToastPosition;
}

const state = reactive<ToastState>({
    toasts: [],
    position: 'bottom-right'
});

let count = 0;

export const useToast = () => {
    const show = (
        type: ToastType,
        title: string,
        message: string,
        duration: number = 4500,
        position?: ToastPosition
    ) => {
        const id = count++;

        if (position) {
            state.position = position;
        }

        const toast: ToastItem = {
            id,
            type,
            title,
            message,
            duration
        };

        state.toasts.push(toast);

        if (duration > 0) {
            setTimeout(() => {
                remove(id);
            }, duration + 500);
        }
    };

    const remove = (id: number) => {
        const index = state.toasts.findIndex((t) => t.id === id);
        if (index !== -1) {
            state.toasts.splice(index, 1);
        }
    };

    const setPosition = (newPosition: ToastPosition) => {
        state.position = newPosition;
    };

    return {
        state,
        show,
        remove,
        setPosition,
        success: (
            msg: string,
            title: string = 'Success',
            duration?: number,
            position?: ToastPosition
        ) => show('success', title, msg, duration, position),

        error: (
            msg: string,
            title: string = 'Error',
            duration?: number,
            position?: ToastPosition
        ) => show('error', title, msg, duration, position),

        warning: (
            msg: string,
            title: string = 'Warning',
            duration?: number,
            position?: ToastPosition
        ) => show('warning', title, msg, duration, position),

        info: (msg: string, title: string = 'Info', duration?: number, position?: ToastPosition) =>
            show('info', title, msg, duration, position)
    };
};
