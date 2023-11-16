import React from 'react'

import type { FC, PropsWithChildren } from 'react'

interface Props {
  className?: string
  style?: React.CSSProperties
}

const IconWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  className,
  style
}) => {
  return (
    <div className={`${className}`} style={style}>
      {children}
    </div>
  )
}

export default IconWrapper
