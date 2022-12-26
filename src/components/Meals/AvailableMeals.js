import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import { useEffect, useState } from "react";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const dataFromDatabase = async () => {
      setIsLoading(true);
      const response = await fetch(
        "https://foodorderapp-58e96-default-rtdb.firebaseio.com/meals.json"
      );
      setHttpError(!response.ok);
      const responseData = await response.json();
      let arrayOfLoadedData = [];

      for (const key in responseData) {
        const responseName = responseData[key].name;
        const responseDescription = responseData[key].description;
        const responsePrice = responseData[key].price;
        arrayOfLoadedData.push({
          id: key,
          name: responseName,
          description: responseDescription,
          price: responsePrice,
        });
      }
      setMeals(arrayOfLoadedData);
      setIsLoading(false);
    };
    dataFromDatabase();
  }, []);

  if (isLoading && !httpError)
    return (
      <section className="mealIsLoading">
        <p>Loading...</p>
      </section>
    );

  if (httpError)
    return (
      <section className="requestFailed">
        <p>Request Failed!!!</p>
      </section>
    );

  const mealsList = meals.map((meal) => (
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {" "}
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
