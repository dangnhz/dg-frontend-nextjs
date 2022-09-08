import React, {useRef, useEffect} from 'react'
import gsap from 'gsap';
import {useRouter} from 'next/router'

const AnimationFadeInUp:React.FC<{children: React.ReactNode, y: number, animationDelay?: number}> = ({children, y, animationDelay = 0.5}) => {
    const ref = useRef<HTMLDivElement>(null)
    const router = useRouter()

    useEffect(() => {

    if (y) {
        gsap.from(ref.current, {
            opacity: 0,
            y: y,
            duration: 0.5,
            delay: animationDelay
        })
    }
    else {
        gsap.from(ref.current, {
            opacity: 0,
            duration: 0.5,
            delay: animationDelay
        })
    }

    }, [y,animationDelay, router])

    return (
        <div ref={ref}>
            {children}
        </div>
    )
}

export default AnimationFadeInUp
