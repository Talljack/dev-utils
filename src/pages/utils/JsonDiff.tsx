import CodeEditor from '@/components/CodeEditor'
import { Button } from '@/components/ui/button'
import { getUtilItem } from '@/utils'
import '@/worker'
import { MonacoDiffEditor } from 'monaco-editor-component/react'
import type { FC } from 'react'
import React, { useState } from 'react'

interface JsonDiffProps {
  id: string
}

const JsonDiff: FC<JsonDiffProps> = ({ id }) => {
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
  const utilItem = getUtilItem(id)
  return (
    <div className="flex flex-col p-4">
      <h1 className="flex items-center justify-center font-bold">
        {utilItem.name}
      </h1>
      <div className="flex py-4">
        {showDiff ? (
          <div className="flex flex-wrap justify-center gap-6">
            <MonacoDiffEditor
              width={1080}
              height={800}
              options={{
                readOnly: true,
                fontSize: 16
              }}
              language="json"
              originalValue={formatJson(originalValue)}
              value={formatJson(modifiedValue)}
            />
            <Button onClick={() => setShowDiff(false)}>Back</Button>
          </div>
        ) : (
          <div className="input flex flex-wrap justify-center gap-6 py-4">
            <div className="flex w-full">
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
                width={'500'}
                height={'700'}
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
                width={'500'}
                height={'700'}
              />
            </div>
            <Button onClick={() => setShowDiff(true)}>Diff</Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default JsonDiff
