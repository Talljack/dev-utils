import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import type { FC } from 'react'
// @ts-ignore
import yaml from 'js-yaml';
import React, { useEffect, useState } from 'react'

const sampleValue = `---
firstName: "John"
info:
  age: 36
  job: "engineer"
hobbies:
  - "football"
  - "video games"
`


const YamlToJson: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const convertYamlToJson = debounce(async (inputValue: string) => {
    try {
      if (!inputValue) {
        setInputResult('')
        setFormatOutput('')
        return
      }
      try {
        const jsCode = yaml.load(inputValue);
        setFormatOutput(JSON.stringify(jsCode, null, 2))
        setInputResult('')
      } catch (error) {
        setInputResult('Invalid Yaml')
      }
    } catch (error) {
      setInputResult('Invalid Yaml')
    }
  }, 300)

  useEffect(() => {
    convertYamlToJson(userInput)
  }, [userInput, convertYamlToJson])

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
          language="yaml"
          inputResult={inputResult}
          sampleValue={sampleValue}
        />
        <CodeViewer
          code={formatOutput}
          showSpace={false}
          options={{
            readOnly: true
          }}
          language="json"
        />
      </div>
    </div>
  )
}

export default YamlToJson
