import React from 'react';

import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

import classes from './Burger.module.css';

const burger = props => {
  const { ingredients } = props;
  let key = 0;

  let transformed = Object.keys(ingredients)
    .map(igKey => {
      return [...Array(props.ingredients[igKey])].map(() => {
        key += 1;
        return <BurgerIngredient key={key} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformed.length === 0) {
    transformed = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformed}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
