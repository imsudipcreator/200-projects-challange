import { Product } from "@/data/products";
import { create } from "zustand";

interface CartState {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void
}

export const useCartStore = create<CartState>((set) => ({
    cart: [],
    addToCart: (product: Product) => set((state) => ({ cart: [...state.cart, product]})),
    removeFromCart: (productId: number) => set((state) => ({ cart: state.cart.filter(product => product.id !== productId)})),
    clearCart: () => set({ cart: []})
}))