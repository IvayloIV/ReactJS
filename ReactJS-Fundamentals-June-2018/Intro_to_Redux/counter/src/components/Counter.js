import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../store/actionCreators';
import WithOnClick from './WithOnClick';

class CounterBase extends React.Component {
    render() {
        return (
            <div>
                <h3>{this.props.value}</h3>
                <button name="increase" onClick={this.props.onClicked}>+</button>
                <button name="decrease" onClick={this.props.onClicked}>-</button>
                <button name="clear" onClick={this.props.onClicked}>clear</button>
            </div>
        );
    }
}

const Counter = WithOnClick(CounterBase);

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

export default connect(mapStateToProps, mapDispatchToProps)(Counter);