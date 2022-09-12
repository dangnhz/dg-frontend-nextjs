import React, {useRef, useEffect} from 'react'
import gsap from 'gsap';
import {useRouter} from 'next/router'

const AnimationFadeInUp:React.FC<{children: React.ReactNode, y?: number, animationDelay?: number}> = ({children, y, animationDelay = 0.5}) => {
    const ref = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {

    if (y) {
        gsap.fromTo(ref.current, {
            opacity: 0,
            y: y,
        }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: animationDelay
        })
    }
    else {
        gsap.fromTo(ref.current, {
            opacity: 0,
            duration: 0.5,
        }, 
        {
            opacity: 1,
            duration: 0.5,
            delay: animationDelay
        })
    }

    }, [y,animationDelay, router.asPath])

    return (
        <div ref={ref} style={{opacity: 0}}>
            {children}
        </div>
    )
}

export default AnimationFadeInUp
