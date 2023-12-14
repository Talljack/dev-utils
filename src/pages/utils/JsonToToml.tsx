import CodeEditor from '@/components/CodeEditor'
// import CodeViewer from '@/components/CodeViewer'
import TextEditor from '@/components/TextEditor';
import { debounce } from 'lodash-es'
import type { FC } from 'react'
// @ts-ignore
import json2toml from 'json2toml';
import React, { useEffect, useState } from 'react'

json2toml({
  simple: true
})
const sampleValue = `{
  "firstName": "John",
  "info": {
    "age": 23,
    "job": "engineer",
    "teenage": true
  },
  "hobbies": ["football", "video games"]
}`


const JsonToToml: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const jsonFormatter = debounce(async (inputValue: string) => {
    try {
      if (!inputValue) {
        setInputResult('')
        setFormatOutput('')
        return
      }
      try {
        const jsonData = JSON.parse(inputValue);
        const tomlCode = json2toml(jsonData, {
          indent: 2,
          newlineAfterSection: true,
        });
        setFormatOutput(tomlCode)
        setInputResult('')
      } catch (error) {
        setInputResult('Invalid JSON')
      }
    } catch (error) {
      setInputResult('Invalid JSON')
    }
  }, 300)

  useEffect(() => {
    jsonFormatter(userInput)
  }, [userInput, jsonFormatter])

  return (
    <div className="flex h-full">
      <div className="flex justify-between w-full gap-4 py-4">
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
        <TextEditor
          className='flex-1 text-white bg-black'
          value={formatOutput}
          showCopy={true}
          readOnly={true}
          inputLabel='Output:'
          placeHolder=''
          showOperation={false}
        />
      </div>
    </div>
  )
}

export default JsonToToml
