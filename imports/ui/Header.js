import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Meteor } from 'meteor/meteor';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <button onClick={() => { Accounts.logout(); console.log("Logging out") }}>Logout</button>   
            </div>
        )
    }
}
