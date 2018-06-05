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
            "100": {prompt: "prompt", response: "response"},
            "200": {prompt: "prompt", response: "response"},
            "300": {prompt: "prompt", response: "response"},
            "400": {prompt: "prompt", response: "response"},
            "500": {prompt: "prompt", response: "response"},
        },
        catState: this.props.category
    }

    renderPanel = (amount, i) => {
        const {onPromptClick} = this.props;
        return (
            <Panel key={amount} amount={amount}
                prompt={this.state.wikiLinkPool[amount].prompt}
                response={this.state.wikiLinkPool[amount].response}
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

        wiki().page(searchResult).then(page => {

            page.links().then(links => {
                
                let copyPool = {};

                amounts.map((val, idx) => {

                    let goodOne = false;

                    //while(goodOne == false) {

                        let candidate = links[Math.floor(Math.random()*links.length)];

                        //if (!candidate.indexOf("(")) {

                            wiki().page(candidate).then(page => {
                                console.log(page.raw);
                              //  if (page.raw.length > 5000) {
                                   // goodOne = true;
                                    page.summary().then(summary => {
                                        copyPool[val] = {
                                            prompt: summary,
                                            response: candidate
                                        };
                                        console.log(copyPool);
                                    });
                               // }
                            });

                       // }

                    //}


                    copyPool[val] = {
                      //  prompt: prompts[idx].prompt,
                      //  response: prompts[idx].response
                    }

                    
                    

                });

                
                this.setState({wikiLinkPool: copyPool});
                this.setState({set: true});

            });

        });

    }



    setLinks(page, cont) {

        let paramz = {
            action: 'query',
            format: 'json',
            titles: page,
            gplnamespace: '0',
            prop: 'pageviews|pageterms',
            pvipdays: '1',
            generator: 'links',
            gpllimit: '500',
            origin: '*',
        }

        if (cont) {
            for (let key in cont){
                paramz[key] = cont[key];
            }
        }

        axios.get(`https://en.wikipedia.org/w/api.php`, {
            params: paramz
        })
        .then((resp) => {
            let pages = resp.data['query']['pages'];

            //console.log(pages);

            let prompts = [];

            for (let pg in pages) {
                if (pages[pg]['pageviews'] && pages[pg]['terms'] && pages[pg]['terms']['description']) {
                    prompts.push({
                        pageviews: pages[pg]['pageviews'],
                        prompt: capitalizeFirstLetter(pages[pg]['terms']['description'][0]),
                        response: pages[pg]['title']
                    });
                }
            }

            let copyPool = {};
            amounts.map((val, idx) => {
                copyPool[val] = {
                    prompt: prompts[idx].prompt,
                    response: prompts[idx].response
                }
            });
            this.setState({wikiLinkPool: copyPool});
            //let newObj = Object.assign(resp.data['query']['pages'], this.state.wikiLinkPool);
            //this.setState({wikiLinkPool: newObj});
            //this.setState({catState: this.state.wikiLinkPool[844]['title']});
            if(resp.data['continue']) {
             //   this.setLinks(page, resp.data['continue'])
            }
        })

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