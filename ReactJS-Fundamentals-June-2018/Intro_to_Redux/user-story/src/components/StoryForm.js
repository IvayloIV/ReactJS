import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actionCreators';

class StoryFrom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentText: this.props.text
        };
    }

    editInput = (event) => {
        this.props.actions['edit'](this.props.index);
    }

    cancelEdit = (event) => {
        this.props.actions['cancel'](this.props.index);
        this.setState({currentText: this.props.text});
    }

    successEdit = (event) => {
        this.props.actions['success'](this.props.index, this.state.currentText);
    }

    onChanged = (event) => {
        this.setState({currentText: event.target.value});
    }

    render() {
        return (
            <div>
                <input value={this.state.currentText} onChange={this.onChanged} disabled={!this.props.editMode}/>
                {!this.props.editMode ? 
                    <button onClick={this.editInput}>Edit input</button> :
                    <span> 
                    <button onClick={this.successEdit}>Success</button>
                    <button onClick={this.cancelEdit}>Cancel</button>
                    </span>}
            </div>
        );
    };
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

export default connect(mapStateToProps, mapDispatchToProps)(StoryFrom);