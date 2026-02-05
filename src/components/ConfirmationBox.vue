<template>
  <Transition name="erag-modal-fade">
    <div
      v-if="state.isOpen"
      class="erag-modal-backdrop"
    >
      <div class="erag-modal-container">
        <div class="erag-modal-body">
          <!-- ICON -->
          <div
            v-if="resolvedIcon"
            class="erag-modal-icon-wrapper"
            :class="`erag-${currentType?.iconClass}`"
            v-html="resolvedIcon"
          />

          <!-- TEXT -->
          <div class="erag-modal-text">
            <h3 class="erag-modal-title">
              {{ state.options.title }}
            </h3>
            <p class="erag-modal-message">
              {{ state.options.message }}
            </p>
          </div>
        </div>

        <!-- FOOTER -->
        <div class="erag-modal-footer">
          <button
            class="erag-btn erag-btn-cancel"
            @click="handleAction(false)"
          >
            {{ state.options.cancelText }}
          </button>

          <button
            class="erag-btn"
            :class="`erag-btn-${currentType.confirmClass}`"
            @click="handleAction(true)"
          >
            {{ state.options.confirmText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useConfirmation } from '../composables/useConfirmation';

const { state, handleAction, currentType, resolvedIcon } = useConfirmation();
</script>

<style scoped>
/* Backdrop */
.erag-modal-backdrop {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    backdrop-filter: blur(2px);
    background: rgba(0, 0, 0, 0.5);
}

/* Modal */
.erag-modal-container {
    background: #fff;
    width: 90%;
    max-width: 450px;
    border-radius: 8px;
    overflow: hidden;
}

/* Body */
.erag-modal-body {
    padding: 24px;
    display: flex;
    gap: 16px;
}

/* Icon */
.erag-modal-icon-wrapper {
    width: 45px;
    height: 45px;
    color: rgb(220, 38, 38);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 50%;
    background: rgb(254, 226, 226);
}

/* Icon colors */
.erag-info {
    background: #e0f2fe;
    color: #0284c7;
}
.erag-success {
    background: #dcfce7;
    color: #16a34a;
}
.erag-warning {
    background: #fef3c7;
    color: #d97706;
}
.erag-danger {
    background: #fee2e2;
    color: #dc2626;
}

/* Text */
.erag-modal-title {
    margin: 0 0 6px;
    font-size: 18px;
    font-weight: 600;
}

.erag-modal-message {
    margin: 0;
    font-size: 14px;
    color: #6b7280;
}

/* Footer */
.erag-modal-footer {
    padding: 12px 24px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    background: #f9fafb;
}

/* Buttons */
.erag-btn {
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    cursor: pointer;
    border: none;
}

.erag-btn-cancel {
    background: #fff;
    border: 1px solid #d1d5db;
}

.erag-btn-info {
    background: #0284c7;
    color: #fff;
}
.erag-btn-success {
    background: #16a34a;
    color: #fff;
}
.erag-btn-warning {
    background: #d97706;
    color: #fff;
}
.erag-btn-danger {
    background: #dc2626;
    color: #fff;
}

/* Transition */
.erag-modal-fade-enter-active,
.erag-modal-fade-leave-active {
    transition: opacity 0.2s;
}
.erag-modal-fade-enter-from,
.erag-modal-fade-leave-to {
    opacity: 0;
}
</style>
