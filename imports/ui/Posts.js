import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

export default class Posts extends React.Component {
    render() {
        return (
            <div>
                Welcome {Meteor.userId()}
            </div>
        )
    }
}