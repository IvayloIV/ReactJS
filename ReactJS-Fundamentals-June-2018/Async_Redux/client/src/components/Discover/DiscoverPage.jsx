import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { toast } from 'react-toastify';
import { discoverAction } from '../../actions/userActions';
import UserBox from './UserBox';

class DiscoverPage extends Component {
    componentDidMount() {
        if (!localStorage.getItem('authToken')) {
            toast.error('First you must login.');
            this.props.history.push('/');
            return;
        }

        this.props.discoverUser();
    }

    render() {
        return (
            <section id="viewDiscover">
                <div className="content">
                    <div className="chirps">
                        <h2 className="titlebar">Discover</h2>
                        <div id="userlist">
                            {this.props.users.map(u => 
                                <UserBox
                                    key={u._id}
                                    username={u.username}
                                    followers={u.followers}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

function mapState(state) {
    return {
        users: state.users
    };
}

function mapDispatch(dispatch) {
    return {
        discoverUser: () => dispatch(discoverAction())
    };
}

export default withRouter(connect(mapState, mapDispatch)(DiscoverPage));