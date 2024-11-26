import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

function CartContextProvider({ children }) {
  
  const [cartItems, setcartItems] = useState([]);
  const [isLoaded , setisLoaded] = useState(false)

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('CartItems', JSON.stringify(cartItems))
    }
  
    
  }, [cartItems])
  
  useEffect(() => {
    const itemsFromLocalStorage = localStorage.getItem('CartItems')
    console.log(itemsFromLocalStorage);
    if (itemsFromLocalStorage) {
      setcartItems([...JSON.parse(itemsFromLocalStorage)])
    }
    setisLoaded(true)  
    
  }, [])

  function addItemsToCart(item) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == item.id);

    if (itemIndex == -1) {
      arr.push({ ...item, quantity: 1 });
    } else {
      arr[itemIndex].quantity++;
    }
    setcartItems([...arr]);
  }

  function decreaseItemToCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);
    arr[itemIndex].quantity--;

    setcartItems([...arr]);
  }
  function removeItemFromCart(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);

    arr.splice(itemIndex, 1);

    setcartItems([...arr]);
  }

  function isItemAdded(id) {
    const arr = cartItems;
    const itemIndex = cartItems.findIndex((data) => data.id == id);

    if (itemIndex == -1) {
      return null;
    } else {
      return arr[itemIndex];
    }
  }
  return (
    <CartContext.Provider
      value={{ decreaseItemToCart ,cartItems, isItemAdded, addItemsToCart, removeItemFromCart ,setcartItems}}
    >
      {children}
    </CartContext.Provider>
  );
}
export default CartContextProvider;