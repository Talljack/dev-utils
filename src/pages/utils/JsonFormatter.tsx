import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { getUtilItem } from '@/utils'
import '@/worker'
import { debounce } from 'lodash-es'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'

interface JsonFormatterProps {
  id: string
}

const JsonFormatter: FC<JsonFormatterProps> = ({ id }) => {
  const [userInput, setUserInput] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const [space, setSpace] = useState(2)
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
          width={'500'}
          height={'800'}
        />
        <CodeViewer
          code={formatOutput}
          space={space}
          onSpaceChange={setSpace}
          options={{
            readOnly: true
          }}
          language="json"
          width={'500'}
          height={'800'}
        />
      </div>
    </div>
  )
}

export default JsonFormatter
