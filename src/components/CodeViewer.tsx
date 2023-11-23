import InputNumber from '@/components/ui/inputNumber'
import { useToast } from '@/components/ui/use-toast'
import { CopyIcon } from '@radix-ui/react-icons'
import { writeText } from '@tauri-apps/api/clipboard'
import type {
  MonacoCodeEditorLanguage,
  MonacoEditorOptions,
  MonacoEditorProps
} from 'monaco-editor-component/react'
import { MonacoEditor } from 'monaco-editor-component/react'
import React, { FC } from 'react'
import { Button } from './ui/button'

interface CodeViewerProps {
  code: string
  language?: MonacoCodeEditorLanguage
  className?: string
  options?: MonacoEditorOptions
  space?: number
  onSpaceChange?: (value: number) => void
  width?: MonacoEditorProps['width']
  height?: MonacoEditorProps['height']
}

const defaultOptions: MonacoEditorOptions = {
  theme: 'vs-dark',
  formatOnPaste: true,
  automaticLayout: true,
  fontSize: 16,
  minimap: {
    enabled: false
  },
  cursorStyle: 'line',
  roundedSelection: false,
  selectOnLineNumbers: true
}

const CodeViewer: FC<CodeViewerProps> = ({
  code,
  language = 'typescript',
  className = '',
  options = defaultOptions,
  space = 2,
  onSpaceChange = () => {},
  width = '100%',
  height = '100%'
}) => {
  const { toast } = useToast()

  const onCopy = async () => {
    await writeText(code)
    toast({
      description: 'Copied to clipboard'
    })
  }

  return (
    <div className="rounded-md pl-4">
      <div className="mb-2 ml-2 mt-2 flex w-full items-center gap-2">
        <div>Output:</div>
        <InputNumber value={space} onChange={onSpaceChange} />
        <Button variant="outline" onClick={onCopy}>
          <CopyIcon className="mr-2" />
          Copy
        </Button>
      </div>
      <MonacoEditor
        className={` bg-gray-800 p-4 ${className}`}
        value={code}
        language={language}
        options={options}
        width={width}
        height={height}
      />
    </div>
  )
}

export default CodeViewer
