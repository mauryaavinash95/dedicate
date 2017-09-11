import React from 'react';

export default class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: '',
            error: ''
        }
    }

    componentDidMount() {
        this.textareaEditor = textboxio.replace('#newEntry', { autosubmit: false, css: { documentStyles: ' z-index:-1' } });
    }

    onSubmit(e) {
        e.preventDefault();
        let newEntry = this.textareaEditor.content.get();
        // console.log("NewEntry Recieved: ", newEntry);
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
                this.textareaEditor.content.set('');
                this.setState({ entry: '' });
            }
        });
        return false;
    }

    onChange(e) {
        this.setState({
            entry: e.target.value,
        })
    }


    render() {
        return (
            <div>
                <textarea id="newEntry" value={this.state.entry} style={{ overlay: { zIndex: 1 } }} onChange={this.onChange.bind(this)} placeholder="Write you entry here" />
                <button onClick={this.onSubmit.bind(this)} type="submit">Create New Entry</button>
                <p>{this.state.error}</p>
            </div>
        )
    }
}