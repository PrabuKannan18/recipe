// recipe.ts
export interface Recipe {
    id: string;
    name: string;
    price: number;
    description: string;
    category: string;
    imageUrl: string;
}

export interface CartItem {
    id: string; // Changed from number to string to match recipe id type
    name: string;
    price: number;
    quantity: number;
    image: string;
}
