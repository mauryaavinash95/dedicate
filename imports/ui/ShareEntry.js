import React from 'react';
import { browserHistory } from 'react-router';

export default class ShareEntry extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
    }

    shareEntry() {
        let entryId = this.props.entryId;
        console.log("Trying to share : ", entryId);
        console.log()
        Meteor.call(
            'sendEmail',
            'Deviyani <deviyanigaur@gmail.com>',
            'Avinash Maurya <mauryaavinash95@gmail.com>',
            'Shared post from a friend',
            location.origin + "/" + entryId
        );
    }

    render() {
        return (
            <div>
                <button onClick={this.shareEntry.bind(this)}>Share</button>
            </div>
        );
    }
}