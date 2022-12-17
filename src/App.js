import React, { useState } from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import OrderRecieved from "./components/Recieved/OrderRecieved";
import CartContextProvider from "./store/CartContextProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [orderRecieved, setOrderRecieved] = useState(false);

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideOrderRecieved = () => {
    setOrderRecieved(false);
  };

  const showOrderRecieved = () => {
    setCartIsShown(false);
    setOrderRecieved(true);
  };

  return (
    <CartContextProvider>
      {cartIsShown && (
        <Cart onClose={hideCartHandler} onClickOrder={showOrderRecieved} />
      )}
      {orderRecieved && <OrderRecieved onClose={hideOrderRecieved} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
