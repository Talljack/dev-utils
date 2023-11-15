import { Input } from '@/components/ui/input'
import { RocketIcon } from '@radix-ui/react-icons'
import React from 'react'

const LeftPanel = () => {
  return (
    <div className="flex w-[400px] flex-col px-2 py-4">
      <div className="top flex w-full items-center justify-between gap-4 p-2">
        <Input placeholder="Search" />
        <RocketIcon className="h-[28px] w-[28px]" />
      </div>
      <div className="bottom flex-1"></div>
    </div>
  )
}

export default LeftPanel
