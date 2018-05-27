import React, { Component } from 'react';

export default class CatPanel extends Component {

    state = {value: ''}

    handleChange = (e) => {
        this.setState({value: e.target.value})
    }

    handleKeyPress = (e) => {
        const {value} = this.state;
        const {onClickItem} = this.props;
        if (e.key === 'Enter') {
            onClickItem(value);
        }
    }

    render() {

        const {value} = this.state;

        const {set, category, onClickItem} = this.props;

        return (
            <div style={styles.panel}>
                {set ? (
                    <div style={styles.amount}>{category.toUpperCase()}</div>
                ) : (
                    <div>
                        <input
                            id={'cat-input'}
                            type={'text'}
                            value={value}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                        />
                        <button onClick={() => onClickItem(value)}>Go</button>
                    </div>
                ) }
            </div>
        )
    }
}


const styles = {
    panel: {
        marginTop: 10,
        marginBottom: 5,
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
        color: 'white',
        fontSize: '26px',
        fontWeight: 'bold',
    }
};