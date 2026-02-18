import { create } from 'zustand';
import type { PrebuiltPC, Component } from '../types/pc';
import prebuiltData from '../data/prebuilt-pcs.json';
import componentData from '../data/components.json';

interface CatalogStore {
    prebuiltPCs: PrebuiltPC[];
    components: Component[];
    // Actions to filter or get details could be added here
    getPCById: (id: string) => PrebuiltPC | undefined;
}

export const useCatalogStore = create<CatalogStore>((_set, get) => ({
    prebuiltPCs: prebuiltData as unknown as PrebuiltPC[],
    components: componentData as unknown as Component[],

    getPCById: (id) => {
        return get().prebuiltPCs.find(pc => pc.id === id);
    }
}));
