import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Input from '../common/Input';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.onChangeHandler = this.onChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.genre) {
            this.setState({ search: this.props.genre });
        }
    }

    onChangeHandler(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmitHandler(e) {
        e.preventDefault();
        this.props.history.push(`/movie/all?genre=${this.state.search}`);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <Input
                    name="search"
                    value={this.state.search}
                    onChange={this.onChangeHandler}
                    label="Search genre"
                />
                <input type="submit" value="Search" />
            </form>
        )
    }
}

export default withRouter(Search);
