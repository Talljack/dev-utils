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
    <div className="p-8">
      <h1 className="flex items-center justify-center font-bold">
        {utilItem.name}
      </h1>
      {utilsIdPageMap[id]}
    </div>
  )
}

export default Util
