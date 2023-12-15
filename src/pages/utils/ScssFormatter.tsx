import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import parserPostcss from 'prettier/plugins/postcss'
import * as prettier from 'prettier/standalone'
import type { FC } from 'react'
import React, { useCallback, useEffect, useState } from 'react'

const sampleValue = `.test {color: red;&:hover {color: blue;}}`

const ScssFormatter: FC = () => {
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
            parser: 'scss',
            plugins: [parserPostcss, prettierPluginEstree],
            singleQuote: true,
            trailingComma: 'none',
            tabWidth: 2
          })
          .then(res => {
            setFormatOutput(res)
            setInputResult('')
          })
          .catch(() => {
            setInputResult('Invalid SCSS Code')
          })
      } catch (error) {
        setInputResult('Invalid SCSS Code')
      }
    }, 300),
    [setFormatOutput]
  )

  useEffect(() => {
    jsonFormatter(userInput)
  }, [userInput, jsonFormatter])

  return (
    <div className="flex h-full">
      <div className="flex justify-between w-full h-full py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            readOnly: false
          }}
          inputResult={inputResult}
          language="scss"
          sampleValue={sampleValue}
        />
        <CodeViewer
          code={formatOutput}
          showSpace={false}
          options={{
            readOnly: true
          }}
          language="scss"
        />
      </div>
    </div>
  )
}

export default ScssFormatter
