import { Button } from '@components/ui/button'
import { GearIcon } from '@radix-ui/react-icons'
import { readText } from '@tauri-apps/api/clipboard'
import type {
  MonacoCodeEditorLanguage,
  MonacoEditorProps
} from 'monaco-editor-component/react'
import { MonacoEditor } from 'monaco-editor-component/react'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import React, { FC } from 'react'

interface Props {
  code: string
  className?: string
  language?: MonacoCodeEditorLanguage
  options?: monaco.editor.IStandaloneEditorConstructionOptions
  onChange?: (value: string) => void
  width?: MonacoEditorProps['width']
  height?: MonacoEditorProps['height']
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
  selectOnLineNumbers: true
}

const CodeEditor: FC<Props> = ({
  code,
  className,
  language = 'typescript',
  options = defaultOptions,
  onChange = () => {},
  width = '100%',
  height = '100%'
}) => {
  const handleClear = () => {
    onChange('')
  }
  const handlePaste = async () => {
    const clipboardText = await readText()
    onChange(clipboardText ?? '')
  }
  return (
    <div className="flex flex-col items-center">
      <div className="mb-2 ml-2 mt-2 flex w-full items-center gap-2">
        <div>Input:</div>
        <Button variant="outline" onClick={() => handlePaste()}>
          Clipboard
        </Button>
        <Button variant="outline" onClick={() => handleClear()}>
          Clear
        </Button>
        <Button variant="outline" size="icon">
          <GearIcon />
        </Button>
      </div>
      <MonacoEditor
        className={`bg-gray-800 p-4 ${className}`}
        value={code}
        onChange={onChange}
        options={options}
        language={language}
        height={height}
        width={width}
      />
    </div>
  )
}

export default CodeEditor
