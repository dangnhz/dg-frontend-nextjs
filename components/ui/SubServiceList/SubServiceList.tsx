import React from 'react'
import Link from 'next/link'
import styles from './SubServiceList.module.scss'
import classNames from "classnames/bind";
import ArrowBold from '@components/icons/ArrowBold';

const cx = classNames.bind(styles)

interface Props {
    [key: string]: any
}

const SubServiceList:React.FC<Props> = ({ title, serviceItems, parentAlias, parentId }) => {
  const items = serviceItems?.filter((item:any) => item.link !== null)

  return (
    <div className={cx("sub-service-list")}>
      {title && items?.length > 0 && <h5 className={cx("more-about-service")}>{title}</h5>}
      <ul>
        {items?.length > 0 &&
          items.map(
            (item:any) =>
              item.link && (
                <li key={item.link.id} data-cursor-type="none">
                  <span className={cx("sub-service-icon")}>
                    <ArrowBold />
                  </span>
                  <span>
                    <Link
                      passHref
                      href={`/services${parentAlias ? parentAlias : '/' + parentId}${
                        item.link.alias ? item.link.alias : '/' + item.link.id
                      }`}
                    >
                      <a>{item.title}</a>
                    </Link>
                  </span>
                </li>
              )
          )}
      </ul>
    </div>
  )
}

export default SubServiceList
