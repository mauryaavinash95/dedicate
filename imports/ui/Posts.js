import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Header from './Header';

export default class Posts extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        console.log("Entry recieved is : ", this.refs.newPost.value);
    }
    render() {
        return (
            <div>
                <Header />
                Welcome {Meteor.userId()}
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" ref="newPost" />
                    <button type="submit">Create New Entry</button>
                </form>
            </div>
        )
    }
}