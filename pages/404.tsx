import React from 'react'
import animation from 'assets/animation/oops.json'
import Link from 'next/link'
import Lottie from 'lottie-react'
import styles from '@components/ui/NotFound/NotFound.module.scss'
import SEO from '@components/common/SEO'
import { ButtonRounded } from '@components/ui/Button/Button'
import classNames from 'classnames/bind'

const cx= classNames.bind(styles)
const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMin meet',
    },
  }

  return (
    <>
      <SEO title="404 | Digital Garden" />
      <div className={cx("page page-not-found", "padding-horizontal")}>
        <div className={cx("page-not-found-container")}>
          <div className={cx("page-not-found-background")}>
            <span className={cx("background-text")}>404</span>
          </div>
          <div className={cx("page-not-found-content")}>
            <div className={cx("page-not-found-animation")}>
              <Lottie {...defaultOptions} />
            </div>
            <div className={cx("page-not-found-text")}>
             <div className="body-copy text-center margin-b-3">
                  <h6>404 - PAGE NOT FOUND</h6>
                  <p className="margin-t-2">
                    <span>Sorry. We couldn't find what you were looking for.</span>
                    <br /> <span>Please ensure you do not have any typos or </span>
                    <Link href="/contact">
                      <a>contact us</a>
                    </Link>
                    <span> for further assistance.</span>
                  </p>
             </div>
              <ButtonRounded>
                <Link href="/" passHref prefetch={false}>
                  <a className={cx('pre-footer-button')} data-cursor-type="none">
                    Back to Homepage
                  </a>
                </Link>
              </ButtonRounded>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NotFound
