import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

const sampleValue = `{
  "title": "Example Schema",
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
      "type": "string"
    },
    "age": {
      "description": "Age in years",
      "type": "integer",
      "minimum": 0
    },
    "hairColor": {
      "enum": ["black", "brown", "blue"],
      "type": "string"
    }
  },
  "additionalProperties": false,
  "required": ["firstName", "lastName"]
}`

const JsonSchemaToTypescript: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const jsonFormatter = debounce((inputValue: string) => {
    try {
      if (!inputValue) {
        setFormatOutput('')
        return
      }
      // const json = JSON.parse(inputValue)
      Promise.resolve()
        .then(() => eval(`(${inputValue})`))
        .then(json =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          window.jstt.compile(json, 'SchemaType', {
            declareExternallyReferenced: true,
            enableConstEnums: true,
            unreachableDefinitions: false,
            strictIndexSignatures: false,
            format: false
          })
        )
        .then(ts => {
          setFormatOutput(ts)
          setInputResult('')
        })
        .catch(err => {
          console.log('here', err)
          setInputResult('Invalid JSON')
        })
    } catch (error) {
      console.log('here11', error)
      setFormatOutput('Invalid JSON')
    }
  }, 300)

  useEffect(() => {
    jsonFormatter(userInput)
  }, [userInput, jsonFormatter])

  return (
    <div className="flex h-full">
      <div className="flex w-full justify-between py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            readOnly: false
          }}
          language="json"
          inputResult={inputResult}
          sampleValue={sampleValue}
        />
        <CodeViewer
          code={formatOutput}
          showSpace={false}
          options={{
            readOnly: true
          }}
          language="typescript"
        />
      </div>
    </div>
  )
}

export default JsonSchemaToTypescript
