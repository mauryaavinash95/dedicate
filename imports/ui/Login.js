import React from 'react';
import { Link, browserHistory } from 'react-router';


export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: ""
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        Meteor.loginWithPassword({ email }, password, (error) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                this.setState({ error: '' });
            }
        })
    }

    render() {
        return (
            <div className="boxed-view">
                <div className="boxed-view__login-box">
                    <h1> Dedicate </h1>
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input type="text" ref="email" placeholder="Email" />
                        <input type="password" ref="password" placeholder="Password" />
                        <button type="submit" className="button">Login</button>
                        <p>{this.state.error} </p>
                    </form>
                    <Link to="/signup">Join Dedicate</Link>
                </div>
            </div>
        )
    }
}