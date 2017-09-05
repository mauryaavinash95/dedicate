import React from 'react';
import { Link, browserHistory } from 'react-router';


export default class Login extends React.Component {

    onSubmit(e) {
        e.preventDefault();
        let email = this.refs.email.value;
        let password = this.refs.password.value;

        // if user is valid
        browserHistory.push("/posts");
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="email" placeholder="Email" />
                    <input type="password" ref="password" placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
                <Link to="/signup">Join Dedicate</Link>

            </div>
        )
    }
}