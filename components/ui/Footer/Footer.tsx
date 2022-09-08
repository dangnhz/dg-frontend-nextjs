import React, { useState, useEffect } from "react";
import Link from "next/link";
import routes from "@lib/routes";
import { useQuery } from "react-query";
import { fetchLayoutData } from "@lib/api/layout.service";
import FooterLogo from "../Logo/FooterLogo";
import Facebook from "@components/icons/Facebook";
import LinkedIn from "@components/icons/LinkedIn";
import Twitter from "@components/icons/Twitter";
import classNames from "classnames/bind";
import styles from "./Footer.module.scss";


const cx = classNames.bind(styles)


const Footer:React.FC = () => {

  const [year, setYear] = useState<number|undefined>(undefined);

  const {data : footer} = useQuery('fetchLayoutData', fetchLayoutData);

  

  useEffect(() => {
    const date = new Date();
    setYear(date.getFullYear());
  }, []);

  if (!footer) return(<h1>Loading...</h1>)

  return (
    <>
    <footer className={cx("footer")}>
      <div className={cx("footer-wrapper", "max-width-6", "padding-horizontal")}>
        <div className={cx("footer-left-column")}>
          <div className={cx("footer-logo")}>
            <Link href="/" passHref>
              <a className="logo"><FooterLogo /></a>
            </Link>
          </div>
        </div>
        <div className={cx("footer-right-column")}>
          <div className={cx("footer-links", "column")}>
            {routes
              .filter((route) => route.showOnMenu === true)
              .map((item) => (
                <Link href={item.path} passHref key={item.key} >
                  <a className={cx("footer-link-item")} data-cursor-type="medium">{item.text}</a>
                </Link>
              ))}
          </div>
          <div className={cx("footer-location", "column")}>
            {footer &&
              footer.adresses?.map(
                (item:any, index:number) =>
                  item.address && (
                    <div className={cx("footer-location-item")} key={index}>
                      <div className={cx("footer-location-city")}>{item.label}</div>
                      <div className={cx("footer-location-address")}>
                        {item.address.address_line1?.length > 0 && (
                          <>
                            {item.address.address_line1},
                            <br />
                          </>
                        )}
                        {item.address.address_line2?.length > 0 && (
                          <>
                            {item.address.address_line2},
                            <br />
                          </>
                        )}
                        {item.address.locality} {item.address.administrative_area} {item.address.postal_code}
                      </div>
                      <div className={cx("footer-location-email")}>
                        {item.phone && <a href={`tel:${item.phone}`} data-cursor-type="medium">{item.phone}</a>}
                        <br />
                        {item.email && <a href={`mailto:${item.email}`} data-cursor-type="medium">{item.email}</a>}
                        <br />
                         {item.email && <a href='mailto:careers@digitalgarden.com.au' data-cursor-type="medium" className={cx("contact-info-email" , "body-copy")}>careers@digitalgarden.com.au </a>}
                      </div>
                    </div>
                  )
              )}
          </div>
          <div className={cx("footer-follow-us" , "column")}>
            <div className={cx("footer-follow-us-text")}>
              <span>Follow us</span>
              <div className={cx("footer-follow-us-social-media")}>
                <a href="https://www.facebook.com/websitedesignsydney" target="_blank" rel="noopener noreferrer" data-cursor-type="medium" aria-label="facebook">
                  <Facebook />
                </a>
                <a href="https://www.linkedin.com/company/digital-garden-sydney" target="_blank" rel="noopener noreferrer" data-cursor-type="medium" aria-label="LinkedIn">
                  <LinkedIn/>
                </a>
                <a href="https://twitter.com/digitalgarden" target="_blank" rel="noopener noreferrer" data-cursor-type="medium" aria-label="twitter">
                  <Twitter />
                </a>
              </div>
              <div className={cx("footer-policy" , "margin-t-2")}>
                  <Link href="/privacy-policy" passHref><a className={cx("footer-policy-link")} data-cursor-type="medium" aria-label="Privacy Policy">Privacy Policy</a></Link>
                  <Link href="/terms-and-conditions" passHref><a className={cx("footer-policy-link")} data-cursor-type="medium" aria-label="Term of Use">Term of Use</a></Link>
              </div>
            </div>
            <div className={cx("footer-copy-right")}>© {year} Digital Garden Pty Ltd.</div>
          </div>
        </div>
      </div>
      {footer && footer.bottom_line && <div className={cx("footer-bottom" , "max-width-6 margin-t-4 padding-horizontal mx-auto")}>
          <span className={cx("footer-bottom-text")}>
            {footer.bottom_line}
          </span>
          <span className={cx("footer-bottom-copyright")}>© {year} Digital Garden Pty Ltd.</span>
      </div>}
    </footer>
    
    </>
  );
};



export default Footer;