import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createRecipeAction } from '../../actions/recipeActions';
import Input from '../common/Input';
import validator from '../../validator';

class CreateRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meal: '',
            ingredients: '',
            prepMethod: '',
            description: '',
            category: '',
            foodImageURL: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let { meal, ingredients, prepMethod, description, category, foodImageURL } = this.state;

        ingredients = ingredients.split(',').map(a => a.trim());
        const valid = validator(meal, ingredients, prepMethod, description, category, foodImageURL);
        if (!valid) {
            return;
        }

        this.props.createRecipe({ meal, ingredients, prepMethod, description, category, foodImageURL })
            .then(() => {
                this.props.history.push('/');
            })
    }

    render() {
        return (
            <form className="text-center p-5 form-layout" id="share-receipt-form" onSubmit={this.onSubmitHandler}>
                <p className="h4 mb-4">Share Recipe</p>
                <Input
                    name="meal"
                    value={this.state.meal}
                    onChange={this.onChangeHandler}
                    label="Meal"
                />
                <Input
                    name="ingredients"
                    value={this.state.ingredients}
                    onChange={this.onChangeHandler}
                    label="Ingredients"
                />
                <Input
                    name="prepMethod"
                    value={this.state.prepMethod}
                    onChange={this.onChangeHandler}
                    label="Method of preparation"
                />

                <textarea type="text" onChange={this.onChangeHandler} id="defaultRecepieShareDescription" name="description" className="form-control mb-4"
                    placeholder="Description" value={this.state.description} />

                <Input
                    name="foodImageURL"
                    value={this.state.foodImageURL}
                    onChange={this.onChangeHandler}
                    label="Food Image URL..."
                />

                <select name="category" onChange={this.onChangeHandler} value={this.state.category}>
                    <option>Select category...</option>
                    <option>Vegetables and legumes/beans</option>
                    <option>Fruits</option>
                    <option>Grain Food</option>
                    <option>Milk, cheese, eggs and alternatives</option>
                    <option>Lean meats and poultry, fish and alternatives</option>
                </select>

                <button className="btn btn-danger w-25 m-auto my-4 btn-block" type="submit">Share it</button>
        </form>
        )
    }
}

function mapDispatch(dispatch) {
    return {
        createRecipe: (payload) => dispatch(createRecipeAction(payload))
    };
}

export default withRouter(connect(null, mapDispatch)(CreateRecipe));
