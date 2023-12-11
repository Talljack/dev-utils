import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import parserBabel from 'prettier/plugins/babel'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import * as prettier from 'prettier/standalone'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'

const JSFormatter: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const jsonFormatter = useCallback(
    debounce((inputValue: string) => {
      try {
        if (!inputValue) {
          setInputResult('')
          setFormatOutput('')
          return
        }
        prettier
          .format(inputValue, {
            parser: 'babel',
            plugins: [parserBabel, prettierPluginEstree],
            singleQuote: true,
            trailingComma: 'none',
            tabWidth: 2
          })
          .then(res => {
            setFormatOutput(res)
            setInputResult('')
          })
          .catch(() => {
            setInputResult('Invalid Javascript Code')
          })
      } catch (error) {
        setInputResult('Invalid Javascript Code')
      }
    }, 300),
    [setFormatOutput]
  )

  useEffect(() => {
    jsonFormatter(userInput)
  }, [userInput, jsonFormatter])

  return (
    <div className="flex h-full">
      <div className="flex h-full w-full justify-between py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            readOnly: false
          }}
          inputResult={inputResult}
          language="javascript"
          sampleValue="const a=1;const b=2;console.log(a+b);"
        />
        <CodeViewer
          code={formatOutput}
          showSpace={false}
          options={{
            readOnly: true
          }}
          language="javascript"
        />
      </div>
    </div>
  )
}

export default JSFormatter
