import React, { Component } from 'react';

export default class PromptPanel extends Component {

    render() {

        const {prompt, response} = this.props;

        return (
            <div style={styles.promptPanel}>
                {prompt}
            </div>
        )
    }
}


const styles = {
    promptPanel: {
        color: 'white',
        padding: 20,
        backgroundColor: '#0000b2',
        margin: 20,

    }
};