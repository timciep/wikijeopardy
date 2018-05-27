import React, { Component } from 'react';
import axios from 'axios';

import CatPanel from './CatPanel';
import Panel from './Panel';


const amounts = ['100', '200', '300', '400', '500'];

export default class Row extends Component {

    state = {
        set: false,
        wikiLinkPool: {
            "100": {prompt: "cool guy", response: "me"},
            "200": {prompt: "cool guy", response: "me"},
            "300": {prompt: "cool guy", response: "me"},
            "400": {prompt: "cool guy", response: "me"},
            "500": {prompt: "cool guy", response: "me"},
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
        axios.get(`https://en.wikipedia.org/w/api.php`, {
        params: {
          action: 'opensearch',
          datatype: 'json',
          limit: 5,
          search: category,
          profile: 'fuzzy',
          origin: '*'
        }
      })
      .then((resp) => {
        this.setState({catState: resp.data[1][0]});
        this.setLinks(resp.data[1][0], false);
        this.setState({set: true});
      })
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
                {amounts.map(this.renderPanel)}
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