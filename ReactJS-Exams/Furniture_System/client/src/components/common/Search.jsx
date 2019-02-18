import React, { Component } from 'react'

export class Search extends Component {
    render() {
        return (
            <div>
                <input 
                    className="form-control mr-sm-2" 
                    placeholder="Search" 
                    type="text"
                    onChange={this.props.onChangeHandler}
                    value={this.props.value}
                    name="searchType"
                />
            </div>
        )
    }
}

export default Search
