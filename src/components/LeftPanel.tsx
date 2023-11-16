import { Input } from '@/components/ui/input'
import { utilMap } from '@/constant'
import { RocketIcon } from '@radix-ui/react-icons'
import React from 'react'
import IconWrapper from './IconWrapper'

const LeftPanel = () => {
  return (
    <div className="flex w-[400px] flex-col px-2 py-4">
      <div className="top flex w-full items-center justify-between gap-4 border-b px-2 py-4">
        <Input placeholder="Search" />
        <RocketIcon className="h-[28px] w-[28px]" />
      </div>
      <div className="bottom flex-1 py-4">
        {utilMap.map(utilItem => (
          <div
            key={utilItem.name}
            className="group flex items-center space-y-3 rounded-md px-8 py-2 hover:bg-sky-500"
          >
            <IconWrapper className="h-[24px] w-[24px] group-hover:text-white">
              {utilItem.icon}
            </IconWrapper>
            <a
              className="relative top-[-5px] ml-2 group-hover:text-white"
              href={utilItem.path}
            >
              {utilItem.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LeftPanel
