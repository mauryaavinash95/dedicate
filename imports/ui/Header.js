import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: ''
        };
    }

    componentWillMount() {
        Meteor.call("currentUser", (error, response) => {
            if (error) {
                this.setState({
                    error: error,
                })
            }
            else {
                this.setState({
                    userEmail: response
                })
            }
        })
    }

    render() {
        return (
            <div className="title-bar">
                <div className="title-bar__content">
                    <div>Welcome, {this.state.userEmail}</div>
                    <button onClick={() => { Accounts.logout(); }}>Logout</button>
                </div>
            </div>
        )
    }
}
