import React from 'react'
import HowWeDoItem from './HowWeDoItem'
import styles from "./HowWeDo.module.scss"
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
    data: any
}

const HowWeDo:React.FC<Props> = ({data}) => {
    const {title, steps} = data
    return (
        <div className={cx("how-we-do", "padding-horizontal")}>
            <div className={cx("how-we-do-wrapper", "max-width-5 mx-auto")}>
                <h2>{title}</h2>
                {steps?.length > 0 && (<div className={cx("listing-wrapper")}>
                    <div className={cx("how-we-do-listing")}>
                    {steps.map((step:any, index:number) => <HowWeDoItem step={step} key={index} />)}
                </div>
                </div>)}
            </div>
        </div>
    )
}

export default HowWeDo