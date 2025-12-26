import type { App, Plugin } from 'vue';
import { createVNode, render } from 'vue';
import ToastContainer from './components/ToastContainer.vue';
import { useToast } from './composables/useToast';
import type { PluginOptions } from './types';

// Export everything for users
export * from './types';
export { useToast };

const ToastPlugin: Plugin = {
    install(app: App, options: PluginOptions = {}) {
        // 1. Create container in DOM
        // Check if it already exists to avoid duplicates
        if (!document.getElementById('erag-toast-container')) {
            const container = document.createElement('div');
            container.id = 'erag-toast-container';
            document.body.appendChild(container);

            // 2. Render Component
            const vnode = createVNode(ToastContainer);
            render(vnode, container);
        }

        // 3. Set default position
        if (options.position) {
            const { setPosition } = useToast();
            setPosition(options.position);
        }

        // Optional: Global Property for Options API
        app.config.globalProperties.$toast = useToast();
    }
};

export default ToastPlugin;
