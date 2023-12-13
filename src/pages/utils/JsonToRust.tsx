import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype
} from 'quicktype-core'
import type { FC } from 'react'
import React, { useEffect, useState } from 'react'

const sampleValue = `{
  "firstName": "John",
  "lastName": "Doe",
  "age": 23,
  "hairColor": "yellow"
}`

async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString: string) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString]
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return await quicktype({
      inputData,
      lang: targetLanguage,
      rendererOptions: {
        'density': 'dense',
        'edition': '2018',
        'leading-comments': false,
      }
  });
}

const JsonToRust: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const jsonFormatter = debounce(async (inputValue: string) => {
    try {
      if (!inputValue) {
        setFormatOutput('')
        return
      }
      try {
        const rustData = await quicktypeJSON('rust', 'MyType', inputValue)
        const rustCode = rustData.lines.join('\n')
        setFormatOutput(rustCode)
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
      <div className="flex justify-between w-full py-4">
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
          language="rust"
        />
      </div>
    </div>
  )
}

export default JsonToRust
