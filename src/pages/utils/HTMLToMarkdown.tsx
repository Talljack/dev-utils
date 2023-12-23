import CodeEditor from '@/components/CodeEditor'
import CodeViewer from '@/components/CodeViewer'
import { debounce } from 'lodash-es'
import type { FC } from 'react'
import TurndownService from 'turndown'
import { useEffect, useState } from 'react'

const turndownService = new TurndownService({
  hr: '---'
});


const HTMLToMarkdown: FC = () => {
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
        const mdCode = turndownService.turndown(inputValue);
        setFormatOutput(mdCode)
        setInputResult('')
      } catch (error) {
        setInputResult('Invalid HTML')
      }
    } catch (error) {
      setInputResult('Invalid HTML')
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
          language="html"
          inputResult={inputResult}
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

export default HTMLToMarkdown
