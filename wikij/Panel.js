import React, { Component } from 'react';

export default class Panel extends Component {

    state = {
        read: false,
    }

    readit = () => {
        const {amount, prompt, response, onPromptClick} = this.props;

        onPromptClick(prompt, response);
        this.setState({read: true});
    }

    render() {

        const {read} = this.state;
        const {amount, prompt, response, correct} = this.props;

        return (
            <div onClick={() => this.readit()} style={styles.panel}>
                {!read ? (
                    <div style={styles.amount}>${amount}</div>
                ) : (
                    <div>
                        <div style={styles.prompt}>{prompt}</div>
                        <div style={styles.responseCorrect}>{response}</div>
                    </div>
                ) }
            </div>
        )
    }
}


const styles = {
    panel: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
        height: 30,
        float: 'left',
        textAlign: 'center',
        backgroundColor: '#0000b2',
        cursor: 'pointer',
    },
    amount: {
        color: '#fff005',
        fontSize: '26px',
        fontWeight: 'bold',
    },
    prompt: {
        color: 'white',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        padding: '0 10px 0 10px',
    },
    responseCorrect: {
        color: '#fff005',
    },
    respnseWrong: {
        color: 'red'
    }
};