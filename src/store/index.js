import { create } from 'zustand';

/**
 * Global store for MacBook product configuration.
 * Manages visual state shared across UI controls and 3D scene.
 */
const useMacbookStore = create((set) => ({
    // Currently selected MacBook color
    color: '#2e2c2e',

    // Update the selected MacBook color
    setColor: (color) => set({ color }),

    // Current scale value used to switch between 14" and 16" models
    scale: 0.08,

    // Update the active scale (size selection)
    setScale: (scale) => set({ scale }),

    // Reset product configuration to default values
    // Useful for initial load or future "Reset" actions
    reset: () =>
        set({
            color: '#2e2c2e',
            scale: 0.08,
        }),
}));

export default useMacbookStore;
