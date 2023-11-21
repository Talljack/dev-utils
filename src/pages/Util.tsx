import { utilsIdPageMap } from '@/constant'
import '@/worker'
import React from 'react'
import { useParams } from 'react-router-dom'

const Util = () => {
  const { id } = useParams() as { id: keyof typeof utilsIdPageMap }

  if (!id) return <div>Not Found</div>
  return utilsIdPageMap[id](id)
}

export default Util
