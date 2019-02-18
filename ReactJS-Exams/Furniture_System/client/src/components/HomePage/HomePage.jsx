import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { furnitureByPageAction } from '../../actions/furnitureAction';

import FurnitureList from './FurnitureList';
import Pagination from '../common/Pagination';
import Search from '../common/Search';
const furniturePerPage = 2;

class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            searchType: ''
        };
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    componentDidMount() {
        if (this.props.match.params.page) {
            this.setState({ page: Number(this.props.match.params.page) });
        }

        this.props.furnitureByPage(this.state.page);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.page && Number(nextProps.match.params.page) !== this.state.page) {
            const newPage = Number(nextProps.match.params.page);
            this.setState({ page: newPage });
            this.props.furnitureByPage(newPage);
        }
    }

    render() {
        let furniture = this.props.furniture;
        if (this.state.searchType !== '') {
            furniture = furniture
                .filter(f => f.model.toLowerCase().indexOf(this.state.searchType.toLowerCase()) > -1);
        }

        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Welcome to Furniture System</h1>
                        <p>Select furniture from the catalog to view details.</p>
                        <Search onChangeHandler={this.onChangeHandler.bind(this)} value={this.state.value}/>
                    </div>
                </div>
                <FurnitureList furniture={furniture} />
                <Pagination 
                    total={this.props.stats.furniture}
                    lengthPerPage={furniturePerPage}
                    current={this.state.page}
                />
            </div>
        );
    }
}

function mapState(state) {
    return {
        furniture: state.furniture,
        stats: state.stats,
    };
}

function mapDispatch(dispatch) {
    return {
        furnitureByPage: (page) => dispatch(furnitureByPageAction(page))
    };
}

export default withRouter(connect(mapState, mapDispatch)(HomePage));