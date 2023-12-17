import { Input } from '@/components/ui/input'
import { utilMap } from '@/constant'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ScrollArea } from "@/components/ui/scroll-area"

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
    <div className="flex shrink-0 basis-[300px] flex-col px-2 py-4">
        <div className="flex items-center justify-between w-full gap-4 px-2 py-4 border-b top">
          <Input
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        <ScrollArea className="flex-1">
          <div className="flex-1 py-4 bottom">
            {filteredUtils.map(utilItem => (
              <Link
                key={utilItem.name}
                className={`group mt-2 flex cursor-pointer items-center space-y-3 rounded-md px-8 py-2 first-of-type:mt-0 hover:bg-sky-500 ${getActiveClass(
                  utilItem.paramId
                )}`}
                to={utilItem.path}
              >
                <div className="relative flex items-center ml-2 group-hover:text-white">
                  {utilItem.name}
                </div>
              </Link>
            ))}
          </div>
        </ScrollArea>
    </div>
  )
}

export default LeftPanel
