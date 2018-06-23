import React, { Component } from 'react';
import axios from 'axios';
import wiki from 'wikijs';

import CatPanel from './CatPanel';
import Panel from './Panel';


const amounts = ['100', '200', '300', '400', '500'];

export default class Row extends Component {

    state = {
        set: false,
        wikiLinkPool: {
            "100": {prompt: "prompt", response: "response", correct: false},
            "200": {prompt: "prompt", response: "response", correct: false},
            "300": {prompt: "prompt", response: "response", correct: false},
            "400": {prompt: "prompt", response: "response", correct: false},
            "500": {prompt: "prompt", response: "response", correct: false},
        },
        catState: this.props.category
    }

    renderPanel = (amount, i) => {
        const {onPromptClick} = this.props;
        return (
            <Panel key={amount} amount={amount}
                prompt={this.state.wikiLinkPool[amount].prompt}
                response={this.state.wikiLinkPool[amount].response}
                correct={this.state.wikiLinkPool[amount].correct}
                onPromptClick={onPromptClick}
            />
        )
    }

    getQs = (category) => {

        wiki().search(category).then(data => {
            let searchResult = data.results[0];
            this.setState({catState: searchResult});

            this.setLinks2(searchResult);

            
        });

    }



    setLinks2(searchResult) {

        const {wikiLinkPool} = this.state;

        wiki().page(searchResult).then(page => {

            page.links().then(links => {

                let copyPool = wikiLinkPool;

                amounts.map((val, idx) => {

                    let goodOne = false;

                    let candidate = links[Math.floor(Math.random()*links.length)];

                    wiki().page(candidate).then(page => {
                        page.summary().then(summary => {

                            let cleanedPrompt = this.cleanThisPrompt(summary, candidate);

                            copyPool[val] = {
                                prompt: cleanedPrompt,
                                response: candidate
                            };
                            this.setState({wikiLinkPool: copyPool});
                        });
                    });

                });

                this.setState({set: true});

            });

        });

    }



    cleanThisPrompt(prompt, candidate) {

        let canArray = candidate.split(' ');

        let returnPrompt = prompt;

        canArray.forEach(canWord => {
            let obfCandidate = canWord.replace(/[a-zA-Z]/g, '_')
            let reg2 = new RegExp(canWord, 'ig');
            returnPrompt = returnPrompt.replace(reg2, obfCandidate);
        });
        
        return returnPrompt;
    }




    render() {

        const {set, wikiLinkPool, catState} = this.state;
        const {category, show} = this.props;

        return (
            <div style={styles.row} className={show ? "" : "hide"}>
                <CatPanel onClickItem={this.getQs} category={catState} set={set} />
                <div className={set ? "" : "hide"}>
                    {amounts.map(this.renderPanel)}
                </div>
            </div>
        )
    }
}


const styles = {
    row: {
        width: '32%',
        height: '100%',
        float: 'left',
        marginRight: 5,
        marginLeft: 5,
    }
};


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}