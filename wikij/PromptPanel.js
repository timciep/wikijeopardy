import React, { Component } from 'react';

export default class PromptPanel extends Component {

    state = {
        userResponse: '',
        shuffledResponse: '',
        showState: false
    }

    handleResponseChange = (e) => {
        const {response} = this.props;
        let uResponse = e.target.value;
        this.setState({userResponse: uResponse});
        if (uResponse.toLowerCase() === response.toLowerCase()) {
            this.backToBoard();
        }
    }

    
    showHint = () => {
        const {response} = this.props;
        this.setState({shuffledResponse: response.shuffle()});
    }


    backToBoard = () => {
        const {onBack} = this.props;
        this.setState({userResponse: ''});
        this.setState({shuffledResponse: ''});
        onBack();
    }


    render() {

        const {prompt, response, show} = this.props;

        const {userResponse, shuffledResponse} = this.state;

        return (
            <div style={styles.promptPanel} className={show ? "" : "hide"}>
                <button onClick={() => this.backToBoard()}>Back to Board</button>
                <br/>
                <div>{prompt}</div>
                <div>
                    <input
                        id={'user-response'}
                        type={'text'}
                        value={userResponse}
                        onChange={this.handleResponseChange}
                    />
                </div>
                <div><button onClick={() => this.showHint()}>Hint</button> (word jumble)</div>
                <div>{shuffledResponse}</div>
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
        lineHeight: 2,
    }
};

String.prototype.shuffle = function() {
    return this.split(" ").map(function(word, i) {
        var a = word.split(""),
            n = a.length;

        for (var i = n - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }

        return a.join("");
    }).join(" ");
}