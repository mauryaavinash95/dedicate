import React from 'react';
import EditEntry from './EditEntry';

export default class Post extends React.Component {


    deleteEntry(entryId) {
        console.log("Going to delete entry", entryId);
        Meteor.call("deleteEntry", entryId, (error) => {
            if (error) {
                console.log("Error: ", error);
            }
        })
    }

    render() {
        return (
            <div>
                <h4>Post: </h4>
                <p>{this.props.newEntry}</p>
                ({this.props.date.toISOString()})
                <br />
                <button onClick={this.deleteEntry.bind(this, this.props._id)}>Delete</button>
                <EditEntry key={this.props.newEntry._id} {...this.props} />
            </div>
        )
    }
}