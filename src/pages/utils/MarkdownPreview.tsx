import CodeEditor from '@/components/CodeEditor'
import MdViewer from '@/components/MdViewer'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import ReadFileButton from '@/components/common/OpenFile'
import { ScrollArea } from '@radix-ui/react-scroll-area'


const sampleValue = `# title
- this is a test

1. text
`

const MarkdownPreview: FC = () => {
  const [userInput, setUserInput] = useState('')
  const [formatOutput, setFormatOutput] = useState('')
  const handleFileRead = (fileContent: string) => {
    setUserInput(fileContent)
  }

  useEffect(() => {
    setFormatOutput(userInput)
  }, [userInput])

  return (
    <div className="flex h-full">
      <div className="flex justify-between w-full h-full gap-4 py-4">
        <CodeEditor
          code={userInput}
          onChange={(value: string) => {
            setUserInput(value)
          }}
          options={{
            readOnly: false
          }}
          language="markdown"
          sampleValue={sampleValue}
          operationChildren={<ReadFileButton title={'Open File'} onContentChange={handleFileRead} />}
        />
        <ScrollArea className='flex-1 mt-[56px]' style={{ height: 'calc(100vh - 168px)' }}>
          <MdViewer
            value={formatOutput}
          />
        </ScrollArea>
      </div>
    </div>
  )
}

export default MarkdownPreview
