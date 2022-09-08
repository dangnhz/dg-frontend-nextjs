import React, { useState, useEffect, useCallback, useRef } from 'react'
import Logo from '@components/ui/Logo'
import Menu from './Menu'
import Hamburger from './Hamburger'
import gsap from 'gsap'
import { useUI } from 'context/UIContext'
import { useRouter } from 'next/router'
import { menuCurtainReveal, menuCurtainClose, staggerTextReveal, staggerTextHide } from '../../../utils/animations'
import { useWindowSize } from 'react-use'
import { useScrollDirection } from '../../../hooks/useScrollDirection'
import classNames from 'classnames/bind'

import styles from './Navbar.module.scss'

const cx = classNames.bind(styles)

export interface MenuState {
  initial: boolean | null
  clicked: boolean | null
}

const tl = gsap.timeline()

const Navbar = () => {
  const navbar = useRef<HTMLDivElement>(null)

  const [showNavbar, setShowNavbar] = useState(true)

  const [isMini, setIsMini] = useState(false)

  const { scrollY, scrollDir } = useScrollDirection()

  const { width } = useWindowSize()

  const { theme } = useUI()

  // State of our Menu
  const [state, setState] = useState<MenuState>({
    initial: false,
    clicked: null,
  })

  // State of hamburger button
  const [disabled, setDisabled] = useState(false)

  const router = useRouter()

  //Listening for page changes.

  useEffect(() => {
    setState((prevState) => ({ ...prevState, clicked: false }))
  }, [router.asPath])

  // Toggle menu
  const handleMenu = () => {
    disableMenu()
    if (state.initial === false) {
      setState({
        initial: null,
        clicked: true,
      })
    } else if (state.clicked === true) {
      setState((prevState) => ({ ...prevState, clicked: false }))
    } else if (state.clicked === false) {
      setState((prevState) => ({ ...prevState, clicked: true }))
    }
  }

  //Determine if menu button should be disabled
  const disableMenu = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 2500)
  }

  //handle menu animation

  const openMenu = useCallback(() => {
    document.body.style.overflow = 'hidden'

    tl.to('.js-menu-wrapper', {
      display: 'block',
      duration: 0,
    })

    menuCurtainReveal(tl, '.js-menu-curtain')
    tl.to(
      '.js-menu-wrapper .js-menu',
      {
        visibility: 'visible',
        duration: 0.1,
      },
      '-=0.6'
    )
    staggerTextReveal(tl, ['.js-menu .js-menu-link', '.js-search'])
  }, [])

  const closeMenu = useCallback(() => {
    document.body.style.overflow = 'scroll'

    staggerTextHide(tl, ['.js-menu .js-menu-link', '.js-search'])

    menuCurtainClose(tl, '.js-menu-curtain')
    tl.to(
      '.js-menu',
      {
        visibility: 'hidden',
        duration: 0.1,
      },
      '-=0.6'
    )

    tl.to('.js-menu-wrapper', {
      display: 'none',
      duration: 0,
    })
  }, [])

  const resetMenu = useCallback(() => {

    console.log('reset');
    tl.progress(0)
  }, [])

  useEffect(() => {
    const breakpoint = window.matchMedia('(max-width: 1023px)')

    if (!breakpoint.matches) return
    // If the menu is open and we click the menu button to close it.
    if (state.clicked === false) {
      closeMenu()
    } else if (state.clicked === true) {
      openMenu()
    }

    breakpoint.addEventListener('change', () => {
      if (!breakpoint.matches) {
        resetMenu();
      }
    })
  }, [state.clicked])

  //hide and show navbar on scroll

  useEffect(() => {
    if (scrollDir === 'UP') {
      setShowNavbar(true)
    } else if (scrollDir === 'DOWN' && !state.clicked) {
      setShowNavbar(false)
    }

    if (scrollY > 250) {
      setIsMini(true)
    } else {
      setIsMini(false)
    }

    if (scrollY < 160 && width > 1280) {
      setShowNavbar(true)
    } else if (scrollY < 100) {
      setShowNavbar(true)
    }
  }, [scrollDir, scrollY, state.clicked, width])

  const navClassName = cx('navbar', { 'navbar-mini': isMini, 'is-shown': showNavbar })

  return (
    <nav id="navbar" className={navClassName} ref={navbar}>
      <div className={cx('navbar-inside', 'max-width-6')}>
        <div className={cx('brand')}>
          <Logo className={`${isMini ? 'mini-logo' : ''}`} />
          <Hamburger handleMenu={handleMenu} state={state} disabled={disabled} />
        </div>
        <div className={cx('menu-wrapper', 'js-menu-wrapper')}>
          <div className={cx('menu-curtain', 'js-menu-curtain')} style={{ backgroundColor: theme.primaryColor }}></div>
          <Menu />
        </div>
      </div>
    </nav>
  )
}

export default Navbar
