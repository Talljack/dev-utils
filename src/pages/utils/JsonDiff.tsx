import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/button'
import '@/worker'
import { MonacoDiffEditor } from 'monaco-editor-component/react'
import type { FC } from 'react'
import React, { useState } from 'react'

const JsonDiff: FC = () => {
  const [originalValue, setOriginalValue] = useState('')
  const [modifiedValue, setModifiedValue] = useState('')
  const [showDiff, setShowDiff] = useState(false)
  const formatJson = (json: string) => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2)
    } catch (error) {
      return ''
    }
  }
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-full">
        {showDiff ? (
          <div className="flex h-full w-full flex-col items-center justify-center gap-6">
            <MonacoDiffEditor
              options={{
                readOnly: true,
                fontSize: 16
              }}
              language="json"
              originalValue={formatJson(originalValue)}
              value={formatJson(modifiedValue)}
            />
            <Button className="h-10 w-20" onClick={() => setShowDiff(false)}>
              Back
            </Button>
          </div>
        ) : (
          <div
            className="input flex h-full w-full flex-1 flex-col justify-center gap-6"
            style={{
              alignItems: 'center'
            }}
          >
            <div className="flex h-full w-full flex-1 justify-between gap-4">
              <CodeEditor
                code={originalValue}
                onChange={(value: string) => {
                  setOriginalValue(value)
                }}
                options={{
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  fontSize: 16
                }}
                language="json"
                sampleValue='{"name":"John","age":30,"city":"New York"}'
                inputLabel="Original:"
              />
              <CodeEditor
                code={modifiedValue}
                onChange={(value: string) => {
                  setModifiedValue(value)
                }}
                options={{
                  lineDecorationsWidth: 0,
                  lineNumbersMinChars: 0,
                  fontSize: 16
                }}
                language="json"
                sampleValue='{"name":"Tom","age":32,"city":"New York"}'
                inputLabel="Modified:"
              />
            </div>
            <Button className="h-10 w-20" onClick={() => setShowDiff(true)}>
              Diff
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JsonDiff
