import React from 'react';
import './dark.scss';

const Dark = (props) => {

    const cls = ['dark'];

    if (props.showModal) {
        cls.push('showDark')
    }

    return (
        <div className = {cls.join(' ')} onClick = {props.modalHideHandler}></div>
    )
}

export default Dark;