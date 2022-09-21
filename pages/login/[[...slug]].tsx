import React, { useState, useEffect } from 'react'

import { login, refreshToken } from '@lib/api/login.service'
import { useRouter } from 'next/router'

import loginBackground from '@public/footer-leaves/login-background.svg'
import { BeatLoader } from 'react-spinners'
import { colors } from '@theme/colors'
import WarningIcon from '@components/icons/WarningIcon'
import Link from 'next/link'

import classNames from 'classnames/bind'
import styles from '@components/ui/LoginForm/LoginForm.module.scss'

const cx = classNames.bind(styles)

const Login = () => {
  const [message, setMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const router = useRouter()

  const slugs = router.query.slug

  const [uid, timestamp, hash]: Array<string> = [...(slugs || [])]

  const destination = router.query.destination

  useEffect(() => {
    if (!uid && !timestamp && !hash) {
      setMessage("No user ID found! Couldn't login.")
      router.push('/')
    }
    setIsLoading(true)
    login(uid, timestamp, hash)
      .then((res: any) => {
        setIsLoading(false)
        if (res.access_token && res.refresh_token) {
          localStorage.setItem('accessToken', res.access_token)
          localStorage.setItem('refreshToken', res.refresh_token)
          setTimeout(() => refreshToken(), 60000)
          if (destination) {
            router.push({
              pathname: `/${destination}`,
              query: { isGated: true, curtainColor: colors.pink },
            })
          }
        }
      })
      .catch((error: any) => {
        setIsLoading(false)
        setError(true)
        if (error.response.status === 403) {
          router.push('/')
        } else if (error.response.status === 400 && error.response.data.message) {
          setMessage(error.response.data.message)
        }
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uid, timestamp, hash, router])

  return (
    <div className="container">
      <div className={cx('login-form', 'mx-auto')} style={{ backgroundImage: `url(${loginBackground.src})` }}>
        {isLoading && (
          <h6 className="text-center">
            Signing in <BeatLoader color="#fff" size={10} margin={3} />
          </h6>
        )}
        {!isLoading && error && (
          <div className={cx('form-response')}>
            <WarningIcon />
            <h5 className={cx('message', 'margin-t-2 margin-b-5')}>{message}</h5>
            <Link href={`/${destination ? destination : 'work'}`}>
              <a className={cx('btn-submit')} data-cursor-type="none">
                Try again
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
