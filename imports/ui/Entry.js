import React from 'react';
import EditEntry from './EditEntry';
import $ from 'jquery';

import HtmlEntry from './HtmlEntry';
import ShareEntry from './ShareEntry';

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props,
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            entry: nextProps
        })
    }

    deleteEntry(entryId) {
        console.log("Going to delete entry", entryId);
        Meteor.call("deleteEntry", entryId, (error) => {
            if (error) {
                console.log("Error: ", error);
            }
        })
    }

    render() {
        return (
            <div>
                <HtmlEntry entry={this.state.entry} />
                <button onClick={this.deleteEntry.bind(this, this.state.entry._id)}>Delete</button>
                <EditEntry key={this.state.entry._id} {...this.state.entry} />
                <ShareEntry entryId={this.state.entry._id} {...this.state.entry} />
            </div>
        )
    }
}