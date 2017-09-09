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

		renderGoogleLoginButton() {
			console.log('rendering google signin button', this)
			var that = this;
			gapi.signin2.render('my-sicj,vbfsgnin2', {
				'scope': 'https://www.googleapis.com/auth/plus.login',
				'width': 200,
				'height': 50,
				'longtitle': true,
				'theme': 'light',
				'onsuccess': function () {
					console.log("hello");
				},
				'onerror': function () {
					console.log("hello1")
				}
			});
		}

		componentDidMount() {
			//this.renderGoogleLoginButton();
			gapi.signin2.render('g-signin2', {
				'scope': 'https://www.googleapis.com/auth/plus.login',
				'width': 200,
				'height': 50,
				'longtitle': true,
				'theme': 'dark',
				'onsuccess': this.onSignIn
			});
			// window.addEventListener('google-loaded',this.renderGoogleLoginButton);
		}

		componentWillReceiveProps(nextProps) {
			//window.addEventListener('google-loaded',this.renderGoogleLoginButton);
		}
		render() {

			return (
				<div>
					<GoogleLogin
						clientId="126213461095-9vtaie5a77o70246l2qii6mt7cmcg0v1.apps.googleusercontent.com"
						buttonText="Login"
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




