import {
  useState,
  useEffect,
  createContext,
  useContext,
  ReactNode,
} from "react";

import { Cart as CartTypes } from "../types/cart";

const CartContext = createContext<{
  cart: {
    total: number;
    items: CartTypes[];
  };
  clearCart?: any;
  addToCart?: any;
  cartIsOpen: boolean;
  setCartOpen?: any;
}>({
  cart: {
    total: 0,
    items: [],
  },
  cartIsOpen: false,
});

const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{
    total: number;
    items: CartTypes[];
  }>({
    total: 0,
    items: [],
  });
  const [cartIsOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const cart = getCart();
    if (cart) {
      setCart(getCart());
    }
  }, [cart.items.length, cart.total]);

  const addToCart = (item: any) => {
    const newCart = { items: [...cart.items, item], total: ++cart.total };

    if (typeof window !== "undefined" && window?.localStorage) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }

    setCart((prevState) => ({
      ...prevState,
      ...newCart,
    }));
  };

  const clearCart = () => {
    const newCart = {
      items: [],
      total: 0,
    };

    if (typeof window !== "undefined" && window?.localStorage) {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
    return setCart(newCart);
  };

  const getCart = () => {
    if (typeof window !== "undefined" && window?.localStorage) {
      const cartString = localStorage.getItem("cart");
      const cart = cartString
        ? JSON.parse(cartString)
        : {
            items: [],
            total: 0,
          };
      return cart;
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart: {
          total: cart.total,
          items: cart.items,
        },
        clearCart,
        addToCart,
        cartIsOpen,
        setCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);
export { CartProvider, useCart };

export default useCart;
