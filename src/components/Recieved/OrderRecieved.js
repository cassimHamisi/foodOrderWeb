import CartContext from "../../store/cart-context";
import { useContext } from "react";
import classes from "./OrderRecieved.module.css";
import Modal from "../UI/Modal";

const OrderRecieved = (props) => {
  const cartCtx = useContext(CartContext);

  const totalAmount = `Ksh.${cartCtx.totalAmount.toFixed(2)}`;

  return (
    <Modal onClose={props.onClose}>
      <h1>Order Recieved!!</h1>
      <div className={classes["total"]}>
        <span>Total:</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default OrderRecieved;
