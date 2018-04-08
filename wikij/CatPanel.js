import React, { Component } from 'react';

export default class CatPanel extends Component {

    render() {

        const {complete, category, onClickItem} = this.props;

        return (
            <div style={styles.panel}>
                {!complete ? (
                    <div onClick={() => onClickItem(category)} style={styles.amount}>{category.toUpperCase()}</div>
                ) : (
                    <div></div>
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