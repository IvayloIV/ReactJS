import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';
import { recipeDetailsAction, editRecipeAction } from '../../actions/recipeActions';
import validator from '../../validator';

export class EditRecipe extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            meal: '',
            ingredients: '',
            prepMethod: '',
            description: '',
            category: '',
            foodImageURL: '',
            categoryImageURL: '',
            likesCounter: 0
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params['id'];
        this.props.loadRecipe(id).then(() => {
            const recipe = this.props.recipes[0];
            this.setState({
                id: recipe._id,
                meal: recipe.meal,
                ingredients: recipe.ingredients.join(','),
                prepMethod: recipe.prepMethod,
                description: recipe.description,
                category: recipe.category,
                foodImageURL: recipe.foodImageURL,
                categoryImageURL: recipe.categoryImageURL,
                likesCounter: recipe.likesCounter,
            });
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        let { id, meal, ingredients, prepMethod, description, category, foodImageURL, categoryImageURL, likesCounter } = this.state;
        
        ingredients = ingredients.split(',').map(a => a.trim());
        const valid = validator(meal, ingredients, prepMethod, description, category, foodImageURL);
        if (!valid) {
            return;
        }

        this.props.editRecipe(id, { meal, ingredients, prepMethod, description, category, foodImageURL, categoryImageURL, likesCounter })
            .then((json) => {
                if (!json.error) {
                    this.props.history.push(`/recipe/details/${id}`);
                }
            })
    }

    render() {
        return (
            <form className="text-center p-5 form-layout" id="edit-receipt-form" onSubmit={this.onSubmitHandler}>
                <p className="h4 mb-4">Edit Recipe</p>
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

                <button className="btn btn-danger w-25 m-auto my-4 btn-block" type="submit">Edit it</button>
        </form>
        )
    }
}

function mapState(state) {
    return {
        recipes: state.recipes
    };
}

function mapDispatch(dispatch) {
    return {
        loadRecipe: (recipeId) => dispatch(recipeDetailsAction(recipeId)),
        editRecipe: (recipeId, payload) => dispatch(editRecipeAction(recipeId, payload))
    };
}

export default withRouter(connect(mapState, mapDispatch)(EditRecipe));
