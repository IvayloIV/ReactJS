import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import * as actions from './store/actionCreators';
import Counter from './components/Counter';
import WithOnClick from './components/WithOnClick';

class AppBase extends Component {
	render() {
		return (
			<div className="App">
				<div>{this.props.counter.map((a, i) => {
					return <Counter key={i} id={i} value={a.value}/>
				})}</div>
				<br/>
				<button name="add" onClick={this.props.onClicked}>Add</button>
				<button name="remove" onClick={this.props.onClicked}>Remove</button>
			</div>
		);
	}
}

const App = WithOnClick(AppBase);

function mapStateToProps(state) {
    return {
        counter: state
    }
}

function mapDispatchToProps(dispatch) {
    return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
