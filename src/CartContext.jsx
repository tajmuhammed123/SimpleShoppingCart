import React, { createContext, useContext, useState } from 'react';

const Cartcontext = createContext();

const CartContext = ({ children }) => {
  const [cart, setCart] = useState([]);

  return (
    <Cartcontext.Provider value={{ cart, setCart }}>
      {children}
    </Cartcontext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(Cartcontext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};


export default CartContext