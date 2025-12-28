<template>
  <Transition name="erag-modal-fade">
    <div v-if="state.isOpen" class="erag-modal-backdrop">
      <div class="erag-modal-container">
        <div class="erag-modal-body">
          <div class="erag-modal-icon-wrapper" :class="state.options.type">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>
          <div class="erag-modal-text">
            <h3>{{ state.options.title }}</h3>
            <p>{{ state.options.message }}</p>
          </div>
        </div>

        <div class="erag-modal-footer">
          <button class="erag-btn-cancel" @click="handleAction(false)">
            {{ state.options.cancelText || 'Cancel' }}
          </button>
          <button
              class="erag-btn-confirm"
              :class="state.options.type"
              @click="handleAction(true)"
          >
            {{ state.options.confirmText || 'Confirm' }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useModal } from '../composables/useModal';

const { state, handleAction } = useModal();
</script>

<style scoped>
.erag-modal-backdrop {
  position: fixed;
  top: 0; left: 0; width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  backdrop-filter: blur(2px);
}

.erag-modal-container {
  background: white;
  width: 90%;
  max-width: 450px;
  border-radius: 8px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  font-family: inherit;
}

.erag-modal-body {
  padding: 24px;
  display: flex;
  gap: 16px;
}

.erag-modal-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fee2e2;
  color: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.erag-modal-icon-wrapper svg { width: 24px; height: 24px; }

.erag-modal-text h3 { margin: 0 0 8px 0; font-size: 18px; color: #111827; font-weight: 600; }
.erag-modal-text p { margin: 0; font-size: 14px; color: #6b7280; line-height: 1.5; }

/* Footer */
.erag-modal-footer {
  background: #f9fafb;
  padding: 12px 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Buttons */
button {
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.erag-btn-cancel {
  background: white;
  color: #374151;
  border-color: #d1d5db;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.05);
}
.erag-btn-cancel:hover { background: #f3f4f6; }

.erag-btn-confirm.danger {
  background: #dc2626;
  color: white;
}
.erag-btn-confirm.danger:hover { background: #b91c1c; }

/* Transitions */
.erag-modal-fade-enter-active, .erag-modal-fade-leave-active { transition: opacity 0.2s; }
.erag-modal-fade-enter-from, .erag-modal-fade-leave-to { opacity: 0; }
</style>