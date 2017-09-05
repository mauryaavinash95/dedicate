import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Header from './Header';

export default class Posts extends React.Component {
    render() {
        return (
            <div>
                <Header />
                Welcome {Meteor.userId()}
            </div>
        )
    }
}