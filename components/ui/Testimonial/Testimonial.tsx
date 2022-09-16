import React from 'react';
import classNames from 'classnames/bind';
import styles from './Testimonial.module.scss';

const cx = classNames.bind(styles)

interface Props {
    testimonial: {text: string,
    label_bold: string,
    label: string}
}

const Testimonial:React.FC<Props> = ({testimonial}) => {
    return (
        <div className={cx("testimonial", "margin-horizontal margin-b-10")}>
            <div className={cx("wrapper", "container max-width-5 padding-t-5")}>
                <div className={cx("text")} dangerouslySetInnerHTML={{__html:testimonial.text}}></div>
                <div className="margin-t-2">
                    {testimonial.label_bold && <div className={cx("label-bold")}>{testimonial.label_bold}</div>}
                    <div className={cx("label")}>{testimonial.label}</div>
                </div>
            </div>
        </div>
    )
}

export default Testimonial
