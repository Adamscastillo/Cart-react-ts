import { createContext, ReactNode, useContext, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hoooks/useLocalStorage";

type CartContextProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
};

type CartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number;
  incrementCartQuantity: (id: number) => void;
  decrementCartQuantity: (id: number) => void;
  removeItemQuantity: (id: number) => void;
  cartQuantily: number
  cartItems: CartItem[]
};
const CartContext = createContext({} as CartContext);

export function useShoppingCart() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }: CartContextProps) {
  const [isOpen, SetIsOpen] = useState(false);
  const [cartItems, SetCartItems] = useLocalStorage<CartItem[]>(
    "Shopping-cart",
    []
  );

  const  cartQuantily = cartItems.reduce((quantity, item ) => item.quantity + quantity, 0)

  const openCart = () => SetIsOpen(true)
  const closeCart = () => SetIsOpen(false)

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function incrementCartQuantity(id: number) {
    SetCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decrementCartQuantity(id: number) {
    SetCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeItemQuantity(id: number) {
    SetCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        incrementCartQuantity,
        decrementCartQuantity,
        removeItemQuantity,
        openCart, closeCart,
        cartItems,
        cartQuantily
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
      
    </CartContext.Provider>
  );
}
