import { utilsIdPageMap } from '@/constant'
import { getUtilItem } from '@/utils'
import '@/worker'
import React from 'react'
import { useParams } from 'react-router-dom'

const Util = () => {
  const { id } = useParams() as { id: keyof typeof utilsIdPageMap }
  const utilItem = getUtilItem(id)
  if (!id) return <div>Not Found</div>
  return (
    <div className="flex h-full flex-col p-8">
      <h1 className="flex h-10 w-full items-center justify-center font-bold">
        {utilItem.name}
      </h1>
      <div className="flex-1">{utilsIdPageMap[id]}</div>
    </div>
  )
}

export default Util
