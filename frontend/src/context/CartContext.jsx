import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { addToast } = useToast();
  const [cart, setCart] = useState({ items: [], totalItems: 0, totalPrice: 0 });
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend whenever authentication status changes
  const fetchCart = async () => {
    if (!isAuthenticated) {
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/cart');
      if (res.data?.success && res.data?.data) {
        setCart(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [isAuthenticated]);

  const addToCart = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      addToast('Please log in to add products to your cart', 'warning');
      return { success: false, requireLogin: true };
    }

    try {
      setLoading(true);
      const res = await api.post('/cart/items', { productId, quantity });
      if (res.data?.success && res.data?.data) {
        setCart(res.data.data);
        addToast('Product added to your cart!', 'success');
        return { success: true };
      }
      throw new Error(res.data?.message || 'Failed to add item to cart');
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Error adding item to cart';
      addToast(msg, 'error');
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.put(`/cart/items/${itemId}`, { quantity });
      if (res.data?.success && res.data?.data) {
        setCart(res.data.data);
        return { success: true };
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Error updating item quantity';
      addToast(msg, 'error');
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) return;
    try {
      const res = await api.delete(`/cart/items/${itemId}`);
      if (res.data?.success && res.data?.data) {
        setCart(res.data.data);
        addToast('Item removed from cart', 'info');
      }
    } catch (err) {
      const msg = err.response?.data?.message || 'Error removing item';
      addToast(msg, 'error');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) return;
    try {
      await api.delete('/cart/clear');
      setCart({ items: [], totalItems: 0, totalPrice: 0 });
    } catch (err) {
      console.error('Error clearing cart:', err);
    }
  };

  const value = {
    cart,
    cartCount: cart?.totalItems || 0,
    cartTotal: cart?.totalPrice || 0,
    loading,
    fetchCart,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
