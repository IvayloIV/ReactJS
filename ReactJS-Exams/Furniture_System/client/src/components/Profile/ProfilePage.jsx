import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { myFurnitureAction, removeFurnitureAction } from '../../actions/furnitureAction';
import toastr from 'toastr';

import FurnitureList from '../HomePage/FurnitureList';
import Search from '../common/Search';

class ProfilePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchType: '',
            myFurnitureFinish: false
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toastr.warning('First you must login.');
            this.props.history.push('/login');
            return;
        }

        this.props.myFurniture().then(() => {
            this.setState({myFurnitureFinish: true});
        });
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        if (!this.state.myFurnitureFinish) {
            return null;
        }
        
        let furniture = this.props.furniture;
        if (this.state.searchType !== '') {
            furniture = furniture
                .filter(f => f.model.toLowerCase().indexOf(this.state.searchType.toLowerCase()) > -1);
        }


        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Profile Page</h1>
                        <p>Listing  your furniture.</p>
                        <Search onChangeHandler={this.onChangeHandler.bind(this)} value={this.state.value}/>
                    </div>
                </div>
                <FurnitureList furniture={furniture} deleteHandler={this.props.removeFurniture}/>
            </div>
        );
    }
}

function mapState(state) {
    return {
        furniture: state.furniture
    };
}

function mapDispatch(dispatch) {
    return {
        myFurniture: () => dispatch(myFurnitureAction()),
        removeFurniture: (id) => dispatch(removeFurnitureAction(id))
    };
}

export default withRouter(connect(mapState, mapDispatch)(ProfilePage));