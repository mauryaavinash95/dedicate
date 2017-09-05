import React from 'react';
import Meteor from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import AccountsUiWrapper from './AccountsUiWrapper';

export default class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: "",
        }
    }

    onSubmit(e) {
        e.preventDefault();
        // let email = this.refs.email.value;
        // let password = this.refs.password.value;
        // let confirmPassword = this.refs.confirmPassword.value;
        // console.log(email, password, confirmPassword)
        // if (password !== confirmPassword) {
        //     return this.setState({ error: "Password and Confirm Password do not match." });
        // }

        // Meteor.loginWithFacebook({ requestPermissions: ['public_profile', 'email'] }, function (err) {
        //     if (err) {
        //         console.log('Handle errors here: ', err);
        //     }
        // });

    }

    render() {
        return (
            <div>
                <h2>Join Dedicate!</h2>
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-md-offset-3">
                            <AccountsUiWrapper />
                        </div>
                    </div>
                </div>
                {/* <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="email" placeholder="Email" />
                    <input type="password" ref="password" placeholder="Password" />
                    <input type="password" ref="confirmPassword" placeholder="Confirm Password" />
                    <button type="submit">Submit</button>
                    <p>{this.state.error ? this.state.error : undefined}</p>
                </form> */}

            </div>
        );
    }
}