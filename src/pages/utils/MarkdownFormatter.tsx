import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import * as prettierPluginEstree from 'prettier/plugins/estree'
import parserMarkdown from 'prettier/plugins/markdown'
import * as prettier from 'prettier/standalone'
import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import ReadFileButton from '@/components/common/OpenFile'


const sampleValue = `# title
- this is a test
`

const MarkdownFormatter: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [inputResult, setInputResult] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const markdownFormatter = useCallback(
    debounce((inputValue: string) => {
      try {
        if (!inputValue) {
          setInputResult('')
          setFormatOutput('')
          return
        }
        prettier
          .format(inputValue, {
            parser: 'markdown',
            plugins: [parserMarkdown, prettierPluginEstree],
            singleQuote: true,
            trailingComma: 'none',
            tabWidth: 2
          })
          .then(res => {
            setFormatOutput(res)
            setInputResult('')
          })
          .catch(() => {
            setInputResult('Invalid Markdown')
          })
      } catch (error) {
        setInputResult('Invalid Markdown')
      }
    }, 300),
    [setFormatOutput]
  )
  const handleFileRead = (fileContent: string) => {
    setUserInput(fileContent)
  }

  useEffect(() => {
    markdownFormatter(userInput)
  }, [userInput, markdownFormatter])

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
          language="markdown"
          sampleValue={sampleValue}
          operationChildren={<ReadFileButton title={'Open File'} onContentChange={handleFileRead} />}
        />
        <CodeViewer
          code={formatOutput}
          showSpace={false}
          options={{
            readOnly: true
          }}
          language="markdown"
        />
      </div>
    </div>
  )
}

export default MarkdownFormatter
