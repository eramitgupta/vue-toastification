<template>
    <div
        class="erag-toast"
        :class="[`erag-${type}`, { 'erag-show': isMounted }]"
        :style="{ '--duration': duration + 'ms' } as any"
        @mouseenter="pauseTimer"
        @mouseleave="resumeTimer"
    >
        <div class="erag-toast-icon" v-html="currentIcon"></div>

        <div class="erag-toast-content">
            <strong>{{ title }}</strong>
            <span>{{ message }}</span>
        </div>

        <button class="erag-toast-close" @click="closeToast">
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">
                <path
                    fill="currentColor"
                    d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"
                />
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import { icons } from '../icons';
import type { ToastType } from '../types';

const props = defineProps<{
    type: ToastType;
    title: string;
    message: string;
    duration: number;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const isMounted = ref(false);
const currentIcon = computed(() => icons[props.type] || icons.info);
let timer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
    requestAnimationFrame(() => {
        isMounted.value = true;
    });
    startTimer();
});

const startTimer = () => {
    timer = setTimeout(() => {
        closeToast();
    }, props.duration);
};

const closeToast = () => {
    emit('close');
};

const pauseTimer = () => {
    // Optional
};
const resumeTimer = () => {
    // Optional
};

onBeforeUnmount(() => {
    if (timer) clearTimeout(timer);
});
</script>

<style scoped>
.erag-toast {
    --toast-bg: #fff;
    --toast-color: #333;
    width: 320px;
    background: var(--toast-bg);
    color: white;
    border-radius: 6px;
    border: 1px solid rgba(0, 0, 0, 0.05);
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    position: relative;
    display: flex;
    align-items: center;
    padding: 0 10px 0 12px;
    margin-bottom: 10px;
    transform: translateY(20px);
    opacity: 0;
    transition:
        transform 0.3s cubic-bezier(0.68, -0.55, 0.27, 1.55),
        opacity 0.3s ease;
}

/* Animation State */
.erag-toast.erag-show {
    transform: translateY(0) !important;
    opacity: 1;
}

/* Progress Bar */
.erag-toast::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--toast-color);
    opacity: 0.15;
    transform: translateX(-100%);
    pointer-events: none;
    z-index: 0;
}

.erag-toast.erag-show::before {
    animation: eragProgressLayer var(--duration) linear forwards;
}

/* Icon */
.erag-toast-icon {
    width: 20px;
    height: 20px;
    margin-right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    color: white;
}
.erag-toast-icon :deep(svg) {
    width: 100%;
    height: 100%;
}

/* Content */
.erag-toast-content {
    padding: 9px 0;
    position: relative;
    z-index: 1;
    flex: 1;
}
.erag-toast-content strong {
    display: block;
    font-size: 14px;
    margin-bottom: 2px;
    color: inherit;
    line-height: 1.2;
}
.erag-toast-content span {
    font-size: 12px;
    opacity: 0.9;
    line-height: 1.2;
}

/* Close Button */
.erag-toast-close {
    background: transparent;
    border: none;
    color: white;
    opacity: 0.7;
    cursor: pointer;
    padding: 6px;
    margin-left: 8px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s;
}
.erag-toast-close:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.1);
}
.erag-toast-close svg {
    width: 12px;
    height: 12px;
}

/* Themes */
.erag-toast.erag-success {
    --toast-bg: #27ae60;
}
.erag-toast.erag-error {
    --toast-bg: #c0392b;
}
.erag-toast.erag-warning {
    --toast-bg: #d35400;
}
.erag-toast.erag-info {
    --toast-bg: #2980b9;
}

@keyframes eragProgressLayer {
    from {
        transform: translateX(-100%);
    }
    to {
        transform: translateX(0%);
    }
}
</style>
