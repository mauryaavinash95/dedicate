import React from 'react';
import moment from 'moment'
import PropTypes from 'prop-types';

export default class HtmlEntry extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entry: this.props.entry
        }
    }

    componentWillReceiveProps(nextProps) {
        nextProps = nextProps.entry;
        this.setState({ entry: nextProps }, () => {
            $('#' + this.state.entry._id).html(this.state.entry.newEntry);
        });
    }

    componentDidMount() {
        $('#' + this.state.entry._id).html(this.state.entry.newEntry);
    }

    render() {
        return (
            <div>
                <h4>Post </h4>
                <div id={this.state.entry._id}></div>
                <div>(Last Edited {moment(this.state.entry.date).fromNow()})</div>
            </div>
        )
    }
}

HtmlEntry.PropTypes = {
    entry: PropTypes.object.isRequired,
}