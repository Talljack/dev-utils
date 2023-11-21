import { Input } from '@/components/ui/input'
import { utilMap } from '@/constant'
import { RocketIcon } from '@radix-ui/react-icons'
import React from 'react'
import { Link, useParams } from 'react-router-dom'
import IconWrapper from './IconWrapper'

const LeftPanel = () => {
  const { id } = useParams()
  const getActiveClass = (pathId: string) => {
    return id === pathId ? 'bg-sky-500 text-white' : ''
  }
  return (
    <div className="flex w-[400px] flex-col px-2 py-4">
      <div className="top flex w-full items-center justify-between gap-4 border-b px-2 py-4">
        <Input placeholder="Search" />
        <RocketIcon className="h-[28px] w-[28px]" />
      </div>
      <div className="bottom flex-1 py-4">
        {utilMap.map(utilItem => (
          <Link
            key={utilItem.name}
            className={`group mt-2 flex cursor-pointer items-center space-y-3 rounded-md px-8 py-2 first-of-type:mt-0 hover:bg-sky-500 ${getActiveClass(
              utilItem.paramId
            )}`}
            to={utilItem.path}
          >
            <IconWrapper className="h-[24px] w-[24px] group-hover:text-white">
              {utilItem.icon}
            </IconWrapper>
            <div className="relative top-[-5px] ml-2 group-hover:text-white">
              {utilItem.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LeftPanel
