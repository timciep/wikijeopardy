import React, { Component } from 'react';

import Row from './Row';
import PromptPanel from './PromptPanel';

const data = [
  {id: '1', category: 'cars'},
  {id: '2', category: 'rock music'},
  {id: '3', category: 'rome'},
  //{id: '4', category: 'basketball'},
  //{id: '5', category: 'christmas'},
  //{id: '6', category: 'sharks'},
];

export default class App extends Component {

  state = {
    boardMode: true,
    currentPrompt: '',
    currentResponse: ''
  }

  handlePromptClick = (prompt, response) => {
    this.setState({currentPrompt: prompt});
    this.setState({currentResponse: response});
    this.setState({boardMode: false});
  }

  render() {

    const {boardMode, currentPrompt, currentResponse} = this.state;

    return (
      <div style={styles.app}>
        {boardMode ? (
          data.map(item => <Row 
                              key={item.id}
                              category={item.category}
                              onPromptClick={this.handlePromptClick}
                            />)
        ) : (
          <PromptPanel prompt={currentPrompt} response={currentResponse} />
        ) }
      </div>
    )
  }
}

const styles = {
  app: {
      textAlign: 'center',
      backgroundColor: 'black',
      height: '100%',
      width: '100%',
      position: 'absolute',
  },
};