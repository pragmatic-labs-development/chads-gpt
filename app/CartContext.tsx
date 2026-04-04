'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  variantId: number;
  variantTitle: string;
  productTitle: string;
  price: number; // in cents
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, variantId: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.productId === newItem.productId && i.variantId === newItem.variantId
      );
      if (existing) {
        return prev.map(i =>
          i.productId === newItem.productId && i.variantId === newItem.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, newItem];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, variantId: number) => {
    setItems(prev =>
      prev.filter(i => !(i.productId === productId && i.variantId === variantId))
    );
  };

  const clearCart = () => setItems([]);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clearCart, isOpen, setIsOpen, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
