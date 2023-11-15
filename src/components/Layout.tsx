import type { FC, PropsWithChildren } from 'react'
import React from 'react'
import LeftPanel from './LeftPanel'
const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex w-full">
      <LeftPanel />
      <main className="flex-1">{children}</main>
    </div>
  )
}

export default Layout
