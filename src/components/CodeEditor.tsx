import type {
  MonacoCodeEditorLanguage,
  MonacoEditorOptions,
  MonacoEditorProps
} from 'monaco-editor-component/react'
import { MonacoEditor } from 'monaco-editor-component/react'
import React, { FC, ReactNode } from 'react'
import InputTip from './common/InputTip'

interface Props {
  code: string
  className?: string
  language?: MonacoCodeEditorLanguage
  options?: MonacoEditorOptions
  onChange?: (value: string) => void
  width?: MonacoEditorProps['width']
  height?: MonacoEditorProps['height']
  sampleValue?: string
  inputLabel?: string
  inputResult?: string
  operationChildren?: ReactNode
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

const CodeEditor: FC<Props> = ({
  code,
  className,
  language = 'typescript',
  options = defaultOptions,
  onChange = () => {},
  width = '100%',
  height = '100%',
  sampleValue,
  inputLabel = 'Input:',
  inputResult,
  operationChildren
}) => {
  return (
    <div className="flex flex-col items-center flex-1 h-full">
      <InputTip
        value={code}
        sampleValue={sampleValue}
        onValueChange={onChange}
        className="mb-4"
        inputLabel={inputLabel}
      >
        {operationChildren}
      </InputTip>
      <div className="flex flex-1 w-full">
        <MonacoEditor
          className={`${className}`}
          value={code}
          onChange={onChange}
          options={options}
          language={language}
          height={height}
          width={width}
        />
      </div>
      {inputResult && (
        <div className="w-full h-10 p-2 mt-4 text-red-700 bg-black">
          {inputResult}
        </div>
      )}
    </div>
  )
}

export default CodeEditor
