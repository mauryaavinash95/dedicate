import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router';
// import AccountsUiWrapper from './AccountsUiWrapper';

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        let confirmPassword = this.refs.confirmPassword.value;
        console.log(email, password, confirmPassword)
        if (password !== confirmPassword) {
            return this.setState({ error: "Password and Confirm Password do not match." });
        }
        else {
            Accounts.createUser({ email, password }, (error) => {
                console.log(error);
                if (error) {
                    this.setState({
                        error: error.reason,
                    });
                }
                else {
                    this.setState({
                        error: ''
                    });
                }
            });
        }
    }

    onLoginWithFacebook() {
        console.log("In LoginwithFB");
        Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, function (err) {
            if (err) {
                console.log('Handle errors here: ', err);
            }
            else {
                console.log("Login successful");
            }
        });
    }

    onLoginWithGoogle() {
        Meteor.loginWithGoogle({
            requestPermissions: ['email', 'profile']
        }, function (err) {
            if (err) {
                alert('error : ' + err);
                throw new Meteor.Error(Accounts.LoginCancelledError.numericError, 'Error');
            } else {
                console.log("Login successful");
            }
        });
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__login-box">
                    <h1>Join Dedicate!</h1>
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="text" ref="email" placeholder="Email" />
                        <input type="password" ref="password" placeholder="Password" />
                        <input type="password" ref="confirmPassword" placeholder="Confirm Password" />
                        <button className="button" type="submit">Submit</button>
                        <p>{this.state.error ? this.state.error : undefined}</p>
                    </form>
                    <Link to="/">Have an account?</Link>

                    {/* <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <AccountsUiWrapper />
                        </div>
                    </div>
                </div> 
                <button onClick={() => { this.onLoginWithFacebook() }}>Login with Facebook </button>
                <button onClick={() => { this.onLoginWithGoogle() }}>Login with Google </button>
                */}
                </div>
            </div>
        );
    }
}