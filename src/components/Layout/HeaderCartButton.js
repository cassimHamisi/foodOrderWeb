// import React from "react";
import classes from "./HeaderCartButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

import CartIcon from "../Cart/CartIcon";

const HeaderCartButton = (props) => {
  const [btnIsHighligted, setBtnIsHighLighted] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  const numOfCartItems = items.reduce((currItem, item) => {
    return currItem + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${btnIsHighligted ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighLighted(true);
    const timmer = setTimeout(() => {
      setBtnIsHighLighted(false);
    }, 300);
    return () => {
      clearTimeout(timmer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
