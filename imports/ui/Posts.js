import React from 'react';

export default class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: []
        }
    }
    render() {
        return (
            <div>
                Posts
            </div>
        )
    }
}