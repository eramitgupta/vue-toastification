# @erag/vue-toastification

A lightweight, high-performance, and customizable Toast Notification library for **Vue 3**. Built with **TypeScript** and the Composition API.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Vue](https://img.shields.io/badge/Vue-3.x-green.svg)
![TypeScript](https://img.shields.io/badge/language-TypeScript-blue.svg)

## 🚀 Features

- **Vue 3 Composition API** support.
- **Fully Typed** with TypeScript.
- **Lightweight** & Zero dependencies.
- **Scoped CSS**: Uses `erag-` prefix to prevent CSS conflicts with frameworks like Bootstrap or Tailwind.
- **Customizable**: Control position, duration, and content easily.
- **4 Built-in Types**: Success, Error, Warning, and Info.

---

## 📦 Installation

Install the package via npm:

```bash
npm install @erag/vue-toastification

```

---

## ⚙️ Setup

Register the plugin in your main Vue application file (usually `main.ts` or `main.js`). **Don't forget to import the CSS file.**

```typescript
import { createApp } from 'vue';
import App from './App.vue';

// 1. Import the plugin and styles
import ToastPlugin from '@erag/vue-toastification';
import '@erag/vue-toastification/dist/style.css';

const app = createApp(App);

// 2. Use the plugin (Optional: Set default position)
app.use(ToastPlugin, {
    position: 'bottom-right' // Default: bottom-right
});

app.mount('#app');
```

---

## 💡 Usage

You can use the `useToast` composable anywhere in your components to trigger notifications.

### 1. Basic Usage (All Types)

```html
<script setup lang="ts">
    import { useToast } from '@erag/vue-toastification';

    // Destructure the methods you need
    const { success, error, warning, info } = useToast();

    const showNotifications = () => {
        // success(message, title, duration?)
        success('Data saved successfully!', 'Good Job');

        // error(message, title, duration?)
        error('Something went wrong.', 'Error Occurred');

        // warning(message, title, duration?)
        warning('Your session is about to expire.', 'Warning');

        // info(message, title, duration?)
        info('New update available.', 'Info');
    };
</script>

<template>
    <button @click="showNotifications">Show Toasts</button>
</template>
```

---

### 2. Changing Position Dynamically

You can change the position of the toasts at runtime using `setPosition`.

**Available Positions:**

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

```typescript
const { setPosition, info } = useToast();

const moveToTop = () => {
    setPosition('top-center');
    info('I am now at the Top Center!', 'Position Changed');
};
```

---

### 3. Custom Duration

By default, toasts disappear after **4500ms (4.5 seconds)**. You can override this for specific notifications.

```typescript
const { success, error } = useToast();

// Disappears quickly (1 second)
const quickToast = () => {
    success('Quick save!', 'Done', 1000);
};

// Stays longer (8 seconds)
const longToast = () => {
    error('Please read this error carefully...', 'Important', 8000);
};
```

---

## 🎨 API Reference

### `useToast()` Methods

| Method        | Arguments                                          | Description                              |
| ------------- | -------------------------------------------------- | ---------------------------------------- |
| `success`     | `(msg: string, title?: string, duration?: number)` | Triggers a green success toast.          |
| `error`       | `(msg: string, title?: string, duration?: number)` | Triggers a red error toast.              |
| `warning`     | `(msg: string, title?: string, duration?: number)` | Triggers an orange warning toast.        |
| `info`        | `(msg: string, title?: string, duration?: number)` | Triggers a blue info toast.              |
| `setPosition` | `(position: ToastPosition)`                        | Updates the global container position.   |
| `remove`      | `(id: number)`                                     | Manually removes a specific toast by ID. |

### Global Options

When registering the plugin:

```typescript
app.use(ToastPlugin, {
    position: 'top-right' // Sets the initial position
});
```

---

## 🛡️ CSS & Styling

This library uses the **`erag-`** prefix for all CSS classes to ensure it never breaks your existing UI (Tailwind, Bootstrap, etc.).

- Container: `.erag-toast-container`
- Toast Card: `.erag-toast`
- Themes: `.erag-success`, `.erag-error`, etc.

---

## 📄 License

MIT License © Er Amit Gupta
