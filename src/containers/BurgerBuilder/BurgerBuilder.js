import React, {Component} from 'react';
import {connect} from "react-redux";

import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';

import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

import axios from '../../axios-orders';

import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends Component{
    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get("https://react-my-burger-25854.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                this.setState({error: true, loading: false, purchasing: false})
            });
    }

    isPurchaseable(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => sum + el, 0);

        return sum > 0;
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        this.isPurchaseable(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }

        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        this.isPurchaseable(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    };

    render () {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary =  null;
        let burger = this.state.error ? <p>Ingredients can't be loaded.</p> : <Spinner/>;

        if (this.props.ings) {
            orderSummary =  <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;

            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>

                    <BuildControls
                        price={this.props.price}
                        purchaseable={this.isPurchaseable(this.props.ings)}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>;
        }

        return (
            <Aux>

                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>

                    {orderSummary}

                </Modal>

                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));