import React from 'react';
import { Meteor } from 'meteor/meteor';

import HtmlEntry from './HtmlEntry';

export default class ShowEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: '',
        }
    }

    componentWillMount() {
        Meteor.call('showEntry', this.props.params.entryId, (error, response) => {
            if (error) {
                console.log("Cannot retrive this entry");
            }
            else {
                console.log(response);
                this.setState({ entry: response });
            }
        });
    }

    renderEntry() {
        if (this.state.entry) {
            return (
                <div>
                    <HtmlEntry entry={this.state.entry} />
                </div>)
        }
        else {
            return <p>Couldn't load this entry</p>
        }
    }

    render() {
        return (
            <div>
                {this.renderEntry()}
            </div>
        )
    }
}