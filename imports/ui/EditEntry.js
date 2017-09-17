import React from 'react';
import Modal from 'react-modal';
import MdEdit from "react-icons/lib/md/edit";

export default class EditEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props,
            error: '',
            isOpen: false,
        }
    }

    componentDidMount() {
        // this.textareaEditor = textboxio.replace('#edit_' + this.props._id, { autosubmit: false });
    }

    onSubmit(e) {
        e.preventDefault();
        let newEntry = {
            heading: this.textareaEditorHeading.content.get(),
            body: this.textareaEditor.content.get(),
        }
        Meteor.call('editEntry', this.props._id, newEntry, (error, response) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                console.log("Update successfully");
                this.setState({ entry: newEntry });
                this.handleModalClose();
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
            <div className="button--post-options">
                <button title="Edit Entry" className="button button--pill button--round" onClick={() => this.setState({ isOpen: true })}><MdEdit /></button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Edit Entry"
                    onAfterOpen={() => {
                        this.textareaEditorHeading = textboxio.replace('#edit_heading_' + this.props._id, { autosubmit: false });
                        this.textareaEditor = textboxio.replace('#edit_body_' + this.props._id, { autosubmit: false });
                        this.refs.edit_entry_heading.focus()
                    }}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <h3>Heading:</h3>
                        <textarea className="addItem__heading" ref="edit_entry_heading" id={"edit_heading_" + this.props._id} value={this.state.entry.heading} onChange={this.onChange.bind(this)} />
                        <br />
                        <h3>Body:</h3>
                        <textarea className="addItem__body" ref="edit_entry_body" id={"edit_body_" + this.props._id} value={this.state.entry.body} onChange={this.onChange.bind(this)} />
                        <button className="button button--full" type="submit">Edit Entry</button>
                    </form>
                </Modal>

            </div>
        )
    }
}