import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { recipeDetailsAction, removeRecipeAction, likeRecipeAction } from '../../actions/recipeActions';

class RecipeDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            id: ''
        };

        this.removeRecipe = this.removeRecipe.bind(this);
        this.likeRecipe = this.likeRecipe.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params['id'];
        this.props.loadRecipe(id).then((json) => {
            this.setState({ loading: false, id });
        });
    }

    removeRecipe(recipeId) {
        this.props.removeRecipe(recipeId).then((json) => {
            if (!json.error) {
                this.props.history.push('/');
            }
        });
    }

    likeRecipe(recipeId, payload) {
        this.props.likeRecipe(recipeId, payload);
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        const recipe = this.props.recipes[0];
        const userId = sessionStorage.getItem('userId');
        const isOwner = recipe._acl.creator === userId;
        return (
            <div className="row form-layout p-5">
                <div className="col-md-12">
                    <div className="recepieInfo">
                        <div className="detailsFoodImage">
                            <img src={recipe.foodImageURL} />
                        </div>

                        <div className="infoPack">
                            <h3 className="my-3">{recipe.meal}</h3>
                            <p className="prep-method">{recipe.prepMethod}</p>
                            <p className="description">{recipe.description}</p>
                        </div>
                        <div className="actions">
                            {isOwner && <a className="btn btn-danger" href="javascript:void(0)" onClick={() => this.removeRecipe(recipe._id)}>Archive</a>}
                            {isOwner && <Link className="btn btn-info" to={`/recipe/edit/${recipe._id}`}>Edit</Link>}
                            {!isOwner && <a className="btn btn-success" href="javascript:void(0)" onClick={() => this.likeRecipe(recipe._id, recipe)}> {recipe.likesCounter} likes</a>}
                        </div>
                    </div>

                    <div className="detailsIngredients">
                        <h3 className="my-3 ingredient">Ingredients</h3>
                        <ul>
                            {recipe.ingredients.map((e, i) => <li key={i}>{e}</li>)}
                        </ul>
                    </div>
                </div>
            </div>
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
        removeRecipe: (recipeId) => dispatch(removeRecipeAction(recipeId)),
        likeRecipe: (recipeId, payload) => dispatch(likeRecipeAction(recipeId, payload))
    };
}

export default withRouter(connect(mapState, mapDispatch)(RecipeDetails));
