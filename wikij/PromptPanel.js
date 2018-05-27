import React, { Component } from 'react';

export default class PromptPanel extends Component {

    state = {userResponse: ''}

    handleResponseChange = (e) => {
        const {response, onBack} = this.props;
        let uResponse = e.target.value;
        this.setState({userResponse: uResponse});
        if (uResponse.toLowerCase() === response.toLowerCase()) {
            onBack();
        }
    }

    beforeMaskedValueChange = (newState, oldState, userInput) => {
        var { value } = newState;
        var selection = newState.selection;
        var cursorPosition = selection ? selection.start : null;
    
        // keep minus if entered by user
        if (value.endsWith('-') && userInput !== '-' && !this.state.value.endsWith('-')) {
          if (cursorPosition === value.length) {
            cursorPosition--;
            selection = { start: cursorPosition, end: cursorPosition };
          }
          value = value.slice(0, -1);
        }

        return {
            value,
            selection
          };
        }

    render() {

        const {userResponse} = this.state;

        const {prompt, response, onBack, show} = this.props;

        return (
            <div style={styles.promptPanel} className={show ? "" : "hide"}>
                <button onClick={() => onBack()}>Back to Board</button>
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
                <div>{response.shuffle()}</div>
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