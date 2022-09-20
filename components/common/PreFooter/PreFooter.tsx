import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import ContactForm from '@components/ui/ContactForm'
import { footerGreen, footerBlue, footerRed, footerPurple, footerPink, footerOrange ,footerGreenContact } from '@lib/footer-images'

import classNames from 'classnames/bind'
import styles from './PreFooter.module.scss'
import { ButtonRounded } from '@components/ui/Button/Button'
import { useUI } from '@context/UIContext'
const cx = classNames.bind(styles)

interface Props {
  showContactForm?: boolean
}

const PreFooter: React.FC<Props> = ({ showContactForm = false }) => {
  const [imgURL, setImageUrl] = useState<string>('')

  const {theme} = useUI()

  useEffect(() => {
    switch (theme.currentTheme) {
      case 'lime':
        setImageUrl(footerGreenContact.src)
        break
      case 'blue':
        setImageUrl(footerBlue.src)
        break
      case 'red':
        setImageUrl(footerRed.src)
        break
      case 'purple':
        setImageUrl(footerPurple.src)
        break
      case 'pink':
        setImageUrl(footerPink.src)
        break
      case 'orange':
          setImageUrl(footerOrange.src)
          break
      default:
        setImageUrl(footerGreen.src)
        break
    }
  }, [theme.currentTheme])

  return (
    <div className={cx('pre-footer', { 'has-contact-form': showContactForm })}>
      <div className={cx('pre-footer-background')} style={{ backgroundImage: `url(${imgURL})` }}></div>
      <div className={cx('pre-footer-content', 'padding-horizontal')}>
        <div className={cx('pre-footer-content-wrapper')}>
          {!showContactForm && (
            <>
              <div className={cx('pre-footer-title')}>We'd love to work with you.</div>
              <ButtonRounded color='black'>
                <Link href="/contact" passHref>
                  <a className={cx('pre-footer-button')} data-cursor-type="none">
                    Say Hello
                  </a>
                </Link>
              </ButtonRounded>
            </>
          )}
          {showContactForm && <ContactForm />}
        </div>
      </div>
    </div>
  )
}

export default PreFooter
