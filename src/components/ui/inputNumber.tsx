import { CaretDownIcon, CaretUpIcon } from '@radix-ui/react-icons'
import type { FC } from 'react'
import React, { useState } from 'react'
import { Input } from './input'

interface InputNumberProps {
  value: number
  onChange: (value: number) => void
  placeholder?: string
  showPlaceholder?: boolean
  min?: number
  max?: number
  step?: number
  className?: string
}

const InputNumber: FC<InputNumberProps> = ({
  value,
  onChange,
  placeholder = 'spaces',
  showPlaceholder = true,
  min = 1,
  max = 1000,
  step = 1,
  className = ''
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
  const handleClick = (type: 'increase' | 'decrease') => {
    if (type === 'increase') {
      const willBeValue = value + step
      if (willBeValue < max) {
        onChange(willBeValue)
      } else {
        onChange(max)
      }
    } else {
      const willBeValue = value - step
      if (willBeValue > min) {
        onChange(willBeValue)
      } else {
        onChange(min)
      }
    }
  }
  return (
    <div className="relative flex justify-between">
      <Input
        value={value}
        onChange={handleUpdate}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        className={className}
      />
      {showPlaceholder && !isFocus && (
        <div className="absolute left-9 top-[7px]">{placeholder}</div>
      )}
      <div className="absolute flex flex-col justify-between cursor-pointer right-3 top-1">
        <CaretUpIcon onClick={() => handleClick('increase')} />
        <CaretDownIcon onClick={() => handleClick('decrease')} />
      </div>
    </div>
  )
}

export default InputNumber
