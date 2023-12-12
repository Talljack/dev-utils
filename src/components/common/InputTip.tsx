import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// @ts-ignore
import { readText } from '@tauri-apps/api/clipboard'
import type { FC } from 'react'
import React from 'react'

export interface InputTipProps {
  value?: string
  onValueChange?: (value: string) => void
  showSample?: boolean
  sampleValue?: string
  className?: string
  inputLabel?: string
}
const InputTip: FC<InputTipProps> = ({
  onValueChange,
  showSample = true,
  sampleValue = '',
  className = '',
  inputLabel = 'Input:',
  value
}) => {
  const getClipboardText = async () => {
    const clipboardText = await readText()
    onValueChange?.(clipboardText ?? '')
  }
  return (
    <div className={`flex w-full justify-between ${className}`}>
      <Label className="text-lg font-bold ">{inputLabel}</Label>
      <div className="flex items-center gap-2 operation">
        <Button onClick={getClipboardText}>Clipboard</Button>
        {showSample && (
          <Button onClick={() => onValueChange?.(sampleValue)}>Sample</Button>
        )}
        {value && <Button onClick={() => onValueChange?.('')}>Clear</Button>}
      </div>
    </div>
  )
}

export default InputTip
