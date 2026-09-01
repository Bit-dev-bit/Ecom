import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCart({ items: [] });
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/api/cart');
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, qty) => {
    if (!user) {
      // For a real prod app we might save to localStorage here
      alert("Please login to add to cart");
      return;
    }
    try {
      setLoading(true);
      const { data } = await axios.post('/api/cart', { productId, qty });
      setCart(data);
    } catch (error) {
      console.error('Error adding to cart', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(`/api/cart/${productId}`);
      setCart(data);
    } catch (error) {
      console.error('Error removing from cart', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  const calculateTotal = () => {
    return cart.items.reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price;
      return acc + (price * item.qty);
    }, 0).toFixed(2);
  };

  const calculateItemCount = () => {
    return cart.items.reduce((acc, item) => acc + item.qty, 0);
  };

  return (
    <CartContext.Provider value={{ 
      cart, 
      loading, 
      addToCart, 
      removeFromCart,
      calculateTotal,
      calculateItemCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
