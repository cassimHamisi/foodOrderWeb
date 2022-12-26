import classes from "./Header.module.css";
import React from "react";
import mealsImage from "../../assets/noSoup.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <h1>Mega Bites</h1>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="Main-Food-Img" />
      </div>
    </>
  );
};

export default Header;
