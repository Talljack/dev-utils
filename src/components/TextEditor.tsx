import React, { FC } from 'react'
import InputTip from './common/InputTip'
import { Textarea } from './ui/textarea'

interface Props {
  value: string
  className?: string
  onChange?: (value: string) => void
  sampleValue?: string
  inputLabel?: string
  inputResult?: string
  readOnly?: boolean
  placeHolder?: string
  showOperation?: boolean
  showSample?: boolean
}

const TextEditor: FC<Props> = ({
  value,
  className,
  onChange = () => {},
  sampleValue,
  inputLabel = 'Input:',
  inputResult,
  readOnly = false,
  placeHolder = 'Please input here',
  showOperation = true,
  showSample = true
}) => {
  return (
    <div className="flex flex-col items-center flex-1 h-full">
      <InputTip
        value={value}
        sampleValue={sampleValue}
        onValueChange={onChange}
        className="mb-4"
        inputLabel={inputLabel}
        showOperation={showOperation}
        showSample={showSample}
      />
      <div className="flex flex-1 w-full">
        <Textarea placeholder={placeHolder} className={className} value={value} readOnly={readOnly} onChange={e => onChange(e.target.value)} />
      </div>
      {inputResult && (
        <div className="w-full h-10 p-2 mt-4 text-red-700 bg-black">
          {inputResult}
        </div>
      )}
    </div>
  )
}

export default TextEditor
