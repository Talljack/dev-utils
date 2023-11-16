import { Button } from '@components/ui/button'
import { GearIcon } from '@radix-ui/react-icons'
import { readText } from '@tauri-apps/api/clipboard'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import React, { FC, useEffect, useRef, useState } from 'react'

interface Props {
  code: string
  className?: string
  language?: string
  options?: monaco.editor.IStandaloneEditorConstructionOptions
  onChange?: (value: string) => void
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
  onChange = () => {}
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  useEffect(() => {
    if (editorRef) {
      setEditor(editor => {
        if (editor) return editor
        const monacoEditor = monaco.editor.create(editorRef.current!, {
          value: code,
          ...defaultOptions,
          ...options,
          language
        })
        monacoEditor?.onDidChangeModelContent(() => {
          const newValue = monacoEditor.getValue()
          onChange(newValue)
        })
        return monacoEditor
      })
    }

    return () => editor?.dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef, editor])
  const handleClear = () => {
    editor?.setValue('')
    onChange('')
  }
  const handlePaste = async () => {
    const clipboardText = await readText()
    editor?.setValue(clipboardText ?? '')
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
      <div ref={editorRef} className={` bg-gray-800 p-4 ${className}`} />
    </div>
  )
}

export default CodeEditor
