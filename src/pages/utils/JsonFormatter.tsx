import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'

const JsonFormatter: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [space, setSpace] = useState(2)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const jsonFormatter = useCallback(
    debounce((inputValue: string) => {
      try {
        if (!inputValue) {
          setInputResult('')
          setFormatOutput('')
          return
        }
        const json = JSON.parse(inputValue)
        setFormatOutput(JSON.stringify(json, null, space))
      } catch (error) {
        setInputResult('Invalid JSON')
      }
    }, 300),
    [space, setFormatOutput]
  )

  useEffect(() => {
    jsonFormatter(userInput)
  }, [space, userInput, jsonFormatter])

  return (
    <div className="flex h-full">
      <div className="flex justify-between w-full py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            readOnly: false
          }}
          inputResult={inputResult}
          language="json"
          sampleValue='{"name":"John","age":30,"city":"New York"}'
        />
        <CodeViewer
          code={formatOutput}
          space={space}
          onSpaceChange={setSpace}
          options={{
            readOnly: true
          }}
          language="json"
        />
      </div>
    </div>
  )
}

export default JsonFormatter
