import React from 'react';
import { browserHistory } from 'react-router';
import Clipboard from 'clipboard';
import Modal from 'react-modal';
import MdShare from "react-icons/lib/md/share";

export default class ShareEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: "",
            isOpen: false,
            justCopied: false,
            currentUser: null,
        }
    }

    copyLink() {
        this.refs.copy.innerHTML = "Copying.... Click here again if it takes more than 5 seconds.";
        this.clipboard = new Clipboard(this.refs.copy);
        this.clipboard.on('success', () => {
            this.setState({ justCopied: true });
            this.refs.copy = "Copied";
            setTimeout(() => {
                this.setState({ justCopied: false });
            }, 1000);
        }).on('error', () => {
            alert("Could not copy");
        })
    }

    componentWillMount() {
        Meteor.call("currentUser", (error, response) => {
            if (error) {
                this.setState({ error });
            }
            else {
                this.setState({ currentUser: response });
            }
        });
    }

    componentWillUnmount() {
        if (this.clipboard) {
            this.clipboard.destroy();
        }
    }

    onSubmit(e) {
        e.preventDefault();
        let entryId = this.props.entryId;
        this.setState({ error: "This app currently doesn't sharing via EMAIL, instead use COPY LINK BUTTON, currently opening in New Tab" });
        setTimeout(() => {
            window.open(location.origin + "/" + this.props.entryId, '_blank');
        }, 5000);
        setTimeout(() => {
            this.setState({ error: undefined });
        }, 10000)
        // console.log("Trying to share : ", entryId);
        // console.log("Calling sendEmail");
        // console.log("To: ", this.refs.receiver_email);
        // console.log("From: ", this.state.currentUser);
        // Meteor.call(
        //     'sendEmail',
        //     this.refs.receiver_email.value,
        //     this.state.currentUser,
        //     'Shared post from a friend ' + this.state.currentUser,
        //     location.origin + "/" + entryId,
        //     (error, response) => {
        //         if (error) {
        //             this.setState({ error });
        //         }
        //     }
        // );
    }

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
            <div className="button--post-options">
                <button title="Share Entry" className="button button--pill button--round" onClick={() => this.setState({ isOpen: true })}><MdShare /></button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Share Entry"
                    onAfterOpen={() => {
                        this.setState({ isOpen: true });
                        this.refs.copy.focus();
                    }}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal"
                >
                    <div className="addItem">
                        <button className="button button--full" ref="copy" onClick={this.copyLink.bind(this)} data-clipboard-text={location.origin + "/" + this.props.entryId}>
                            {this.state.justCopied ? 'Copied' : 'Copy Link to Share'}
                        </button>
                        <br />
                        <br />
                        <div style={{ borderBottom: "1px solid black" }}>
                            <span>
                                OR
                            </span>
                        </div>
                        <br />
                        <form onSubmit={this.onSubmit.bind(this)} >
                            <input className="shareEntry" type="email" ref="receiver_email" placeholder="Share with (Email)" required />
                            <button className="button button--full" type="submit"> Share Now </button>
                            <span>{this.state.error}</span>
                        </form>
                    </div>
                </Modal>
            </div >
        );
    }
}