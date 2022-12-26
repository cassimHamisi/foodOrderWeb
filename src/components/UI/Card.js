// wrapper component which provide html and css from any content needed

import classes from "./Card.module.css";

const Card = (props) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
