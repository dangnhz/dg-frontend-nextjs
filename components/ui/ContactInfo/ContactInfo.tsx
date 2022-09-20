import React from 'react'
import classNames from 'classnames/bind'
import styles from './ContactInfo.module.scss'

const cx = classNames.bind(styles)

interface ContactInfoItemProps {
  label: string
  email: string
  phone: string
  address: any
}

interface ContactInfoProps {
  addresses: Array<ContactInfoItemProps>
}

const ContactInfoItem: React.FC<ContactInfoItemProps> = ({ label, email, phone, address }) => {
  return (
    <div className={cx("contact-info-item")}>
      {label && <h6 className={cx("contact-info-city","margin-v-1")}>{label}</h6>}
      {address && (
        <p className={cx("contact-info-address", "margin-b-1")}>
          {address.address_line1?.length > 0 && (
            <>
              {address.address_line1},
              <br />
            </>
          )}
          {address.address_line2?.length > 0 && (
            <>
              {address.address_line2},
              <br />
            </>
          )}
          {address.locality} {address.administrative_area} {address.postal_code}
        </p>
      )}
      {phone && (
        <a href={`tel:${phone}`} data-cursor-type="medium" className={cx("contact-info-phone")}>
          {phone}
        </a>
      )}
      <br />
      <br />
      {email && (
        <a href={`mailto:${email}`} data-cursor-type="medium" className={cx("contact-info-email")}>
          {email}
        </a>
      )}
      <br />
      {email && (
        <a
          href="mailto:careers@digitalgarden.com.au"
          data-cursor-type="medium"
          className={cx("contact-info-email")}
        >
          careers@digitalgarden.com.au
        </a>
      )}
    </div>
  )
}

const ContactInfo: React.FC<ContactInfoProps> = ({ addresses }) => {
  return (
    <div className={cx("contact-info" , "padding-b-10 padding-horizontal")}>
      <div className={cx("contact-info-wrapper", "max-width-5")}>
        <div className={cx("left")}></div>
        <div className={cx("contact-info-listing")}>
          {addresses?.map((address, index: number) => (
            <ContactInfoItem key={index} {...address} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ContactInfo
