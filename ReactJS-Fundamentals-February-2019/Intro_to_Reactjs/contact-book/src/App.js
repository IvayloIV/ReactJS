import React from 'react';
import contacts from './contacts.json';
import render from './index';
let currentContact;

function details(contact) {
	return (
		<div className="content">
			<div className="info">
				<div className="col">
					<span className="avatar">&#9787;</span>
				</div>
				<div className="col">
					<span className="name">{contact.firstName}</span>
					<span className="name">{contact.lastName}</span>
				</div>
			</div>
			<div className="info">
				<span className="info-line">&phone; {contact.phone}</span>
				<span className="info-line">&#9993; {contact.email}</span>
			</div>
		</div>
	)
}

function updateContact(contact) {
	currentContact = contact;
	render();
}

function makeContact(contact, index) {
	return (
		<div className="contact" key={index} onClick={() => updateContact(contact, index)}>
			<span className="avatar small">&#9787;</span>
			<span className="title">{contact.firstName} {contact.lastName}</span>
		</div>
	)
}

const totalContacts = contacts.map(makeContact); 

const App = () => {
	return (
		<div className="container">
			<header>&#9993; Contact Book</header>
			<div id="book">
				<div id="list">
					<h1>Contacts</h1>
					<div className="content">
						{totalContacts}
					</div>
				</div>
				<div id="details">
					<h1>Details</h1>
					{!currentContact ? 'Click user profile for details.' : details(currentContact)}
				</div>
			</div>
			<footer>Contact Book SPA &copy; 2017</footer>
		</div>
	)
}

export default App;
