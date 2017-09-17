import React from 'react';
import Modal from 'react-modal';

export default class AddEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: undefined,
            isOpen: false,
        }
    }

    componentDidMount() {
        // this.textareaEditor = textboxio.replace('#newEntry', { autosubmit: false });
        // this.textareaEditorHeader = textboxio.replace('#newHeader', { autosubmit: false });
    }

    initiateTextAreaEditor() {
        this.textareaEditorHeader = textboxio.replace('#newHeader', { autosubmit: false });
        this.textareaEditor = textboxio.replace('#newEntry', { autosubmit: false });
        this.textareaEditorHeader.content.set("<h2>New Entry Heading</h2>");
        this.textareaEditor.content.set("<p>New Entry body... </p>");
    }

    onSubmit(e) {
        e.preventDefault();
        let newEntry = {
            heading: this.textareaEditorHeader.content.get(),
            body: this.textareaEditor.content.get()
        };
        let plainTextHeading = newEntry.heading.replace(/<[^>]*>/g, '');
        let plainTextBody = newEntry.body.replace(/<[^>]*>/g, '');
        if (plainTextHeading.length < 1 || plainTextBody.length < 1) {
            return this.setState({ error: "Please Enter text to Add" });
        }
        this.setState({ error: undefined });
        Meteor.call('addNewEntry', newEntry, (error) => {
            if (error) {
                this.setState({ error: error.reason });
            }
            else {
                console.log("Inserted successfully");
                this.handleModalClose();
            }
        });
        return false;
    }

    // onChange(e) {
    //     this.setState({
    //         entry: e.target.value,
    //     })
    // }

    handleModalClose() {
        this.setState({ isOpen: false, error: '' });
    }

    onChange(e) {
        this.setState({
            entry: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <button className="button button--full" onClick={() => this.setState({ isOpen: true })}> + Add New Entry</button>
                <br />
                <br />
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add Entry"
                    onAfterOpen={() => {
                        this.initiateTextAreaEditor();
                    }}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <div className="addItem">
                        <div>
                            <h3>Heading:</h3>
                            <textarea id="newHeader" className="addItem__heading" />
                            <br />
                            {/* <textarea id="newEntry" className="addItem__body" value={this.state.entry} onChange={this.onChange.bind(this)} placeholder=" Write you entry here" /> */}
                            <h3>Body:</h3>
                            <textarea id="newEntry" className="addItem__body" />
                            {/* <div id="newEntry" className="addItem__body"></div> */}
                        </div>
                        <button className="button button--full" onClick={this.onSubmit.bind(this)} type="submit"> Save New Entry </button>
                        <span>{this.state.error}</span>
                    </div>
                </Modal>
            </div>
        )
    }
}