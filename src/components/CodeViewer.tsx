import InputNumber from '@/components/ui/inputNumber'
import type {
  MonacoCodeEditorLanguage,
  MonacoEditorOptions,
  MonacoEditorProps
} from 'monaco-editor-component/react'
import { MonacoEditor } from 'monaco-editor-component/react'
import React, { FC } from 'react'
import Copy from './common/Copy'

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
  selectOnLineNumbers: true,
  lineDecorationsWidth: 0,
  lineNumbersMinChars: 0
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
  return (
    <div className="flex flex-1 flex-col rounded-md pl-4">
      <div className="mb-2 ml-2 mt-2 flex w-full items-center gap-2">
        <div>Output:</div>
        <InputNumber value={space} onChange={onSpaceChange} />
        <Copy value={code} />
      </div>
      <div className="h-full w-full bg-gray-800 p-4">
        <MonacoEditor
          className={`${className}`}
          value={code}
          language={language}
          options={options}
          width={width}
          height={height}
        />
      </div>
    </div>
  )
}

export default CodeViewer
