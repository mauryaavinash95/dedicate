import React from 'react';

export default class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: '',
            error: ''
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let newEntry = this.refs.newEntry.value;
        if (newEntry.length < 1) {
            return this.setState({ error: "Please enter text" });
        }
        this.setState({ error: '' });
        Meteor.call('addNewEntry', newEntry, (error) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                console.log("Inserted successfully");
                Meteor.call(
                    'sendEmail',
                    'Avinash <devavinashmaurya@gmail.com>',
                    'Avinash <devavinashmaurya@gmail.com>',
                    'Hello from Meteor!',
                    'This is a test of Email.send.'
                );
                this.setState({ entry: '' });
            }
        });

    }

    onChange(e) {
        this.setState({
            entry: e.target.value,
        })
    }


    render() {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <input type="text" ref="newEntry" value={this.state.entry} onChange={this.onChange.bind(this)} placeholder="Write you entry here" />
                <button type="submit">Create New Entry</button>
                <p>{this.state.error}</p>
            </form>
        )
    }
}