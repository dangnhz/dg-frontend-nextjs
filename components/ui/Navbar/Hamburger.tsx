import React from 'react'
import {MenuState} from './NavBar'
import styles from './Hamburger.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

interface Props {
    disabled: boolean,
    handleMenu: () => void;
    state: MenuState
}

const Hamburger:React.FC<Props> = ({disabled, handleMenu, state} ) => {

    return (
        <button className={cx('hamburger', {'is-active': state.clicked})} onClick={handleMenu} disabled={disabled}>
            <div className={cx('line')}></div>
            <div className={cx('line')}></div>
            <div className={cx('line')}></div>
        </button>
    )
}

export default Hamburger
