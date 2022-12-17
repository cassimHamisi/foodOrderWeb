import CartContext from "./cart-context";
import { useReducer } from "react";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.actionItem.price * action.actionItem.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.actionItem.id
    );

    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.actionItem.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.actionItem);
    }

    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  if (action.type === "REMOVE") {
    // find the item index
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.actionID
    );
    // find the item in the state
    const existingItem = state.items[existingCartItemIndex];
    // update the price
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    let updatedItems;
    // check if there is atleast on instance of the item
    if (existingItem.amount === 1) {
      // filter the item by removing the action dispached
      updatedItems = state.items.filter((item) => item.id !== action.actionID);
    } else {
      // update the existing amount to a =lower value
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      // update the state items to be the same as the original
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }

  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemFromCart = (item) => {
    dispatchCartAction({ type: "ADD", actionItem: item });
  };

  const removeItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", actionID: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemFromCart,
    removeItem: removeItemFromCart,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
