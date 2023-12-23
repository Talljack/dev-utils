import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
// @ts-ignore
import { readText } from '@tauri-apps/plugin-clipboard-manager'
import type { FC, PropsWithChildren } from 'react'
import Copy from './Copy'

export interface InputTipProps extends PropsWithChildren {
  value?: string
  onValueChange?: (value: string) => void
  showSample?: boolean
  sampleValue?: string
  className?: string
  inputLabel?: string
  showOperation?: boolean
  showCopy?: boolean
  showClipboard?: boolean
}
const InputTip: FC<InputTipProps> = ({
  onValueChange,
  showSample = true,
  sampleValue = '',
  className = '',
  inputLabel = 'Input:',
  value,
  showOperation = true,
  showCopy = false,
  showClipboard = true,
  children,
}) => {
  const getClipboardText = async () => {
    const clipboardText = await readText()
    onValueChange?.(clipboardText ?? '')
  }
  return (
    <div className={`flex w-full justify-between ${className}`}>
      <Label className="text-lg font-bold ">{inputLabel}</Label>
      <div className={`flex items-center gap-2 operation ${showOperation ? 'visible' : 'invisible'}`}>
        {children}
        {
          showClipboard && (
            <Button onClick={getClipboardText}>Clipboard</Button>
          )
        }
        {showSample && (
          <Button onClick={() => onValueChange?.(sampleValue)}>Sample</Button>
        )}
        {value && <Button onClick={() => onValueChange?.('')}>Clear</Button>}
      </div>
      {
        showCopy && value && (
          <Copy value={value}></Copy>
        )
      }
    </div>
  )
}

export default InputTip
