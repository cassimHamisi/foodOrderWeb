import CartContext from "../../store/cart-context";
import CartItems from "./CartItem";
import React from "react";
import { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import Checkout from "./CheckOut";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const [checkOut, setIsCheckOut] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);

  const totalAmount = `Ksh.${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItems
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );
  const onOrderHandler = () => {
    setIsCheckOut(true);
  };

  async function submitOrderFunction(userData) {
    setIsSubmitting(true);
    const response = await fetch(
      "https://foodorderapp-58e96-default-rtdb.firebaseio.com/orderData.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
  }

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes["button"]} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const isSubmittingOrder = <p>Sending Order Please Wait...</p>;
  const didSubmitOrder = (
    <>
      <p>Order Successfully Recieved!!!</p>{" "}
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
      </div>
    </>
  );

  const cardModalConntent = (
    <>
      {cartItems}
      <div className={classes["total"]}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkOut && (
        <Checkout onConfirm={submitOrderFunction} onCancel={props.onClose} />
      )}
      {!checkOut && modalActions}
    </>
  );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cardModalConntent}
      {isSubmitting && isSubmittingOrder}
      {!isSubmitting && didSubmit && didSubmitOrder}
    </Modal>
  );
};

export default Cart;
