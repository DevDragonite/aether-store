export interface PrebuiltPC {
    id: string;
    name: string;
    tier: 'entry' | 'mid' | 'high' | 'ultimate';
    price: number;
    originalPrice?: number;
    images: string[];
    description: string;
    specs: {
        cpu: string;
        gpu: string;
        ram: string;
        storage: string;
        motherboard: string;
        psu: string;
        case: string;
        cooler: string;
    };
    performance: {
        gaming1080p?: string;
        gaming1440p?: string;
        gaming4k?: string;
        productivity?: string;
    };
    highlights: string[];
    inStock: boolean;
    badge?: 'bestseller' | 'new' | 'limited';
}

export interface Component {
    id: string;
    name: string;
    price: number;
    brand: string;
    type: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler';
    image: string;
    specs: Record<string, string>;
    inStock: boolean;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    type: 'prebuilt' | 'component';
}
