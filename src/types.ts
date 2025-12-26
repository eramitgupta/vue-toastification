export type ToastType = 'success' | 'error' | 'warning' | 'info';

export type ToastPosition =
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

export interface ToastItem {
    id: number;
    type: ToastType;
    title: string;
    message: string;
    duration: number;
}

export interface PluginOptions {
    position?: ToastPosition;
}
