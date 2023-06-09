
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cart_reducer";

const CartContext = createContext();

const getLocalCartData= () =>{
    let newCartData = localStorage.getItem("the_cart");
    if (newCartData===[]){
        return []
    }else{
        return JSON.parse(newCartData)
    }
}

const initialState = {
//   cart: [],
    cart: getLocalCartData(),
  total_item: "",
  total_price: "",
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART"})

  }

  const setDecrease=(id) => {
    dispatch({type:"SET_DECREMENT",payload:id})

  }

  const setIncrease=(id) => {
    dispatch({type:"SET_INCREMENT",payload:id})

  }

//   now localstorage takes 2 arguments , 1 is var name or id ( like here cart ) and other value in string format 
  useEffect(()=>{
    // dispatch({type:"CART_TOTAL_ITEM"})
    // dispatch({type:"CART_TOTAL_PRICE"})
    dispatch({type:"CART_ITEM_PRICE_TOTAL"})
    localStorage.setItem("the_cart", JSON.stringify(state.cart))},[state.cart])

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem,clearCart,setDecrease,setIncrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };