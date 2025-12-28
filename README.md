# @erag/vue-toastification

A lightweight, high-performance **Toast Notification** and **Confirmation Modal** library for **Vue 3**. Built with **TypeScript** and the Composition API.

![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

![erag-vue-toastification](https://github.com/user-attachments/assets/8816bf9b-8327-4e27-a6b3-56419cee9500)

## 🚀 Features

- **Vue 3 Composition API** support (`useToast`, `useModal`).
- **Promise-based Modals**: Await user confirmation directly in your code (no callbacks needed).
- **Fully Typed** with TypeScript.
- **Lightweight** & Zero dependencies.
- **Scoped CSS**: Uses `erag-` prefix to prevent CSS conflicts with Bootstrap, Tailwind, etc.
- **Customizable**: Control position, duration, content, and button labels.
- **4 Built-in Toast Types**: Success, Error, Warning, and Info.

---

## 📦 Installation

Install the package via npm:

```bash
npm install @erag/vue-toastification

```

---

## ⚙️ Setup

Register the plugin in your main Vue application file (usually `main.ts` or `main.js`). **Important: Do not forget to import the CSS file.**

```typescript
import { createApp } from 'vue';
import App from './App.vue';

// 1. Import the plugin and styles
import ToastPlugin from '@erag/vue-toastification';
import '@erag/vue-toastification/dist/style.css';

const app = createApp(App);

// 2. Use the plugin
app.use(ToastPlugin, {
    position: 'bottom-right' // Default position for toasts
});

app.mount('#app');
```

---

## 🍞 Usage: Toast Notifications

Use the `useToast` composable to trigger non-blocking notifications.

### 1. Basic Usage

```html
<script setup lang="ts">
    import { useToast } from '@erag/vue-toastification';

    const { success, error, warning, info } = useToast();

    const showToasts = () => {
        // Success (Green)
        success('Data saved successfully!', 'Good Job');

        // Error (Red) - Custom duration (5 seconds)
        error('Server connection failed.', 'Error', 5000);

        // Warning (Orange)
        warning('Your session is expiring.', 'Warning');

        // Info (Blue)
        info('New update available.', 'Info');
    };
</script>
```

### 2. Advanced: Dynamic Types (Handling API Responses)

Sometimes you receive the status type (e.g., `'success'` or `'error'`) directly from an API response. Instead of writing multiple `if-else` statements, you can use **bracket notation** to call the toast method dynamically.

```typescript
import { useToast } from '@erag/vue-toastification';
import type { ToastType } from '@erag/vue-toastification';

const toast = useToast();

const handleApiRequest = async () => {
    try {
        // Assume API returns: { status: 'success', message: 'Profile updated!' }
        const response = await api.updateProfile();

        // 1. Cast the string to ToastType
        const type = response.status as ToastType;

        // 2. Dynamic Call: Automatically calls toast.success() or toast.error()
        toast[type](response.message, 'Notification');
    } catch (err) {
        toast.error('Something went wrong');
    }
};
```

---

## 💬 Usage: Confirmation Modals (New!)

![Adobe Express - Screen Recording 2025-12-28 at 12 29 39 PM](https://github.com/user-attachments/assets/757c30c7-a98f-4f8f-a66f-d9750ef82099)


Use the `useModal` composable to trigger blocking confirmation dialogs. The `confirm()` method returns a **Promise** that resolves to `true` (Confirmed) or `false` (Cancelled).

### 1. Danger / Delete Action (Red Button)

Use `type: 'danger'` for destructive actions like deleting data.

```typescript
<script setup lang="ts">
import { useModal, useToast } from '@erag/vue-toastification';

const modal = useModal();
const toast = useToast();

const handleDelete = async () => {
    // Execution pauses here until the user clicks a button
    const isConfirmed = await modal.confirm({
        title: 'Delete Account?',
        message: 'Are you sure? This action cannot be undone.',
        confirmText: 'Yes, Delete',
        cancelText: 'No, Keep it',
        type: 'danger' // Makes the confirm button Red
    });

    if (isConfirmed) {
        // User clicked "Yes, Delete"
        console.log('User deleted account');
        toast.success('Account deleted successfully');
    } else {
        // User clicked "No" or Cancel
        toast.info('Action cancelled');
    }
};
</script>

```

### 2. General Confirmation (Info/Warning)

```typescript
const logout = async () => {
    const ok = await modal.confirm({
        title: 'Logout',
        message: 'You have unsaved changes. Do you really want to leave?',
        confirmText: 'Logout',
        type: 'warning'
    });

    if (ok) {
        // Perform logout logic
    }
};
```

---

## 🎨 API Reference

### 1. `useToast()`

| Method        | Arguments                                          | Description                              |
| ------------- | -------------------------------------------------- | ---------------------------------------- |
| `success`     | `(msg: string, title?: string, duration?: number)` | Triggers a green success toast.          |
| `error`       | `(msg: string, title?: string, duration?: number)` | Triggers a red error toast.              |
| `warning`     | `(msg: string, title?: string, duration?: number)` | Triggers an orange warning toast.        |
| `info`        | `(msg: string, title?: string, duration?: number)` | Triggers a blue info toast.              |
| `setPosition` | `(position: ToastPosition)`                        | Updates the global container position.   |
| `remove`      | `(id: number)`                                     | Manually removes a specific toast by ID. |

### 2. `useModal()`

| Method    | Arguments                 | Returns            | Description                             |
| --------- | ------------------------- | ------------------ | --------------------------------------- |
| `confirm` | `(options: ModalOptions)` | `Promise<boolean>` | Opens modal. Returns true if confirmed. |


#### `ModalOptions` Interface

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | **Required** | The bold heading of the modal. |
| `message` | `string` | **Required** | The descriptive text body. |
| `confirmText` | `string` | `'Confirm'` | Label for the action button. |
| `cancelText` | `string` | `'Cancel'` | Label for the cancel button. |
| `type` | `'danger' \| 'warning' \| 'info'` | `'info'` | Controls button colors (Danger = Red, etc). |


## 🛡️ CSS & Styling

This library uses the **`erag-`** prefix for all CSS classes to ensure it never breaks your existing UI.

- **Toast Container**: `.erag-toast-container`
- **Modal Backdrop**: `.erag-modal-backdrop`
- **Buttons**: `.erag-btn-confirm`, `.erag-btn-cancel`

---

## 📄 License

MIT License © Er Amit Gupta
