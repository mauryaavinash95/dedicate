import React from 'react';
import Modal from 'react-modal';

export default class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props.newEntry,
            error: '',
            isOpen: false,
        }
    }

    componentDidMount() {
        // this.textareaEditor = textboxio.replace('#edit_' + this.props._id, { autosubmit: false });
    }

    onSubmit(e) {
        e.preventDefault();
        let newEntry = this.textareaEditor.content.get();
        Meteor.call('editEntry', this.props._id, newEntry, (error, response) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                console.log("Update successfully");
                this.textareaEditor.content.set(newEntry);
                this.setState({ entry: newEntry });
            }
        })
    }

    onChange(e) {
        this.setState({
            entry: e.target.value,
        })
    }

    handleModalClose() {
        this.setState({ isOpen: false, error: '' });
    }

    render() {
        var id = "edit_" + this.props._id;
        return (
            <div>
                <button className="button" onClick={() => this.setState({ isOpen: true })}>Edit Entry</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Edit Entry"
                    onAfterOpen={() => { this.textareaEditor = textboxio.replace('#edit_' + this.props._id, { autosubmit: false }); this.refs.edit_entry.focus() }}
                    onRequestClose={this.handleModalClose.bind(this)}
                    style={{ overlay: { zIndex: 150 } }} // This is required to over-ride upon the AddEntry textbox.
                >
                    <form onSubmit={this.onSubmit.bind(this)}>
                        <textarea ref="edit_entry" id={"edit_" + this.props._id} value={this.state.entry} onChange={this.onChange.bind(this)} placeholder="Write you entry here" />
                        <button type="submit">Edit Entry</button>
                    </form>
                </Modal>

            </div>
        )
    }
}