import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, User } from '../types';

interface ShopContextType {
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);

  // Load cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('ez_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
    
    // Session check
    const savedUser = localStorage.getItem('ez_active_user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  useEffect(() => {
    localStorage.setItem('ez_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size && item.selectedColor === color);
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && item.selectedSize === size && item.selectedColor === color)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Mock Authentication Logic
  const register = (name: string, email: string, password: string): boolean => {
    // 1. Check if user already exists in "database"
    const usersDb = JSON.parse(localStorage.getItem('ez_users_db') || '[]');
    const exists = usersDb.find((u: any) => u.email === email);
    
    if (exists) return false;

    // 2. Create new user
    const newUser = { 
      id: 'u' + Date.now(), 
      name, 
      email, 
      password, // In a real app, never store plain text passwords!
      role: 'user' as const
    };

    // 3. Save to "database"
    usersDb.push(newUser);
    localStorage.setItem('ez_users_db', JSON.stringify(usersDb));
    
    // 4. Auto login
    const { password: _, ...safeUser } = newUser; // Remove password from session
    setUser(safeUser);
    localStorage.setItem('ez_active_user', JSON.stringify(safeUser));
    
    return true;
  };

  const login = (email: string, password: string): boolean => {
    const usersDb = JSON.parse(localStorage.getItem('ez_users_db') || '[]');
    const foundUser = usersDb.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...safeUser } = foundUser;
      setUser(safeUser);
      localStorage.setItem('ez_active_user', JSON.stringify(safeUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ez_active_user');
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]);
  };

  return (
    <ShopContext.Provider value={{ 
      cart, addToCart, removeFromCart, updateQuantity, clearCart, 
      cartTotal, cartCount, user, login, register, logout, wishlist, toggleWishlist 
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within ShopProvider');
  return context;
};
