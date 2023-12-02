import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { readText } from '@tauri-apps/api/clipboard'
import type { FC } from 'react'
import React from 'react'

export interface InputTipProps {
  onValueChange?: (value: string) => void
  showSample?: boolean
  sampleValue?: string
}
const InputTip: FC<InputTipProps> = ({
  onValueChange,
  showSample = true,
  sampleValue = ''
}) => {
  const getClipboardText = async () => {
    const clipboardText = await readText()
    onValueChange?.(clipboardText ?? '')
  }
  return (
    <div className="flex justify-between">
      <Label className=" text-lg font-bold">Input</Label>
      <div className="operation flex items-center gap-2">
        <Button onClick={getClipboardText}>Clipboard</Button>
        {showSample && (
          <Button onClick={() => onValueChange?.(sampleValue)}>Sample</Button>
        )}
        <Button onClick={() => onValueChange?.('')}>Clear</Button>
      </div>
    </div>
  )
}

export default InputTip
