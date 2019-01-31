import React from 'react';
import './App/style/app.css';
import Contacts from './App/contacts';
import ReactDOM from './index';

function showDetails(data) {
	ReactDOM.render(App(data), document.getElementById('root'));
}

const details = (data) => {
	if (!data) {
		return;
	}

	return (
		<div className="content">
			<div className="info">
				<div className="col">
					<span className="avatar">&#9787;</span>
				</div>
				<div className="col">
					<span className="name">{data.firstName}</span>
					<span className="name">{data.lastName}</span>
				</div>
			</div>
			<div className="info">
				<span className="info-line">&phone; {data.phone}</span>
				<span className="info-line">&#9993; {data.email}</span>
			</div>
		</div>
	);
}

const makeContact = (data) => {
	return (
		<div className="contact" key={data.id} onClick={showDetails.bind(null, data)}>
			<span className="avatar small">&#9787;</span>
			<span className="title">{data.firstName} {data.lastName}</span>
		</div>
	);
};

function getUsersInfo(contacts) {
	let users = [];
	for (let i = 0; i < contacts.length; i++) {
		contacts[i]['id'] = i;
		users.push(makeContact(contacts[i]));
	}

	return users;
}

const App = (data) => {
	return (
	<div className="container">
		<header>&#9993; Contact Book</header>
		<div id="book">
			<div id="list">
				<h1>Contacts</h1>
				<div className="content">
					{getUsersInfo(Contacts)}
				</div>
			</div>
			<div id="details">
				<h1>Details</h1>
				{details(data)}
			</div>
		</div>
		<footer>Contact Book SPA &copy; 2017</footer>
	</div>
)};

export default App;