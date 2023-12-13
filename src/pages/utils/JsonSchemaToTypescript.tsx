import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import parserTypescript from 'prettier/plugins/typescript'
import { format } from 'prettier/standalone'
import {
  InputData,
  FetchingJSONSchemaStore,
  JSONSchemaInput,
  quicktype
} from 'quicktype-core'
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

async function quicktypeJSONSchema(targetLanguage: string, typeName: string, jsonSchemaString: string) {
  const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
  await schemaInput.addSource({ name: typeName, schema: jsonSchemaString });

  const inputData = new InputData();
  inputData.addInput(schemaInput);

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

const JsonSchemaToTypescript: FC = () => {
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
        const json = JSON.parse(inputValue)
        const typeName = json?.title ? json.title.trim().replaceAll(/\s+/g, '') : 'ExampleType'
        const tsData = await quicktypeJSONSchema('typescript', typeName, inputValue)
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

export default JsonSchemaToTypescript
