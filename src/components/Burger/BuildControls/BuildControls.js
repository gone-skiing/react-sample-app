import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  {label: 'Salad', type: 'salad'},
  {label: 'Cheese', type: 'cheese'},
  {label: 'Bacon', type: 'bacon'},
  {label: 'Meat', type: 'meat'},
];

const buildControls = props => {
  const {isAuthenticated, ordered, price, purchaseable: canBePurchased} = props;

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{price.toFixed(2)}</strong>
      </p>
      {controls.map(c => (
        <BuildControl
          key={c.label}
          label={c.label}
          added={() => props.ingredientAdded(c.type)}
          removed={() => props.ingredientRemoved(c.type)}
          disabled={props.disabled[c.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!canBePurchased}
        onClick={ordered}
        type="submit"
      >
        {isAuthenticated ? 'ORDER NOW' : 'SIGN UP TO ORDER'}
      </button>
    </div>
  );
};

export default buildControls;
