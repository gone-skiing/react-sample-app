import React, {Component} from 'react';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    // This could be a functional component, used real component for debugging.

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients).map(key => {
            return (
                <li key={key}>
                    <span style={{transform: 'capitalize'}}>{key}</span>: {this.props.ingredients[key]}
                </li>
            );
        });

        return (
            <Aux>
                <h3>Your order</h3>
                <p>A delicious burger with the following ingredients:</p>
                <ul>
                    {ingredientSummary}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout?</p>
                <Button buttonType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button buttonType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
            </Aux>
        );
    };
};

export default OrderSummary;