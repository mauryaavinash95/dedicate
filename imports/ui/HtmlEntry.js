import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

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
            $('#' + this.state.entry._id + '_heading').html(this.state.entry.heading);
            $('#' + this.state.entry._id + '_body').html(this.state.entry.body);
        });
    }

    componentDidMount() {
        $('#' + this.state.entry._id + "_heading").html(this.state.entry.heading);
        $('#' + this.state.entry._id + "_body").html(this.state.entry.body);
    }

    render() {
        return (
            <div>
                <div className="item__options">
                    <div className="item__content" id={this.state.entry._id + "_heading"}></div>
                    <div className="item__status-message">Created At:{moment(this.state.entry.createdAt).calendar()}</div>
                </div>
                <div className="item__content" id={this.state.entry._id + "_body"}></div>
            </div>
        )
    }
}

HtmlEntry.PropTypes = {
    entry: PropTypes.object.isRequired,
}