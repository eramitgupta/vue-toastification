import type { App, Plugin } from 'vue';
import { createVNode, render } from 'vue';
import ToastContainer from './components/ToastContainer.vue';
import ConfirmationBox from './components/ConfirmationBox.vue';
import { useToast } from './composables/useToast';
import { useConfirmation } from './composables/useConfirmation';
import type { PluginOptions } from './types';

export * from './types';
export { useToast, useConfirmation };

const ToastPlugin: Plugin = {
    install(app: App, options: PluginOptions = {}) {
        // 1. Setup Toast Container
        if (!document.getElementById('erag-toast-container')) {
            const container = document.createElement('div');
            container.id = 'erag-toast-container';
            document.body.appendChild(container);

            // 2. Render Component
            const vnode = createVNode(ToastContainer);
            render(vnode, container);
        }

        // 2. Setup Modal Container
        if (!document.getElementById('erag-modal-container')) {
            const modalContainer = document.createElement('div');
            modalContainer.id = 'erag-modal-container';
            document.body.appendChild(modalContainer);

            // Render Modal Component
            const modalVnode = createVNode(ConfirmationBox);
            render(modalVnode, modalContainer);
        }

        // 3. Set default position
        if (options.position) {
            const { setPosition } = useToast();
            setPosition(options.position);
        }

        app.config.globalProperties.$toast = useToast();
    }
};

export default ToastPlugin;
