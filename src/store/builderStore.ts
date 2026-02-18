import { create } from 'zustand';
import type { Component } from '../types/component';

interface BuilderStore {
    build: {
        components: Record<string, Component | Component[]>;
    };
    addComponent: (component: Component) => void;
    removeComponent: (type: string, id?: string) => void;
    clearBuild: () => void;
    getTotalPrice: () => number;
}

export const useBuilderStore = create<BuilderStore>((set, get) => ({
    build: {
        components: {}
    },

    addComponent: (component) => set((state) => {
        const newComponents = { ...state.build.components };

        if (component.type === 'ram' || component.type === 'storage') {
            const existing = newComponents[component.type] || [];
            const currentArray = Array.isArray(existing) ? existing : [existing];
            // Type assertion to fix TS error since we know component matches the type
            newComponents[component.type] = [...currentArray, component] as Component[];
        } else {
            newComponents[component.type] = component;
        }

        return {
            build: {
                ...state.build,
                components: newComponents
            }
        };
    }),

    removeComponent: (type, id) => set((state) => {
        const newComponents = { ...state.build.components };

        if (type === 'ram' || type === 'storage') {
            if (id) {
                const existing = newComponents[type];
                if (Array.isArray(existing)) {
                    newComponents[type] = existing.filter(c => c.id !== id);
                }
            } else {
                delete newComponents[type];
            }
        } else {
            delete newComponents[type];
        }

        return {
            build: {
                ...state.build,
                components: newComponents
            }
        };
    }),

    clearBuild: () => set({
        build: { components: {} }
    }),

    getTotalPrice: () => {
        const { components } = get().build;
        let total = 0;

        Object.values(components).forEach(comp => {
            if (Array.isArray(comp)) {
                comp.forEach(c => total += c.price);
            } else if (comp) {
                total += comp.price;
            }
        });

        return total;
    },
}));
