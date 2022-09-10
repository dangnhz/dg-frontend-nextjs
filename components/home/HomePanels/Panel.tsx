import React from 'react'
import classNames from 'classnames/bind';
import { ButtonLink } from '@components/ui/Button';
import styles from './Panel.module.scss'


const cx = classNames.bind(styles)


interface PanelProps {
    data: any
}


export const Panel:React.FC<PanelProps> = ({ data }) => {
    const { title, blurb, background_color, background_image, link, link_color, cta_type } = data;
  
    return (
      <div className={cx("home-panel")}>
        <div className={cx("home-panel-wrapper")}>
          <div className={cx("home-panel-background")}>
           {background_image &&  <img src={background_image} alt={title} loading="lazy"/>}
          </div>
          <div className={cx("home-panel-overlay")} style={{ backgroundColor: background_color, opacity: background_image ? 0.8 : 1}}></div>
          <div className={cx("home-panel-inside")}>
            <div className={cx("home-panel-content")}>
              <h3>{title}</h3>
              <div dangerouslySetInnerHTML={{__html: blurb}}></div>
            </div>
            <div className={cx("home-panel-button")}>
              {link && !cta_type && <ButtonLink href={link.url} text={link.title} color={link_color}/>}
              {link && cta_type==='blog' && <ButtonLink href={`/blog${link.url}`} text={ link.title || 'Read more'} color={link_color} />}
              {link && cta_type==='job' && <ButtonLink href={`/careers${link.url}`} text={ link.title || 'Read more'} color={link_color}/>}
            </div>
          </div>
        </div>
      </div>
    );
  };
