import React from 'react';
//import nodemailer from 'nodemailer'
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import setimmediate from 'setimmediate';
import '../imports/mail.js';
//var nodemailer = require('nodemailer');
var tls = require('tls');

Meteor.startup(() => {
	class Blah extends React.Component {
		constructor(props) {
			super(props)
			this.state = {
				showForm: false,
			}
		}
		ask() {
			if (this.state.showForm) {
				return (
					<form>
						<p>Enter gmail id</p>
						<input type="text" ref="email" placeholder="Enter your email id" required="true" />
						<p> password</p>
						<input type="password" ref="password" placeholder="Enter the password" required="true" />
					</form>
				);
			}
		}

		askChange() {
			this.setState({
				showForm: !this.state.showForm
			})
		}
		onSignIn(googleUser) {
			var profile = googleUser.getBasicProfile();
			console.log('ID: ' + profile.getId());
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('Email: ' + profile.getEmail());
		}

		clickme(event) {
			event.preventDefault();
			console.log("clicked")
			event.preventDefault()
			console.log("Email is: ", this.refs.email.value);
			console.log("Message is: ", this.refs.message.value);
			Meteor.call(
				'sendEmail',
				this.refs.email.value,
				"deviyanigaur@gmail.com",
				'From my system',
				this.refs.message.value,
			);
		}
		render() {
			return (
				<div>
					<form onSubmit={this.clickme.bind(this)}>
						<p>EMAIL</p>
						<input type="text" ref="email" placeholder="Enter your email id" required="true" />
						<p> MESSAGE</p>
						<input type="text" ref="message" placeholder="Enter the message" required="true" />
						<button type="submit"> click</button>
					</form>

					
				</div>
			);

		}
	}

	render(<Blah />, document.getElementById("app"));
	
})




