import LeftPanel from '@/components/LeftPanel'
import { getUtilItem } from '@/utils'
import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'

const Home = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    const pathName = location.pathname
    const [, path, paramId] = pathName.split('/')
    if (!path) {
      navigate('/utils/json-formatter')
      return
    } else if (!paramId) {
      const utilItem = getUtilItem(paramId)
      utilItem.paramId &&
        navigate(`/utils/${utilItem.paramId}`, { replace: true })
      return
    }
  }, [id, location.pathname, navigate])
  return (
    <div className="flex w-full">
      <LeftPanel />
      <div className="w-full flex-1 bg-red-100">
        <Outlet />
      </div>
    </div>
  )
}

export default Home
