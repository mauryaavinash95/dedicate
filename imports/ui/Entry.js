import React from 'react';
import EditEntry from './EditEntry';
import $ from 'jquery';
import moment from 'moment'
import MdDelete from 'react-icons/lib/md/delete';

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
        if (confirm("Sure to delete this entry? ") === true) {
            console.log("Going to delete entry", entryId);
            Meteor.call("deleteEntry", entryId, (error) => {
                if (error) {
                    console.log("Error: ", error);
                }
            })
        }
        else {
            console.log("Delete not confirmed");
        }
    }

    render() {
        return (
            <div className="item">
                <HtmlEntry entry={this.state.entry} />
                <div className="item__options">
                    <div className="item__status-message">(Last Edited {moment(this.state.entry.date).fromNow()})</div>
                    <div>
                        <button title="Delete Entry" className="button  button--pill button--post-options button--round" onClick={this.deleteEntry.bind(this, this.state.entry._id)}> <MdDelete /> </button>
                        <EditEntry key={this.state.entry._id} {...this.state.entry} />
                        <ShareEntry entryId={this.state.entry._id} {...this.state.entry} />
                    </div>
                </div>
            </div>
        )
    }
}