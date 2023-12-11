import type {
  MonacoCodeEditorLanguage,
  MonacoEditorProps
} from 'monaco-editor-component/react'
import { MonacoEditor } from 'monaco-editor-component/react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import React, { FC } from 'react'
import InputTip from './common/InputTip'

interface Props {
  code: string
  className?: string
  language?: MonacoCodeEditorLanguage
  options?: monaco.editor.IStandaloneEditorConstructionOptions
  onChange?: (value: string) => void
  width?: MonacoEditorProps['width']
  height?: MonacoEditorProps['height']
  sampleValue?: string
  inputLabel?: string
  inputResult?: string
}

const defaultOptions: monaco.editor.IStandaloneEditorConstructionOptions = {
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
  inputResult
}) => {
  return (
    <div className="flex h-full flex-1 flex-col items-center">
      <InputTip
        sampleValue={sampleValue}
        onValueChange={onChange}
        className="mb-4"
        inputLabel={inputLabel}
      />
      <div className="flex w-full flex-1">
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
        <div className="mt-4 h-10 w-full bg-black p-2 text-red-700">
          {inputResult}
        </div>
      )}
    </div>
  )
}

export default CodeEditor
