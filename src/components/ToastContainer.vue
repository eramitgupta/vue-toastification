<template>
  <div
    class="erag-toast-container"
    :class="`erag-${state.position}`"
  >
    <TransitionGroup name="erag-toast-list">
      <Toast
        v-for="toast in state.toasts"
        :key="toast.id"
        :type="toast.type"
        :title="toast.title"
        :message="toast.message"
        :duration="toast.duration"
        @close="remove(toast.id)"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '../composables/useToast';
import Toast from './Toast.vue';

const { state, remove } = useToast();
</script>

<style scoped>
.erag-toast-container {
    position: fixed;
    z-index: 9999;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

/* Positions with Prefix */
.erag-toast-container.erag-top-left {
    top: 20px;
    left: 20px;
}
.erag-toast-container.erag-top-center {
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.erag-toast-container.erag-top-right {
    top: 20px;
    right: 20px;
}

.erag-toast-container.erag-bottom-left {
    bottom: 20px;
    left: 20px;
}
.erag-toast-container.erag-bottom-center {
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
}
.erag-toast-container.erag-bottom-right {
    bottom: 20px;
    right: 20px;
}

/* Transition Group Styles (Prefix Added) */
.erag-toast-list-move,
.erag-toast-list-enter-active,
.erag-toast-list-leave-active {
    transition: all 0.4s ease;
}
.erag-toast-list-enter-from,
.erag-toast-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
.erag-toast-list-leave-active {
    position: absolute;
}
</style>
