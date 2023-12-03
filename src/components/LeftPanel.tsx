import { Input } from '@/components/ui/input'
import { utilMap } from '@/constant'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const LeftPanel = () => {
  const { id } = useParams()
  const [search, setSearch] = useState('')
  const [filteredUtils, setFilteredUtils] = useState(utilMap)
  useEffect(() => {
    if (search) {
      const filtered = utilMap.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredUtils(filtered)
    } else {
      setFilteredUtils(utilMap)
    }
  }, [search])
  const getActiveClass = (pathId: string) => {
    return id === pathId ? 'bg-sky-500 text-white' : ''
  }
  return (
    <div className="flex w-[300px] flex-col px-2 py-4">
      <div className="top flex w-full items-center justify-between gap-4 border-b px-2 py-4">
        <Input
          placeholder="Search"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <div className="bottom flex-1 py-4">
        {filteredUtils.map(utilItem => (
          <Link
            key={utilItem.name}
            className={`group mt-2 flex cursor-pointer items-center space-y-3 rounded-md px-8 py-2 first-of-type:mt-0 hover:bg-sky-500 ${getActiveClass(
              utilItem.paramId
            )}`}
            to={utilItem.path}
          >
            <div className="relative ml-2 flex items-center group-hover:text-white">
              {utilItem.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default LeftPanel
