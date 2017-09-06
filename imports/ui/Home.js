import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import Header from './Header';
import Post from './Post';
import { Entries } from '../api/NewEntry';
import AddEntry from './AddEntry';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entries: [],
            error: ''
        }
    }

    componentWillMount() {
        this.trackerEntries = Tracker.autorun(() => {
            Meteor.subscribe("entries");
            let entries = Entries.find({}).fetch();
            this.setState({
                entries,
            })
        })
    }

    componentWillUnmount() {
        this.trackerEntries.stop();
    }


    showEntries() {
        let entries = this.state.entries;
        if (entries.length < 1) {
            return (<p>No previous entries found </p>);
        }
        else {
            return (entries.map((entry) => {
                return <Post key={entry._id} {...entry} />;
            })
            );
        }
    }

    render() {
        return (
            <div>
                <Header />
                Welcome {Meteor.userId()}
                <AddEntry />
                {this.showEntries()}
            </div>
        )
    }
}