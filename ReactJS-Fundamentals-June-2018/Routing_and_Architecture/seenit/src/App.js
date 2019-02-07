import React, { Component } from 'react';
import { Route, Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import history from './history';

//Load Css
import './style/comments.css'
import './style/header.css'
import './style/menu.css'
import './style/notifications.css'
import './style/post.css'
import './style/site.css'
import './style/submit.css'

//Load Components
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import GuessHome from './components/home/GuessHome';
import Catalog from './components/posts/Catalog';
import SubmitForm from './components/posts/SubmitForm';
import MyPosts from './components/posts/MyPosts';
import Edit from './components/posts/Edit';
import Details from './components/comments/Details';

import observer from './utils/observer';
import api from './utils/api';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			token: '',
			username: '',
			userId: ''
		}

		observer.addFunc('setUserData', this.setAuthData);
		observer.addFunc('removeUserData', this.removeAuthData);
	}

	setAuthData = (params) => {
		let { token, username, userId } = params;
		this.setState({ token, username, userId });
	}

	removeAuthData = () => {
		api.logout()
			.then(() => {
				localStorage.clear();
				this.setState({
					token: '',
					username: '',
					userId: ''
				});
			});
	}

	componentDidMount() {
		this.setState({
			token: localStorage.getItem('token'),
			username: localStorage.getItem('username')
		});
	}

	render() {
		return (
			<div id="container">
				<Header user={this.state} />
				<ToastContainer  autoClose={3000}/>
				<div className="content">
					{this.state.token ?
						<Router history={history}>
							<div>
								<Route path="/" exact component={Catalog} />
								<Route path="/catalog" component={Catalog} />
								<Route path="/article/create" component={SubmitForm} />
								<Route path="/article/my" component={MyPosts} />
								<Route path="/article/edit/:id" component={Edit} />
								<Route path="/comment/details/:id" component={Details} />
							</div>
						</Router>
						: <GuessHome />}
				</div>
				<Footer />
			</div>
		);
	}
}

export default App;
