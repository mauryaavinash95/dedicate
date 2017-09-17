import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Link, browserHistory } from 'react-router';
import MdPrint from 'react-icons/lib/md/print';

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
                <div className="title-bar">
                    <div className="title-bar__content">
                        <div className="title-bar__title" onClick={() => { browserHistory.push("/") }}><h1 >Dedicate</h1></div>
                        <button title="Print" className="button button__logout" onClick={() => { window.print() }}><MdPrint /></button>
                    </div>
                </div>
                <br />
                <div className="page-content">
                    <div className="item">
                        {this.renderEntry()}
                    </div>
                </div>
            </div>
        )
    }
}