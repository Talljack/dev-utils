import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/button'
import '@/worker'
import { MonacoDiffEditor } from 'monaco-editor-component/react'
import type { FC } from 'react'
import React, { useState } from 'react'

type FormatJsonType = 'original' | 'modified'

const JsonDiff: FC = () => {
  const [originalValue, setOriginalValue] = useState('')
  const [modifiedValue, setModifiedValue] = useState('')
  const [showDiff, setShowDiff] = useState(false)
  const [originValueResult, setOriginalValueResult] = useState('')
  const [modifiedValueResult, setModifiedValueResult] = useState('')
  const formatJson = (json: string, type: FormatJsonType = 'original') => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch (error) {
      if (type === 'original') {
        setOriginalValueResult('Invalid JSON')
      } else {
        setModifiedValueResult('Invalid JSON')
      }
      return json
    }
  }
  return (
    <div className="flex flex-col h-full">
      <div className="flex h-full">
        {showDiff ? (
          <div className="flex flex-col items-center justify-center w-full h-full gap-6">
            <MonacoDiffEditor
              options={{
                readOnly: true,
                fontSize: 16
              }}
              language="json"
              originalValue={originalValue}
              value={modifiedValue}
            />
            <Button className="w-20 h-10" onClick={() => setShowDiff(false)}>
              Back
            </Button>
          </div>
        ) : (
          <div
            className="flex flex-col justify-center flex-1 w-full h-full gap-6 input"
            style={{
              alignItems: 'center'
            }}
          >
            <div className="flex justify-between flex-1 w-full h-full gap-4">
              <CodeEditor
                code={originalValue}
                onChange={(value: string) => {
                  setOriginalValue(formatJson(value, 'original'))
                }}
                options={{
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  fontSize: 16
                }}
                inputResult={originValueResult}
                language="json"
                sampleValue='{"name":"John","age":30,"city":"New York"}'
                inputLabel="Original:"
              />
              <CodeEditor
                code={modifiedValue}
                onChange={(value: string) => {
                  setModifiedValue(formatJson(value, 'modified'))
                }}
                options={{
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  fontSize: 16
                }}
                inputResult={modifiedValueResult}
                language="json"
                sampleValue='{"name":"Tom","age":32,"city":"New York"}'
                inputLabel="Modified:"
              />
            </div>
            <Button className="w-20 h-10" onClick={() => setShowDiff(true)}>
              Diff
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JsonDiff
