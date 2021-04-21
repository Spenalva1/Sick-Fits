import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

const CartStateProvider = ({ children }) => {
  // This is our own custom provider! We will store data (state) and functionality (updaters) in here and anyone can access ir via the consumer!
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart, closeCart, openCart }}>
      {children}
    </LocalStateProvider>
  );
};

CartStateProvider.propTypes = {
  children: PropTypes.any,
};

// make a custom hook for accessing the cart local state
const useCart = () => {
  const all = useContext(LocalStateContext);
  return all;
};

export { CartStateProvider, useCart };
