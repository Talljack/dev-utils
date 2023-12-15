import { utilsIdPageMap } from '@/constant'
import { getUtilItem } from '@/utils'
import React from 'react'
import { useParams } from 'react-router-dom'

const Util = () => {
  const { id } = useParams() as { id: keyof typeof utilsIdPageMap }
  const utilItem = getUtilItem(id)
  if (!id) return <div>Not Found</div>
  return (
    <div className="flex flex-col h-full p-8">
      <h1 className="flex items-center justify-center w-full h-10 font-bold">
        {utilItem.name}
      </h1>
      <div className="flex-1">{utilsIdPageMap[id]}</div>
    </div>
  )
}

export default Util
