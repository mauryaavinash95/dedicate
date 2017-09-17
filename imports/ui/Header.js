import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import MdExit from "react-icons/lib/md/exit-to-app";

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
                    <div className="title-bar__title" ><h2 onClick={() => { browserHistory.push("/home") }}>Welcome, {this.state.userEmail}</h2></div>
                    <button title="Logout" className="button button__logout" onClick={() => { Accounts.logout(); }}><MdExit /></button>
                </div>
            </div>
        )
    }
}
