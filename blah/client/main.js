import React from 'react';
//import nodemailer from 'nodemailer'
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import setimmediate from 'setimmediate';
import '../imports/mail.js';
import GoogleLogin from 'react-google-login';
//var nodemailer = require('nodemailer');
var tls = require('tls');

Meteor.startup(() => {

	class LoginButton extends React.Component {
		constructor(props) {
			super(props);
			this.state = ({
				sender: ''
			})
		}
		test() {
			console.log("hola")
		}
		onSignIn(googleUser) {
			console.log("**************signed in", this);

			var profile = googleUser.getBasicProfile();
			this.setState({ sender: profile.getEmail() });
			console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
			console.log('Name: ' + profile.getName());
			console.log('Image URL: ' + profile.getImageUrl());
			console.log('state', this.state); // This is null if the 'email' scope is no
		}



		clickme(event) {
			event.preventDefault();
			console.log("clicked")
			console.log("Email is: ", this.refs.email.value);
			console.log("Message is: ", this.refs.message.value);
			console.log("Sender is: ", this.state.sender);
			Meteor.call(
				'sendEmail',
				this.refs.email.value,
				this.state.sender,

				'From my system',
				this.refs.message.value,
			);

		}

				render() {
			var scope = ['https://mail.google.com/',
				'https://www.googleapis.com/auth/gmail.modify',
				'https://www.googleapis.com/auth/gmail.compose',
				'https://www.googleapis.com/auth/gmail.send']

			return (
				<div>
					<GoogleLogin
						clientId="126213461095-9vtaie5a77o70246l2qii6mt7cmcg0v1.apps.googleusercontent.com"
						buttonText="Login"
						scope={this.scope}
						onSuccess={this.onSignIn.bind(this)}
						onFailure={this.onSignIn.bind(this)}
					/>
					<form onSubmit={this.clickme.bind(this)}>
						<p>EMAIL : </p>
						<input type="text" ref="email" placeholder="Enter your email id" required="true" />
						<p> MESSAGE : </p>
						<input type="text" ref="message" placeholder="Enter the message" required="true" />
						<button type="submit"> click</button>
					</form>

				</div>
			);
		}

	};

	render(<LoginButton />, document.getElementById("app"));

})




