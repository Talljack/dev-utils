import InputNumber from '@/components/ui/inputNumber'
import { useToast } from '@/components/ui/use-toast'
import { CopyIcon } from '@radix-ui/react-icons'
import { writeText } from '@tauri-apps/api/clipboard'
import * as monaco from 'monaco-editor'
import React, { FC, useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'

interface CodeViewerProps {
  code: string
  language?: string
  className?: string
  options?: monaco.editor.IStandaloneEditorConstructionOptions
  space?: number
  onSpaceChange?: (value: number) => void
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

const CodeViewer: FC<CodeViewerProps> = ({
  code,
  language = 'typescript',
  className,
  options = defaultOptions,
  space = 2,
  onSpaceChange = () => {}
}) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)
  useEffect(() => {
    if (editorRef) {
      setEditor(editor => {
        if (editor) return editor

        return monaco.editor.create(editorRef.current!, {
          value: '',
          ...defaultOptions,
          ...options,
          language: language
        })
      })
    }
    return () => editor?.dispose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editorRef, editor])

  useEffect(() => {
    if (editor) {
      editor.setValue(code)
    }
  }, [code, editor])

  const onCopy = async () => {
    if (editor) {
      const code = editor.getValue()
      await writeText(code)
      toast({
        description: 'Copied to clipboard'
      })
    }
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
      <div ref={editorRef} className={` bg-gray-800 p-4 ${className}`} />
    </div>
  )
}

export default CodeViewer
