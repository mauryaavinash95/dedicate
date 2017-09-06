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
        console.log("Entry recieved is : ", this.refs.newEntry.value);
        Meteor.call('addNewEntry', newEntry, (error, response) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                console.log("Inserted successfully");
            }
            this.setState({ entry: '' });
        })
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
            </form>
        )
    }
}