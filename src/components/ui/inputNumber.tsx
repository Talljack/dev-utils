import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import type { FC } from 'react'
import React, { useState } from 'react'
import { Input } from './input'

interface InputNumberProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  showPlaceholder?: boolean
}

const InputNumber: FC<InputNumberProps> = ({
  value,
  onChange,
  placeholder = 'spaces',
  showPlaceholder = true
}) => {
  const handleUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (value < 0) return onChange(0)
    if (!isNaN(value)) {
      onChange(value)
    } else {
      onChange(0)
    }
  }
  const [isFocus, setIsFocus] = useState(false)
  return (
    <div className="relative flex justify-between">
      <Input
        value={value}
        onChange={handleUpdate}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />
      {showPlaceholder && !isFocus && (
        <div className="absolute left-9 top-[7px]">{placeholder}</div>
      )}
      <div className="absolute right-3 top-1 flex cursor-pointer flex-col justify-between">
        <CaretUpIcon onClick={() => onChange(value + 1)} />
        <CaretDownIcon onClick={() => onChange(value - 1)} />
      </div>
    </div>
  )
}

export default InputNumber
