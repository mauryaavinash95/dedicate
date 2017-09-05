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
        console.log("On submit");
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        Meteor.loginWithPassword({ email }, password, (error) => {
            console.log('Login callback ', error);
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
            <div>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="email" placeholder="Email" />
                    <input type="password" ref="password" placeholder="Password" />
                    <button type="submit">Login</button>
                    <p>{this.state.error} </p>
                </form>
                <Link to="/signup">Join Dedicate</Link>
            </div>
        )
    }
}