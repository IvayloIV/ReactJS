import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.css';
import * as actions from './store/actionCreators';
import StoryFrom from './components/StoryForm';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ''
		};
	}

	onChanged = (event) => {
		this.setState({ text: event.target.value });
	}

	addNewInput = (event) => {
		this.props.actions[event.target.name](this.state.text);
		this.setState({ text: '' });
	}

	removeInput = (event) => {
		this.props.actions['removeInput']();
	}

	render() {
		return (
			<div className="App">
				<input value={this.state.text} onChange={this.onChanged} />
				<button name="addInput" onClick={this.addNewInput}>Add input</button>
				{this.props.story.map(a => {
					return <StoryFrom index={a.index} text={a.text} editMode={a.editMode} key={a.index} />
				})}
				<div><button onClick={this.removeInput}>Delete last</button></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		story: state
	}
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(actions, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
