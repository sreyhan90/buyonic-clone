"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
} from "react";

export interface CartItemType {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItemType[];
  addToCart: (item: Omit<CartItemType, "quantity">) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
}

type StoredUser = {
  fullName: string;
  username: string;
  email: string;
};

const CartContext = createContext<CartContextType | null>(null);

const getCartStorageKey = () => {
  if (typeof window === "undefined") return "buyonic-cart-guest";

  try {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      return "buyonic-cart-guest";
    }

    const currentUser = JSON.parse(storedUser);

    if (currentUser?.email) {
      return `buyonic-cart-${currentUser.email}`;
    }

    if (currentUser?.username) {
      return `buyonic-cart-${currentUser.username}`;
    }

    return "buyonic-cart-guest";
  } catch (error) {
    console.error("Failed to parse current user:", error);
    return "buyonic-cart-guest";
  }
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadCart = () => {
      try {
        const cartKey = getCartStorageKey();
        const storedCart = localStorage.getItem(cartKey);

        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Failed to load cart from localStorage:", error);
        setCartItems([]);
      } finally {
        setIsLoaded(true);
      }
    };

    loadCart();

    window.addEventListener("auth-change", loadCart);

    return () => {
      window.removeEventListener("auth-change", loadCart);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      const cartKey = getCartStorageKey();
      localStorage.setItem(cartKey, JSON.stringify(cartItems));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cartItems, isLoaded]);

  const addToCart = (item: Omit<CartItemType, "quantity">) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (id: string) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setCartItems([]);

    try {
      const cartKey = getCartStorageKey();
      localStorage.removeItem(cartKey);
    } catch (error) {
      console.error("Failed to clear cart from localStorage:", error);
    }
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  }, [cartItems]);

  const totalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
