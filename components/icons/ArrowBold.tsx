
import React from 'react'

const ArrowBold = ({color}: {color?:string}) => {
  return (
    <svg width={11} height={16}>
    <title>{"Path"}</title>
    <path
      d="m2 2 6 6-6 6"
      stroke={color || '#00A3E5'}
      strokeWidth={4}
      fill="none"
      fillRule="evenodd"
    />
  </svg>
  )
}

export default ArrowBold