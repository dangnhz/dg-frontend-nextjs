import React, {CSSProperties} from "react";
import routes from '@lib/routes';
import { useRouter } from "next/router";
import { SearchForm } from "../../ui/Search";
import { colors } from "@theme/colors";
import Link from "next/link";
import SearchIcon from "@components/icons/SearchIcon";
import classNames from "classnames/bind";
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles)

export interface CustomCSS extends CSSProperties {
  '--menu-link-color': string;
}

const Menu = () => {
  const router = useRouter();
  return (
    <div className={cx('menu', 'js-menu')}>
      <ul className={cx('menu-items')}>
        {routes.filter(route => route.showOnMenu === true).map((item) => (
          <li key={item.key} className={cx('menu-item')}>
          <Link prefetch={false} href={item.path} passHref><a className={cx("menu-link", "js-menu-link", {'active': router.pathname.includes(item.path)})} data-cursor-type="move-left" style={{'--menu-link-color': item.color || colors.green} as CustomCSS}>{item.text}</a></Link>
        </li>
        ))}
      </ul>
      <div className={cx('search', 'js-search')}>
       <Link prefetch={false} href="/search" passHref><a className={cx('search-icon')} data-cursor-type="none" aria-label="search"><SearchIcon /></a></Link>
       <SearchForm from="menu" className="mobile"/>
      </div>
    </div>
  );
};

export default Menu;
