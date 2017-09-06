import React from 'react';

export default class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props.newEntry,
            error: ''
        }
        console.log("EditEntry : ", this.props);
    }

    onSubmit(e) {
        e.preventDefault();
        let newEntry = this.refs.newEntry.value;
        Meteor.call('editEntry', this.props._id, newEntry, (error, response) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                console.log("Update successfully");
                this.setState({ entry: newEntry });
            }
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
                <button type="submit">Edit Entry</button>
            </form>
        )
    }
}