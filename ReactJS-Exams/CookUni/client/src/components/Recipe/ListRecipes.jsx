import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getRecipesAction } from '../../actions/recipeActions';
import EmptyList from './EmptyList';
import RecipeCard from './RecipeCard';

class ListRecipes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        this.props.getRecipes().then(() => {
            this.setState({ loading: false });
        });
    }

    render() {
        if (this.state.loading) {
            return null;
        }

        if (this.props.recipes.length === 0) {
            return <EmptyList />
        }

        return (
            <div id="sharedRecipes">
                {this.props.recipes.map(r => (
                    <RecipeCard key={r._id} {...r}/>
                ))}
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
        getRecipes: () => dispatch(getRecipesAction())
    };
}

export default connect(mapState, mapDispatch)(ListRecipes);
