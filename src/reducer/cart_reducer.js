import { act } from "react-dom/test-utils";

const cartReducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
      let { id, color, amount, product } = action.payload;
      console.log(
        "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
        product
      );


      let existingProduct = state.cart.find((curElem) => curElem.id === id + color );

      if (existingProduct){

        let updatedProduct = state.cart.map((curElem) => {
          if (curElem.id === id + color){
            let newAmount = curElem.amount + amount;

            if (newAmount >= curElem.max){
              newAmount = curElem.max;
            }
            return {
              ...curElem,
              amount : newAmount,
            };
          
          }else{
            return{
              ...curElem
            }
          }
        });

        return {
          ...state,
          cart : updatedProduct,
        }

      }else{

        let cartProduct = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.image[0].url,
          price: product.price,
          max: product.stock,
        };

    
        return {
          ...state,
          cart: [...state.cart, cartProduct],
        };
      };
    }
    
    if (action.type === "REMOVE_ITEM"){
        let updateCart = state.cart.filter(
            (curElem) => 
            curElem.id !== action.payload )
        return {
            ...state,
            cart : updateCart,
        }
    }

    if (action.type==="CLEAR_CART"){
      return{
        ...state,
        cart : []
      }
    }

    if (action.type === "SET_DECREMENT") {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let decAmount = curElem.amount - 1;
  
          if (decAmount <= 1) {
            decAmount = 1;
          }
  
          return {
            ...curElem,
            amount: decAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updatedProduct };
    }
  
    if (action.type === "SET_INCREMENT") {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === action.payload) {
          let incAmount = curElem.amount + 1;
  
          if (incAmount >= curElem.max) {
            incAmount = curElem.max;
          }
  
          return {
            ...curElem,
            amount: incAmount,
          };
        } else {
          return curElem;
        }
      });
      return { ...state, cart: updatedProduct };
    }


    if (action.type === "CART_ITEM_PRICE_TOTAL") {
      let { total_item, total_price } = state.cart.reduce(
        (accum, curElem) => {
          let { price, amount } = curElem;
  
          accum.total_item += amount;
          accum.total_price += price * amount;
  
          return accum;
        },
        {
          total_item: 0,
          total_price: 0,
        }
      );
      return {
        ...state,
        total_item,
        total_price,
      };
    }

    // if (action.type==="CART_TOTAL_ITEM"){
    //   let updateItemAmount = state.cart.reduce((initialValue,curElem)=>{
    //     let { amount } = curElem
    //     initialValue = initialValue + amount
    //     return initialValue
        
    //   },0);

    //   return{
    //     ...state,
    //     total_item : updateItemAmount,
    //   }
    // }

    // if (action.type==="CART_TOTAL_PRICE"){
    //   let totalPrice = state.cart.reduce((initialValue,curElem)=>{
    //     let {price,amount} = curElem
    //     initialValue = initialValue + (price * amount)

    //     return initialValue


    //   },0)

    //   return{
    //     ...state,
    //     total_price : totalPrice,
    //   }
    // }
  
    return state;
  };
  
  export default cartReducer;

























// const CartReducer = (state,action) => {

//     if (action.type === "ADD_TO_CART") {
//         let { id, color, amount, product } = action.payload;
//         // console.log(
//         //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
//         //   product
//         // );

//         let cartProduct ;

//         cartProduct = {
//             id : id + color,
//             name : product.name,
//             color,
//             amount,
//             image : product.image[0].url,
//             price : product.price,
//             max: product.stock


// // hum nai cart mai append krna hai , so hum pheley likhai gai ..state.cart ie pheley jo alredy state kai cart mai hai vo rhai , yani ki vo ajay then fir cartproduct ajai 
//         };
//         return{
//             ...state,
//             cart: [...state.cart, cartProduct]
//         };
    
//     }
//     return state;



// };

// export default CartReducer