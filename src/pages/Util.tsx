import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { getUtilItem } from '@/utils'
import '@/worker'
import { debounce } from 'lodash-es'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Util = () => {
  const [userInput, setUserInput] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const [space, setSpace] = useState(2)
  const { id } = useParams()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const jsonFormatter = useCallback(
    debounce((inputValue: string) => {
      try {
        if (!inputValue) {
          setFormatOutput('')
          return
        }
        const json = JSON.parse(inputValue)
        setFormatOutput(JSON.stringify(json, null, space))
      } catch (error) {
        setFormatOutput('Invalid JSON')
      }
    }, 300),
    [space, setFormatOutput]
  )

  useEffect(() => {
    jsonFormatter(userInput)
  }, [space, userInput, jsonFormatter])

  if (!id) return <div>Not Found</div>
  const utilItem = getUtilItem(id)
  return (
    <div className="flex flex-col p-4">
      <h1 className="flex items-center justify-center font-bold">
        {utilItem.name}
      </h1>
      <div className="flex py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            readOnly: false
          }}
          language="json"
          className="h-[800px] w-[500px]"
        />
        <CodeViewer
          code={formatOutput}
          space={space}
          onSpaceChange={setSpace}
          options={{
            readOnly: true
          }}
          language="json"
          className="h-[800px] w-[500px]"
        />
      </div>
    </div>
  )
}

export default Util
