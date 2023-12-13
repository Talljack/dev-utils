import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import parserTypescript from 'prettier/plugins/typescript'
import { format } from 'prettier/standalone'
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
        'just-types': true,
        'runtime-typecheck': false,
        'prefer-unions': true,
        'prefer-types': true,
      }
  });
}

const JsonToTypescript: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const formatTypescript = (ts: string) => {
    return format(ts, {
      parser: 'typescript',
      plugins: [parserTypescript, prettierPluginEstree],
      useTabs: false,
      semi: true,
      trailingComma: 'none',
      tabWidth: 2
    })
  }
  const jsonFormatter = debounce(async (inputValue: string) => {
    try {
      if (!inputValue) {
        setInputResult('')
        setFormatOutput('')
        return
      }
      try {
        const tsData = await quicktypeJSON('typescript', 'MyType', inputValue)
        const ts = await formatTypescript(tsData.lines.join('\n'));
        setFormatOutput(ts)
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
          language="typescript"
        />
      </div>
    </div>
  )
}

export default JsonToTypescript
