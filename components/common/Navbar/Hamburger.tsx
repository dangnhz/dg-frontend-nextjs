import React from 'react'
import styles from './Hamburger.module.scss'
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

interface Props {
    disabled: boolean,
    handleMenu: () => void;
    isMenuOpen: boolean
}

const Hamburger:React.FC<Props> = ({disabled, handleMenu, isMenuOpen} ) => {

    return (
        <button className={cx('hamburger', {'is-active': isMenuOpen})} onClick={handleMenu} disabled={disabled}>
            <div className={cx('line')}></div>
            <div className={cx('line')}></div>
            <div className={cx('line')}></div>
        </button>
    )
}

export default Hamburger
